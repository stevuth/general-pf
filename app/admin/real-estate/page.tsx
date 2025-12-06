import clientPromise from "@/lib/mongodb";
import RealEstateAdminClient from "./client";

export const dynamic = 'force-dynamic';

export default async function AdminRealEstatePage() {
    const client = await clientPromise;
    const db = client.db("general-pf");
    const listings = await db.collection("property_listings").find({}).sort({ createdAt: -1 }).toArray();

    // Convert ObjectIds to strings for client component
    const serializedListings = JSON.parse(JSON.stringify(listings));

    return <RealEstateAdminClient listings={serializedListings} />;
}
