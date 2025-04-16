import { NextResponse } from "next/server";
import { dbConnection } from "@/app/lib/database";
import { Listing } from "@/app/lib/model";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnection();
    const { id } = params;

    const listing = await Listing.findById(id);
    
    if (!listing) {
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 }
      );
    }

    if (listing.status === "sold") {
      return NextResponse.json(
        { message: "This item has already been sold" },
        { status: 400 }
      );
    }

    // Update the listing status to sold
    listing.status = "sold";
    await listing.save();

    return NextResponse.json({ 
      message: "Purchase successful",
      listing
    });
  } catch (error: any) {
    console.error("Purchase error:", error);
    return NextResponse.json(
      { message: "Error processing purchase", error: error.message },
      { status: 500 }
    );
  }
} 