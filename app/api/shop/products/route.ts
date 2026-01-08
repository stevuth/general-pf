import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("general-pf");
        const products = await db.collection("products").find({}).sort({ createdAt: -1 }).toArray();
        return NextResponse.json({ success: true, data: products });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db("general-pf");

        const newProduct = {
            ...body,
            createdAt: new Date(),
        };

        await db.collection("products").insertOne(newProduct);
        return NextResponse.json({ success: true, message: "Product created successfully", data: newProduct });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to create product" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });

        const client = await clientPromise;
        const db = client.db("general-pf");

        await db.collection("products").deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json({ success: true, message: "Product deleted" });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to delete product" }, { status: 500 });
    }
}
