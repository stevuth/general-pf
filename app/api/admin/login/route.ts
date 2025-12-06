import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Get credentials from environment variables
        const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

        if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
            console.error("Admin credentials not configured");
            return NextResponse.json({ success: false, message: "Server configuration error" }, { status: 500 });
        }

        // Check username first
        if (username !== ADMIN_USERNAME) {
            return NextResponse.json({
                success: false,
                message: 'Invalid username or password'
            }, { status: 401 });
        }

        const client = await clientPromise;
        const db = client.db("general_pf");

        // Check if there's a stored password in database
        const adminDoc = await db.collection("admin_settings").findOne({ type: 'credentials' });

        let isPasswordValid = false;

        if (adminDoc && adminDoc.password) {
            // Verify against hashed password in database
            isPasswordValid = await bcrypt.compare(password, adminDoc.password);
        } else {
            // Fallback to env password for initial login
            isPasswordValid = password === ADMIN_PASSWORD;
        }

        // Validate credentials
        if (isPasswordValid) {
            // Create session token
            const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString('base64');

            // Set secure cookie
            const cookieStore = await cookies();
            cookieStore.set('admin_session', sessionToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/',
            });

            return NextResponse.json({
                success: true,
                message: 'Login successful'
            });
        } else {
            return NextResponse.json({
                success: false,
                message: 'Invalid username or password'
            }, { status: 401 });
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({
            success: false,
            message: 'An error occurred during login'
        }, { status: 500 });
    }
}
