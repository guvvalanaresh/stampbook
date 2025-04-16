import { NextResponse } from "next/server";
import { dbConnection } from "@/app/lib/database";
import { Listing } from "@/app/lib/model";

export async function GET() {
  try {
    await dbConnection();
    const listings = await Listing.find().sort({ createdAt: -1 });
    return NextResponse.json(listings);
  } catch (error: any) {
    console.error("Error fetching listings:", error);
    return NextResponse.json(
      { message: "Error fetching listings", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const db = await dbConnection();
    const data = await req.json();
    
    const listing = await Listing.create(data);
    
    return NextResponse.json({ 
      message: "Listing created successfully", 
      listing 
    });
  } catch (error: any) {
    console.error("Listing creation error:", error);
    return NextResponse.json(
      { 
        message: "Error creating listing", 
        error: error.message || "Unknown error occurred" 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnection();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: "Listing ID is required" },
        { status: 400 }
      );
    }

    const deletedListing = await Listing.findByIdAndDelete(id);
    
    if (!deletedListing) {
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: "Listing deleted successfully",
      listing: deletedListing
    });
  } catch (error: any) {
    console.error("Listing deletion error:", error);
    return NextResponse.json(
      { message: "Error deleting listing", error: error.message },
      { status: 500 }
    );
  }
} 