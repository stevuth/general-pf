import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const client = await clientPromise;
        const db = client.db("general_pf");

        const result = await db.collection("trainings").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            return NextResponse.json({ success: true, message: 'Training deleted successfully' });
        } else {
            return NextResponse.json({ success: false, error: 'Training not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error deleting training:', error);
        return NextResponse.json({ success: false, error: 'Failed to delete training' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db("general_pf");

        // Remove _id from body if present to avoid immutable field error
        const { _id, ...updateData } = body;

        const result = await db.collection("trainings").updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 1) {
            return NextResponse.json({ success: true, message: 'Training updated successfully' });
        } else {
            return NextResponse.json({ success: false, error: 'Training not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error updating training:', error);
        return NextResponse.json({ success: false, error: 'Failed to update training' }, { status: 500 });
    }
}
