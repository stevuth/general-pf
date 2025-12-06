import clientPromise from "@/lib/mongodb";
import FeedbackAdminClient from "./client";

export const dynamic = 'force-dynamic';

export default async function AdminFeedbackPage() {
    const client = await clientPromise;
    const db = client.db("general-pf");
    const feedbackList = await db.collection("feedback").find({}).sort({ createdAt: -1 }).toArray();

    // Convert ObjectIds to strings for client component
    const serializedFeedback = JSON.parse(JSON.stringify(feedbackList));

    return <FeedbackAdminClient feedbackList={serializedFeedback} />;
}
