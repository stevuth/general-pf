import clientPromise from "@/lib/mongodb";
import LogisticsAdminClient from "./client";

export const dynamic = 'force-dynamic';

export default async function AdminLogisticsPage() {
    const client = await clientPromise;
    const db = client.db("general-pf");
    const requests = await db.collection("logistics_requests").find({}).sort({ createdAt: -1 }).toArray();

    // Convert ObjectIds to strings for client component
    const serializedRequests = JSON.parse(JSON.stringify(requests));

    return <LogisticsAdminClient requests={serializedRequests} />;
}
