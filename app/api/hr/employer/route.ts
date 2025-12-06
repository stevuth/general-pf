import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        // Extract files
        const paymentProofFile = formData.get("paymentProof") as File | null;
        const idDocumentFile = formData.get("idDocument") as File | null;

        // Upload files to Cloudinary if they exist
        let paymentProofUrl = "";
        let idDocumentUrl = "";

        if (paymentProofFile) {
            const buffer = Buffer.from(await paymentProofFile.arrayBuffer());
            paymentProofUrl = await uploadToCloudinary(buffer, "general-pf/employers/payment");
        }

        if (idDocumentFile) {
            const buffer = Buffer.from(await idDocumentFile.arrayBuffer());
            idDocumentUrl = await uploadToCloudinary(buffer, "general-pf/employers/id");
        }

        // Extract other form data
        const data: any = {};
        formData.forEach((value, key) => {
            if (key !== "paymentProof" && key !== "idDocument") {
                data[key] = value;
            }
        });

        // Add file URLs and timestamp
        const employerData = {
            ...data,
            paymentProofUrl,
            idDocumentUrl,
            createdAt: new Date(),
            status: "pending" // Default status
        };

        // Save to MongoDB
        const client = await clientPromise;
        const db = client.db("general-pf");
        await db.collection("employer_registrations").insertOne(employerData);

        return NextResponse.json({ success: true, message: "Employer registration submitted successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error submitting employer registration:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
