import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { ObjectId } from "mongodb";

// GET - Fetch all admin-posted properties
// GET - Fetch all admin-posted properties
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const contactPhone = searchParams.get('contactPhone');
        const contactEmail = searchParams.get('contactEmail');

        let query: Record<string, any> = {};
        if (contactEmail && contactEmail !== 'undefined') {
            query.$or = [
                { contactEmail: contactEmail },
                { contactPhone: contactPhone, contactEmail: { $exists: false } }
            ];
        } else if (contactPhone && contactPhone !== 'undefined') {
            query.contactPhone = contactPhone;
        }

        const client = await clientPromise;
        const db = client.db("general-pf");

        console.log("Fetching properties with query:", JSON.stringify(query));

        const properties = await db.collection("properties")
            .find(query)
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({ success: true, properties: JSON.parse(JSON.stringify(properties)) });
    } catch (error) {
        console.error("Error fetching properties:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch properties" }, { status: 500 });
    }
}

// DELETE - Delete a property
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
            return NextResponse.json({ success: false, message: "Property ID is required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("general-pf");

        const result = await db.collection("properties").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Property deleted successfully" });
    } catch (error) {
        console.error("Error deleting property:", error);
        return NextResponse.json({ success: false, message: "Failed to delete property" }, { status: 500 });
    }
}

// PATCH - Update a property
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ success: false, message: "Property ID is required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("general-pf");

        // Remove strict fields that shouldn't be updated via simple JSON patch if necessary, 
        // but for now allow updating all passed fields (except _id which is handled).
        // Note: This implementation only supports updating text fields sent as JSON.
        // It does not currently support updating images/video via this endpoint.

        await db.collection("properties").updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...updateData, updatedAt: new Date() } }
        );

        return NextResponse.json({ success: true, message: "Property updated successfully" });
    } catch (error) {
        console.error("Error updating property:", error);
        return NextResponse.json({ success: false, message: "Failed to update property" }, { status: 500 });
    }
}

// POST - Create new property (Admin)
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const propertyType = formData.get("propertyType") as string;
        const listingType = formData.get("listingType") as string;
        const price = formData.get("price") as string;
        const location = formData.get("location") as string;
        const description = formData.get("description") as string;
        const contactPhone = formData.get("contactPhone") as string;
        const contactEmail = formData.get("contactEmail") as string;
        const contactPerson = formData.get("contactPerson") as string;

        const photos = formData.getAll("photos") as File[];
        // const video = formData.get("video") as File; // Video upload currently skipped for simplicity

        if (!propertyType || !listingType || !price || !location) {
            return NextResponse.json({ success: false, message: "Required fields missing" }, { status: 400 });
        }

        // Upload images to Cloudinary
        const imageUrls: string[] = [];
        for (const photo of photos) {
            if (photo.size > 0) { // Only process non-empty files
                const buffer = Buffer.from(await photo.arrayBuffer());
                const url = await uploadToCloudinary(buffer, "properties");
                if (url) imageUrls.push(url);
            }
        }

        // Upload Video (retained from original, but commented out in snippet)
        let videoUrl = "";
        const video = formData.get('video') as File | null;
        if (video && video.size > 0) {
            videoUrl = await uploadToCloudinary(Buffer.from(await video.arrayBuffer()), 'properties');
        }

        const propertyData = {
            propertyType,
            listingType,
            price,
            location,
            description: description || "",
            images: imageUrls,
            video: videoUrl, // Retained video field
            contactPhone: contactPhone || "",
            contactEmail: contactEmail || "",
            posterType: contactPerson ? "Agent" : "Admin",
            posterName: contactPerson || "General PF Admin",
            status: "active",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const client = await clientPromise;
        const db = client.db("general-pf");

        // If this is an agent post, check posting limits
        if (contactPerson && contactPhone) {
            // Find the advertiser
            const advertiser = await db.collection("advertisements").findOne({
                phone: contactPhone
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
                    contactEmail: advertiser.email,
                    contactPhone: contactPhone
                });

                const propertyCount = await db.collection("properties").countDocuments({
                    $or: [
                        { contactEmail: advertiser.email },
                        { contactPhone: contactPhone, contactEmail: { $exists: false } }
                    ]
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

        const result = await db.collection("properties").insertOne(propertyData);

        return NextResponse.json({
            success: true,
            message: "Property posted successfully",
            propertyId: result.insertedId
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating property:", error);
        return NextResponse.json({ success: false, message: "Failed to create property" }, { status: 500 });
    }
}
