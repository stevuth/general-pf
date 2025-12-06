import clientPromise from "@/lib/mongodb";
import HRAdminClient from "./client";

export const dynamic = 'force-dynamic';

export default async function AdminHRPage() {
    const client = await clientPromise;
    const db = client.db("general-pf");
    const applications = await db.collection("job_applications").find({}).sort({ createdAt: -1 }).toArray();
    const employerRegistrations = await db.collection("employer_registrations").find({}).sort({ createdAt: -1 }).toArray();

    // Convert ObjectIds to strings for client component
    const serializedApplications = JSON.parse(JSON.stringify(applications));
    const serializedEmployerRegistrations = JSON.parse(JSON.stringify(employerRegistrations));

    return (
        <HRAdminClient
            applications={serializedApplications}
            employerRegistrations={serializedEmployerRegistrations}
        />
    );
}
