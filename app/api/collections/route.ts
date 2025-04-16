import { NextResponse } from "next/server";
import { dbConnection } from "@/app/lib/database";
import { Collection } from "@/app/lib/model";

export async function POST(req: Request) {
  try {
    const db = await dbConnection();
    console.log('Database connected');

    const data = await req.json();
    console.log('Received collection data:', data);

    const collection = await Collection.create(data);
    console.log('Collection created:', collection);

    return NextResponse.json({ 
      message: "Collection created successfully", 
      collection 
    });
  } catch (error: any) {
    console.error("Collection creation error:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    
    return NextResponse.json(
      { 
        message: "Error creating collection", 
        error: error.message || "Unknown error occurred" 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnection();
    const collections = await Collection.find().sort({ createdAt: -1 });
    console.log('Fetched collections:', {
      isArray: Array.isArray(collections),
      length: collections?.length,
      type: typeof collections
    });
    return NextResponse.json(collections);
  } catch (error: any) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      { message: "Error fetching collections", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const db = await dbConnection();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: "Collection ID is required" },
        { status: 400 }
      );
    }

    const deletedCollection = await Collection.findByIdAndDelete(id);
    
    if (!deletedCollection) {
      return NextResponse.json(
        { message: "Collection not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: "Collection deleted successfully",
      collection: deletedCollection
    });
  } catch (error: any) {
    console.error("Collection deletion error:", error);
    return NextResponse.json(
      { message: "Error deleting collection", error: error.message },
      { status: 500 }
    );
  }
} 