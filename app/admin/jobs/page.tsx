import clientPromise from "@/lib/mongodb";
import JobsAdminClient from "./client";

export const dynamic = 'force-dynamic';

export default async function AdminJobsPage() {
    const client = await clientPromise;
    const db = client.db("general-pf");
    const jobs = await db.collection("job_postings").find({}).sort({ createdAt: -1 }).toArray();

    // Convert ObjectIds to strings for client component
    const serializedJobs = JSON.parse(JSON.stringify(jobs));

    return <JobsAdminClient jobs={serializedJobs} />;
}
