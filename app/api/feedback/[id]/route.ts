import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const body = await request.json();
        const { status } = body;

        const client = await clientPromise;
        const db = client.db("general_pf");

        const result = await db.collection("feedback").updateOne(
            { _id: new ObjectId(id) },
            { $set: { status, updatedAt: new Date() } }
        );

        if (result.matchedCount === 1) {
            return NextResponse.json({ success: true, message: 'Feedback status updated' });
        } else {
            return NextResponse.json({ success: false, error: 'Feedback not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error updating feedback status:', error);
        return NextResponse.json({ success: false, error: 'Failed to update feedback status' }, { status: 500 });
    }
}
