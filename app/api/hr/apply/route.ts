import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        // Extract files
        const applicantIdDoc = formData.get('applicantIdDoc') as File | null;
        const paymentProof = formData.get('paymentProof') as File | null;
        const guarantorIdDoc = formData.get('guarantorIdDoc') as File | null;
        const guarantorPassport = formData.get('guarantorPassport') as File | null;
        const resumeCv = formData.get('resumeCv') as File | null;
        const passportPhoto = formData.get('passportPhoto') as File | null;

        // Upload files to Cloudinary
        const uploadPromises = [];
        const fileUrls: any = {};

        if (applicantIdDoc && applicantIdDoc.size > 0) {
            const buffer = Buffer.from(await applicantIdDoc.arrayBuffer());
            uploadPromises.push(
                uploadToCloudinary(buffer, 'hr-applications').then(url => fileUrls.applicantIdDoc = url)
            );
        }

        if (paymentProof && paymentProof.size > 0) {
            const buffer = Buffer.from(await paymentProof.arrayBuffer());
            uploadPromises.push(
                uploadToCloudinary(buffer, 'hr-applications').then(url => fileUrls.paymentProof = url)
            );
        }

        if (guarantorIdDoc && guarantorIdDoc.size > 0) {
            const buffer = Buffer.from(await guarantorIdDoc.arrayBuffer());
            uploadPromises.push(
                uploadToCloudinary(buffer, 'hr-applications').then(url => fileUrls.guarantorIdDoc = url)
            );
        }

        if (guarantorPassport && guarantorPassport.size > 0) {
            const buffer = Buffer.from(await guarantorPassport.arrayBuffer());
            uploadPromises.push(
                uploadToCloudinary(buffer, 'hr-applications').then(url => fileUrls.guarantorPassport = url)
            );
        }

        if (resumeCv && resumeCv.size > 0) {
            const buffer = Buffer.from(await resumeCv.arrayBuffer());
            uploadPromises.push(
                uploadToCloudinary(buffer, 'hr-applications').then(url => fileUrls.resumeCv = url)
            );
        }

        if (passportPhoto && passportPhoto.size > 0) {
            const buffer = Buffer.from(await passportPhoto.arrayBuffer());
            uploadPromises.push(
                uploadToCloudinary(buffer, 'hr-applications').then(url => fileUrls.passportPhoto = url)
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
        const applicationData = {
            ...data,
            ...fileUrls,
            createdAt: new Date(),
            status: 'pending'
        };

        // Save to MongoDB
        const client = await clientPromise;
        const db = client.db("general-pf");
        await db.collection("job_applications").insertOne(applicationData);

        return NextResponse.json({ success: true, message: "Application submitted successfully" });

    } catch (error) {
        console.error("Error submitting application:", error);
        return NextResponse.json({ success: false, message: "Failed to submit application" }, { status: 500 });
    }
}
