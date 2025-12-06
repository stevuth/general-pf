import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { uploadToCloudinary } from "@/lib/cloudinary";

// GET - Fetch all admin-posted properties
export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("general-pf");
        const properties = await db.collection("properties")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({ success: true, properties: JSON.parse(JSON.stringify(properties)) });
    } catch (error) {
        console.error("Error fetching properties:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch properties" }, { status: 500 });
    }
}

// POST - Create new property (Admin)
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const propertyType = formData.get('propertyType') as string;
        const listingType = formData.get('listingType') as string;
        const price = formData.get('price') as string;
        const location = formData.get('location') as string;
        const description = formData.get('description') as string;

        // Handle Files
        const photos = formData.getAll('photos') as File[];
        const video = formData.get('video') as File | null;

        if (!propertyType || !listingType || !price || !location) {
            return NextResponse.json({ success: false, message: "Required fields missing" }, { status: 400 });
        }

        // Upload Photos
        const photoUrls: string[] = [];
        if (photos && photos.length > 0) {
            for (const photo of photos) {
                if (photo.size > 0) {
                    const url = await uploadToCloudinary(Buffer.from(await photo.arrayBuffer()), 'properties');
                    if (url) photoUrls.push(url);
                }
            }
        }

        // Upload Video
        let videoUrl = "";
        if (video && video.size > 0) {
            videoUrl = await uploadToCloudinary(Buffer.from(await video.arrayBuffer()), 'properties');
        }

        const propertyData = {
            propertyType,
            listingType,
            price,
            location,
            description,
            images: photoUrls,
            video: videoUrl,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const client = await clientPromise;
        const db = client.db("general-pf");
        const result = await db.collection("properties").insertOne(propertyData);

        return NextResponse.json({
            success: true,
            message: "Property posted successfully",
            propertyId: result.insertedId
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating property:", error);
        return NextResponse.json({ success: false, message: "Failed to create property" }, { status: 500 });
    }
}
