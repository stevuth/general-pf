import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { feedback, page, userAgent } = body;

        if (!feedback || feedback.trim() === "") {
            return NextResponse.json({ success: false, message: "Feedback is required" }, { status: 400 });
        }

        const feedbackData = {
            feedback: feedback.trim(),
            page: page || "Unknown",
            userAgent: userAgent || "Unknown",
            createdAt: new Date(),
            status: "new"
        };

        const client = await clientPromise;
        const db = client.db("general-pf");
        await db.collection("feedback").insertOne(feedbackData);

        return NextResponse.json({ success: true, message: "Feedback submitted successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error submitting feedback:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
