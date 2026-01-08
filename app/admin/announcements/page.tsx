import clientPromise from "@/lib/mongodb";
import AnnouncementsAdminClient from "./client";

export const dynamic = 'force-dynamic';

export default async function AdminAnnouncementsPage() {
    const client = await clientPromise;
    const db = client.db("general-pf");
    const announcements = await db.collection("announcements").find({}).sort({ createdAt: -1 }).toArray();

    // Convert ObjectIds to strings for client component
    const serializedAnnouncements = JSON.parse(JSON.stringify(announcements));

    return <AnnouncementsAdminClient announcements={serializedAnnouncements} />;
}
