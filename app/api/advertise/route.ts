import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { ObjectId } from 'mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("general_pf");
        const advertisements = await db.collection("advertisements").find({}).sort({ createdAt: -1 }).toArray();

        return NextResponse.json({ success: true, advertisements });
    } catch (error) {
        console.error('Error fetching advertisements:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch advertisements' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const businessName = formData.get('businessName') as string;
        const contactPerson = formData.get('contactPerson') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const businessType = formData.get('businessType') as string;
        const description = formData.get('description') as string;
        const plan = formData.get('plan') as string;
        const paymentProofFile = formData.get('paymentProof') as File | null;

        let paymentProofUrl = '';

        if (paymentProofFile) {
            const buffer = Buffer.from(await paymentProofFile.arrayBuffer());
            paymentProofUrl = await uploadToCloudinary(buffer, 'general-pf/advertisements');
        }

        const client = await clientPromise;
        const db = client.db("general_pf");

        const newAdvertisement = {
            businessName,
            contactPerson,
            email,
            phone,
            businessType,
            description,
            plan,
            paymentProof: paymentProofUrl,
            status: 'pending', // pending, active, rejected, expired
            createdAt: new Date(),
        };

        await db.collection("advertisements").insertOne(newAdvertisement);

        return NextResponse.json({ success: true, message: 'Advertisement request submitted successfully' });
    } catch (error) {
        console.error('Error submitting advertisement:', error);
        return NextResponse.json({ success: false, error: 'Failed to submit advertisement request' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const { id, status } = await request.json();

        const client = await clientPromise;
        const db = client.db("general_pf");

        await db.collection("advertisements").updateOne(
            { _id: new ObjectId(id) },
            { $set: { status, updatedAt: new Date() } }
        );

        return NextResponse.json({ success: true, message: 'Advertisement status updated successfully' });
    } catch (error) {
        console.error('Error updating advertisement status:', error);
        return NextResponse.json({ success: false, error: 'Failed to update advertisement status' }, { status: 500 });
    }
}

