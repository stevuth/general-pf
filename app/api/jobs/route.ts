import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET - Fetch jobs with optional filtering
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const contactEmail = searchParams.get('contactEmail');
        const contactPhone = searchParams.get('contactPhone');

        const query: Record<string, any> = { status: "active" };
        if (contactEmail && contactEmail !== 'undefined') query.contactEmail = contactEmail;
        if (contactPhone && contactPhone !== 'undefined') query.contactPhone = contactPhone;

        const client = await clientPromise;
        const db = client.db("general-pf");

        console.log("Fetching jobs with query:", JSON.stringify(query));

        const jobs = await db.collection("job_postings")
            .find(query)
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
            contactEmail: body.contactEmail || "",
            contactPhone: body.contactPhone || "",
            posterType: body.contactPerson ? "Agent" : "Admin",
            posterName: body.contactPerson || "General PF Admin",
            status: "active",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const client = await clientPromise;
        const db = client.db("general-pf");

        // If this is an agent post, check posting limits
        if (body.contactPerson && body.contactEmail && body.contactPhone) {
            // Find the advertiser
            const advertiser = await db.collection("advertisements").findOne({
                email: body.contactEmail,
                phone: body.contactPhone
            });

            if (advertiser) {
                // Calculate posting limit
                let postingLimit = 0;
                const plan = advertiser.plan;
                if (plan === "1_month") postingLimit = 5;
                else if (plan === "3_months") postingLimit = 12;
                else if (plan === "6_months") postingLimit = 25;
                else if (plan === "12_months") postingLimit = 50;

                // Count current posts
                const jobCount = await db.collection("job_postings").countDocuments({
                    contactEmail: body.contactEmail,
                    contactPhone: body.contactPhone
                });

                const propertyCount = await db.collection("properties").countDocuments({
                    contactPhone: body.contactPhone
                });

                const totalPosts = jobCount + propertyCount;

                if (totalPosts >= postingLimit) {
                    return NextResponse.json({
                        success: false,
                        message: `Posting limit reached. Your ${plan.replace('_', ' ')} plan allows ${postingLimit} listings. You have ${totalPosts} active listings.`
                    }, { status: 403 });
                }
            }
        }

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

// PATCH - Update a job
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ success: false, message: "Job ID is required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("general-pf");

        await db.collection("job_postings").updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...updateData, updatedAt: new Date() } }
        );

        return NextResponse.json({ success: true, message: "Job updated successfully" });
    } catch (error) {
        console.error("Error updating job:", error);
        return NextResponse.json({ success: false, message: "Failed to update job" }, { status: 500 });
    }
}

// DELETE - Delete a job
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        let id = searchParams.get('id');

        // Try getting ID from body if not in search params
        if (!id) {
            try {
                const body = await request.json();
                id = body.id;
            } catch (e) {
                // Not a JSON body
            }
        }

        if (!id) {
            return NextResponse.json({ success: false, message: "Job ID is required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("general-pf");

        await db.collection("job_postings").deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ success: true, message: "Job deleted successfully" });
    } catch (error) {
        console.error("Error deleting job:", error);
        return NextResponse.json({ success: false, message: "Failed to delete job" }, { status: 500 });
    }
}
