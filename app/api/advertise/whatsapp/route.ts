import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { ObjectId } from "mongodb";

// GET - Admin fetches all WhatsApp activation requests
export async function GET(request: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db("general-pf");

        const requests = await db.collection("whatsapp_requests")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({ success: true, requests });
    } catch (error) {
        console.error("Error fetching WhatsApp requests:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}

// POST - Advertiser submits activation request
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const advertiserId = formData.get("advertiserId") as string;
        const advertiserPhone = formData.get("advertiserPhone") as string;
        const advertiserEmail = formData.get("advertiserEmail") as string;
        const businessName = formData.get("businessName") as string;
        const plan = formData.get("plan") as string;
        const paymentProofFile = formData.get("paymentProof") as File | null;

        const whatsappNumber = formData.get("whatsappNumber") as string;

        if (!advertiserId || !plan || !paymentProofFile) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        let paymentProofUrl = "";
        if (paymentProofFile) {
            const buffer = Buffer.from(await paymentProofFile.arrayBuffer());
            paymentProofUrl = await uploadToCloudinary(buffer, "general-pf/whatsapp-activation");
        }

        const client = await clientPromise;
        const db = client.db("general-pf");

        // Update advertiser's whatsapp number preference
        await db.collection("advertisements").updateOne(
            { _id: new ObjectId(advertiserId) },
            { $set: { whatsappNumber: whatsappNumber, updatedAt: new Date() } }
        );

        const activationRequest = {
            advertiserId,
            advertiserPhone,
            advertiserEmail,
            businessName,
            whatsappNumber,
            plan,
            paymentProofUrl,
            status: "pending",
            createdAt: new Date(),
        };

        await db.collection("whatsapp_requests").insertOne(activationRequest);

        return NextResponse.json({ success: true, message: "Activation request submitted successfully" });
    } catch (error) {
        console.error("Error submitting WhatsApp request:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}

// PATCH - Admin activates WhatsApp for advertiser
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { requestId, advertiserId, plan } = body;

        if (!requestId || !advertiserId || !plan) {
            return NextResponse.json({ success: false, message: "Missing required data" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("general-pf");

        // Calculate expiry date based on plan
        const expiryDate = new Date();
        if (plan === "1_month") expiryDate.setMonth(expiryDate.getMonth() + 1);
        else if (plan === "3_months") expiryDate.setMonth(expiryDate.getMonth() + 3);
        else if (plan === "6_months") expiryDate.setMonth(expiryDate.getMonth() + 6);
        else if (plan === "12_months") expiryDate.setFullYear(expiryDate.getFullYear() + 1);

        // Update activation request status
        await db.collection("whatsapp_requests").updateOne(
            { _id: new ObjectId(requestId) },
            { $set: { status: "activated", activatedAt: new Date() } }
        );

        // Update advertiser's WhatsApp status
        await db.collection("advertisements").updateOne(
            { _id: new ObjectId(advertiserId) },
            {
                $set: {
                    whatsappEnabled: true,
                    whatsappExpiry: expiryDate,
                    updatedAt: new Date()
                }
            }
        );

        return NextResponse.json({ success: true, message: "WhatsApp button activated successfully" });
    } catch (error) {
        console.error("Error activating WhatsApp:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
