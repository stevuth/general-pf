import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const client = await clientPromise;
        const db = client.db("general-pf");

        const result = await db.collection("announcements").deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, message: "Announcement not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Announcement deleted successfully" });
    } catch (error) {
        console.error("Error deleting announcement:", error);
        return NextResponse.json({ success: false, message: "Failed to delete announcement" }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db("general-pf");

        const result = await db.collection("announcements").updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...body, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ success: false, message: "Announcement not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Announcement updated successfully" });
    } catch (error) {
        console.error("Error updating announcement:", error);
        return NextResponse.json({ success: false, message: "Failed to update announcement" }, { status: 500 });
    }
}
