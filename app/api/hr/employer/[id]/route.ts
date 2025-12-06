"use server";

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// DELETE an employer registration
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id || !ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid registration ID" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("general-pf");

        const result = await db.collection("employer_registrations").deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Registration not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Registration deleted successfully" });
    } catch (error) {
        console.error("Error deleting registration:", error);
        return NextResponse.json({ error: "Failed to delete registration" }, { status: 500 });
    }
}
