import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("general_pf");
        const trainings = await db.collection("trainings").find({}).sort({ createdAt: -1 }).toArray();

        return NextResponse.json({ success: true, trainings });
    } catch (error) {
        console.error('Error fetching trainings:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch trainings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const date = formData.get('date') as string;
        const time = formData.get('time') as string;
        const instructor = formData.get('instructor') as string;
        const meetingLink = formData.get('meetingLink') as string;
        const imageFile = formData.get('image') as File | null;

        let imageUrl = '';

        if (imageFile) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            imageUrl = await uploadToCloudinary(buffer, 'general-pf/trainings');
        }

        const client = await clientPromise;
        const db = client.db("general_pf");

        const newTraining = {
            title,
            description,
            date,
            time,
            instructor,
            meetingLink,
            image: imageUrl,
            createdAt: new Date(),
        };

        await db.collection("trainings").insertOne(newTraining);

        return NextResponse.json({ success: true, message: 'Training created successfully' });
    } catch (error) {
        console.error('Error creating training:', error);
        return NextResponse.json({ success: false, error: 'Failed to create training' }, { status: 500 });
    }
}
