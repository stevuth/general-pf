import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        // Extract files
        const photos = formData.getAll('photos') as File[];
        const video = formData.get('videos') as File | null;
        const paymentReceipt = formData.get('paymentReceipt') as File | null;

        // Upload files to Cloudinary
        const uploadPromises = [];
        const fileUrls: any = { photos: [] };

        if (photos && photos.length > 0) {
            for (const photo of photos) {
                if (photo.size > 0) {
                    uploadPromises.push(
                        uploadToCloudinary(Buffer.from(await photo.arrayBuffer()), 'real-estate-listings').then(url => fileUrls.photos.push(url))
                    );
                }
            }
        }

        if (video && video.size > 0) {
            uploadPromises.push(
                uploadToCloudinary(Buffer.from(await video.arrayBuffer()), 'real-estate-listings').then(url => fileUrls.video = url)
            );
        }

        if (paymentReceipt && paymentReceipt.size > 0) {
            uploadPromises.push(
                uploadToCloudinary(Buffer.from(await paymentReceipt.arrayBuffer()), 'real-estate-listings').then(url => fileUrls.paymentReceipt = url)
            );
        }

        await Promise.all(uploadPromises);

        // Extract other form data
        const data: any = {};
        formData.forEach((value, key) => {
            if (typeof value === 'string') {
                data[key] = value;
            }
        });

        // Combine data
        const listingData = {
            ...data,
            ...fileUrls,
            createdAt: new Date(),
            status: 'pending'
        };

        // Save to MongoDB
        const client = await clientPromise;
        const db = client.db("general-pf");
        await db.collection("property_listings").insertOne(listingData);

        return NextResponse.json({ success: true, message: "Listing submitted successfully" });

    } catch (error) {
        console.error("Error submitting property listing:", error);
        return NextResponse.json({ success: false, message: "Failed to submit listing" }, { status: 500 });
    }
}
