import { Metadata } from "next";
import PropertiesAdminClient from "./client";
import clientPromise from "@/lib/mongodb";

export const metadata: Metadata = {
    title: "Manage Properties - Admin Portal",
    description: "Post and manage real estate properties",
};

async function getProperties() {
    try {
        const client = await clientPromise;
        const db = client.db("general-pf");
        const properties = await db.collection("properties")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();
        return JSON.parse(JSON.stringify(properties));
    } catch (error) {
        console.error("Error fetching properties:", error);
        return [];
    }
}

export default async function PropertiesAdminPage() {
    const properties = await getProperties();
    return <PropertiesAdminClient initialProperties={properties} />;
}
