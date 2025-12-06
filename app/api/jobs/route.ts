import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET - Fetch all jobs
export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("general-pf");
        const jobs = await db.collection("job_postings")
            .find({ status: "active" })
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({ success: true, jobs: JSON.parse(JSON.stringify(jobs)) });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch jobs" }, { status: 500 });
    }
}

// POST - Create new job
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, company, location, salary, description } = body;

        if (!title || !company || !location) {
            return NextResponse.json({ success: false, message: "Required fields missing" }, { status: 400 });
        }

        const jobData = {
            title,
            company,
            location,
            salary: salary || "Competitive",
            description: description || "",
            status: "active",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const client = await clientPromise;
        const db = client.db("general-pf");
        const result = await db.collection("job_postings").insertOne(jobData);

        return NextResponse.json({
            success: true,
            message: "Job posted successfully",
            jobId: result.insertedId
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating job:", error);
        return NextResponse.json({ success: false, message: "Failed to create job" }, { status: 500 });
    }
}
