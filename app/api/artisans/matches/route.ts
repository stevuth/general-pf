import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const requestId = searchParams.get('requestId');

        if (!requestId) {
            return NextResponse.json({ success: false, message: "Request ID is required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("general-pf");

        // 1. Get the Service Request
        const serviceRequest = await db.collection("artisan_requests").findOne({ _id: new ObjectId(requestId) });

        if (!serviceRequest) {
            return NextResponse.json({ success: false, message: "Service request not found" }, { status: 404 });
        }

        // 2. Find Matching Artisans
        // Logic: Same skill/trade, status is verified. 
        // Optional: Location matching (contains string match for now)

        const query = {
            skill: serviceRequest.artisanType,
            status: 'verified'
        };

        const matchingArtisans = await db.collection("artisan_join_requests").find(query).toArray();

        // Simple relevance sorting: Put artisans in same location at top
        const sortedArtisans = matchingArtisans.sort((a, b) => {
            const aLoc = (a.location || "").toLowerCase();
            const bLoc = (b.location || "").toLowerCase();
            const reqLoc = (serviceRequest.address || "").toLowerCase();

            const aMatch = aLoc.includes(reqLoc) || reqLoc.includes(aLoc);
            const bMatch = bLoc.includes(reqLoc) || reqLoc.includes(bLoc);

            if (aMatch && !bMatch) return -1;
            if (!aMatch && bMatch) return 1;
            return 0;
        });

        return NextResponse.json({
            success: true,
            data: sortedArtisans,
            criteria: {
                skill: serviceRequest.artisanType,
                location: serviceRequest.address
            }
        });

    } catch (error) {
        console.error("Error finding matches:", error);
        return NextResponse.json({ success: false, message: "Failed to find matches" }, { status: 500 });
    }
}
