import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET - Fetch all active announcements
export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("general-pf");
        const announcements = await db.collection("announcements")
            .find({ isActive: true })
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({ success: true, announcements: JSON.parse(JSON.stringify(announcements)) });
    } catch (error) {
        console.error("Error fetching announcements:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch announcements" }, { status: 500 });
    }
}

// POST - Create new announcement
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { text, link } = body;

        if (!text) {
            return NextResponse.json({ success: false, message: "Announcement text is required" }, { status: 400 });
        }

        const announcementData = {
            text,
            link: link || null,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const client = await clientPromise;
        const db = client.db("general-pf");
        const result = await db.collection("announcements").insertOne(announcementData);

        return NextResponse.json({
            success: true,
            message: "Announcement created successfully",
            announcementId: result.insertedId
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating announcement:", error);
        return NextResponse.json({ success: false, message: "Failed to create announcement" }, { status: 500 });
    }
}
