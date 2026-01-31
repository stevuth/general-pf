import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        const { email, accessCode } = await request.json();

        if (!email || !accessCode) {
            return NextResponse.json({ success: false, message: 'Email and Access Code are required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("general-pf");
        // advertise route used "general_pf". 
        // jobs route used "general-pf".
        // This is a discrepancy in the user's code. 
        // I should check which one advertise uses.
        // advertise/route.ts uses "general_pf".
        // jobs/route.ts uses "general-pf".
        // I will use "general_pf" for looking up the advertiser.

        const advertiser = await db.collection("advertisements").findOne({
            email: email,
            accessCode: accessCode
            // status: 'active' // Optional: Enforce only active advertisers can log in? 
            // The user said "once an employer purchase... they can post". 
            // I'll assume they can log in if they have the code which implies admin sent it aka approved.
        });

        if (!advertiser) {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }

        // Check if suspended
        if (advertiser.status === 'suspended') {
            return NextResponse.json({
                success: false,
                message: 'Your account has been suspended by the admin. Please contact support.'
            }, { status: 403 });
        }

        // Check for plan expiration
        const createdAt = new Date(advertiser.createdAt);
        const planDuration = advertiser.plan; // e.g., "1_month", "3_months"

        let monthsToAdd = 0;
        if (planDuration === "1_month") monthsToAdd = 1;
        else if (planDuration === "3_months") monthsToAdd = 3;
        else if (planDuration === "6_months") monthsToAdd = 6;
        else if (planDuration === "12_months") monthsToAdd = 12;

        const expiryDate = new Date(createdAt);
        expiryDate.setMonth(expiryDate.getMonth() + monthsToAdd);

        if (new Date() > expiryDate) {
            return NextResponse.json({
                success: false,
                message: 'Your advertisement plan has expired. Please renew to continue posting.'
            }, { status: 403 });
        }

        // Calculate posting limit based on plan
        let postingLimit = 0;
        if (planDuration === "1_month") postingLimit = 5;
        else if (planDuration === "3_months") postingLimit = 12;
        else if (planDuration === "6_months") postingLimit = 25;
        else if (planDuration === "12_months") postingLimit = 50;

        // Count current posts
        const jobCount = await db.collection("job_postings").countDocuments({
            contactEmail: advertiser.email,
            contactPhone: advertiser.phone
        });

        const propertyCount = await db.collection("properties").countDocuments({
            $or: [
                { contactEmail: advertiser.email },
                { contactPhone: advertiser.phone, contactEmail: { $exists: false } }
            ]
        });

        const totalPosts = jobCount + propertyCount;

        return NextResponse.json({
            success: true,
            advertiser: {
                _id: advertiser._id,
                businessName: advertiser.businessName,
                contactPerson: advertiser.contactPerson,
                email: advertiser.email,
                phone: advertiser.phone,
                businessType: advertiser.businessType,
                plan: advertiser.plan,
                expiryDate: expiryDate.toISOString(),
                postingLimit: postingLimit,
                currentPosts: totalPosts,
                remainingPosts: Math.max(0, postingLimit - totalPosts),
                whatsappNumber: advertiser.whatsappNumber || null,
                whatsappEnabled: advertiser.whatsappEnabled || false,
                whatsappExpiry: advertiser.whatsappExpiry ? advertiser.whatsappExpiry.toISOString() : null
            }
        });

    } catch (error) {
        console.error('Error logging in:', error);
        return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
    }
}
