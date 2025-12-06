import clientPromise from "@/lib/mongodb";
import TrainingsAdminClient from "./client";

export const dynamic = 'force-dynamic';

async function getTrainings() {
    try {
        const client = await clientPromise;
        const db = client.db("general_pf");
        const trainings = await db.collection("trainings").find({}).sort({ createdAt: -1 }).toArray();

        return JSON.parse(JSON.stringify(trainings));
    } catch (error) {
        console.error("Error fetching trainings:", error);
        return [];
    }
}

export default async function TrainingsAdminPage() {
    const trainings = await getTrainings();

    return <TrainingsAdminClient initialTrainings={trainings} />;
}
