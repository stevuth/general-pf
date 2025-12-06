import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        // Check if user is authenticated
        const cookieStore = await cookies();
        const session = cookieStore.get('admin_session');

        if (!session) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorized'
            }, { status: 401 });
        }

        const body = await request.json();
        const { currentPassword, newPassword } = body;

        // Get credentials from environment variables
        const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

        const client = await clientPromise;
        const db = client.db("general_pf");

        // Check if there's a stored password in database
        const adminDoc = await db.collection("admin_settings").findOne({ type: 'credentials' });

        let isCurrentPasswordValid = false;

        // Verify current password (check database first, then env)
        if (adminDoc && adminDoc.password) {
            // Check against hashed password in database
            isCurrentPasswordValid = await bcrypt.compare(currentPassword, adminDoc.password);
        } else {
            // Fallback to env password
            isCurrentPasswordValid = currentPassword === ADMIN_PASSWORD;
        }

        if (!isCurrentPasswordValid) {
            return NextResponse.json({
                success: false,
                message: 'Current password is incorrect'
            }, { status: 401 });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Store or update the password in database
        await db.collection("admin_settings").updateOne(
            { type: 'credentials' },
            {
                $set: {
                    type: 'credentials',
                    username: ADMIN_USERNAME,
                    password: hashedPassword,
                    updatedAt: new Date()
                }
            },
            { upsert: true }
        );

        return NextResponse.json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        console.error('Password change error:', error);
        return NextResponse.json({
            success: false,
            message: 'An error occurred while changing password'
        }, { status: 500 });
    }
}
