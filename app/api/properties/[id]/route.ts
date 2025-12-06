import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// DELETE - Delete a property
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid property ID" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("general-pf");
        const result = await db.collection("properties").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Property deleted successfully" });

    } catch (error) {
        console.error("Error deleting property:", error);
        return NextResponse.json({ success: false, message: "Failed to delete property" }, { status: 500 });
    }
}

// PATCH - Update property details
export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const body = await request.json();

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid property ID" }, { status: 400 });
        }

        const updateData = {
            ...body,
            updatedAt: new Date()
        };

        const client = await clientPromise;
        const db = client.db("general-pf");
        const result = await db.collection("properties").updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Property updated successfully" });

    } catch (error) {
        console.error("Error updating property:", error);
        return NextResponse.json({ success: false, message: "Failed to update property" }, { status: 500 });
    }
}
