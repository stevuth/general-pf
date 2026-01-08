import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        const requiredFields = ['name', 'phone', 'address', 'artisanType', 'dateNeeded', 'description'];
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { success: false, message: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        const requestData = {
            ...body,
            createdAt: new Date(),
            status: 'pending'
        };

        const client = await clientPromise;
        const db = client.db("general-pf");
        await db.collection("artisan_requests").insertOne(requestData);

        return NextResponse.json({ success: true, message: "Request submitted successfully" });

    } catch (error) {
        console.error("Error submitting artisan request:", error);
        return NextResponse.json({ success: false, message: "Failed to submit request" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("general-pf");
        const requests = await db.collection("artisan_requests").find({}).sort({ createdAt: -1 }).toArray();

        return NextResponse.json({ success: true, data: requests });
    } catch (error) {
        console.error("Error fetching artisan requests:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch requests" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("general-pf");

        const result = await db.collection("artisan_requests").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, message: "Request not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Request deleted successfully" });
    } catch (error) {
        console.error("Error deleting artisan request:", error);
        return NextResponse.json({ success: false, message: "Failed to delete request" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ success: false, message: "ID and status are required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("general-pf");

        const result = await db.collection("artisan_requests").updateOne(
            { _id: new ObjectId(id) },
            { $set: { status } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ success: false, message: "Request not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Status updated successfully" });
    } catch (error) {
        console.error("Error updating artisan request status:", error);
        return NextResponse.json({ success: false, message: "Failed to update status" }, { status: 500 });
    }
}
