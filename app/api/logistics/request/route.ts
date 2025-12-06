import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const data: any = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const requestData = {
            ...data,
            createdAt: new Date(),
            status: 'pending'
        };

        const client = await clientPromise;
        const db = client.db("general-pf");
        await db.collection("logistics_requests").insertOne(requestData);

        return NextResponse.json({ success: true, message: "Request submitted successfully" });

    } catch (error) {
        console.error("Error submitting logistics request:", error);
        return NextResponse.json({ success: false, message: "Failed to submit request" }, { status: 500 });
    }
}
