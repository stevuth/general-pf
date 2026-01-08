import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("general-pf");
        const requests = await db.collection("product_requests").find({}).sort({ createdAt: -1 }).toArray();
        return NextResponse.json({ success: true, data: requests });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to fetch requests" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db("general-pf");

        const newRequest = {
            ...body,
            status: 'pending',
            createdAt: new Date(),
        };

        await db.collection("product_requests").insertOne(newRequest);
        return NextResponse.json({ success: true, message: "Request submitted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to submit request" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });

        const client = await clientPromise;
        const db = client.db("general-pf");

        await db.collection("product_requests").deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json({ success: true, message: "Request deleted" });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to delete request" }, { status: 500 });
    }
}
