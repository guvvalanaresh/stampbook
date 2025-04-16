import { NextResponse } from "next/server";
import { dbConnection } from "@/app/lib/database";
import { Card } from "@/app/lib/model";

export async function POST(req: Request) {
  try {
    await dbConnection();
    const data = await req.json();
    
    // Log the received data
    console.log('Received card data:', data);

    // Convert releaseDate string to Date object
    const cardData = {
      ...data,
      releaseDate: new Date(data.releaseDate)
    };
    
    // Log the processed data
    console.log('Processing card data:', cardData);

    const card = await Card.create(cardData);
    
    // Log the created card
    console.log('Card created:', card);

    return NextResponse.json({ message: "Card created successfully", card });
  } catch (error: any) {
    // Detailed error logging
    console.error("Card creation error:", {
      message: error.message,
      stack: error.stack,
      details: error
    });
    
    return NextResponse.json(
      { message: "Error creating card", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnection();
    const cards = await Card.find().sort({ createdAt: -1 });
    console.log('Fetched cards:', {
      isArray: Array.isArray(cards),
      length: cards?.length,
      type: typeof cards
    });
    return NextResponse.json(cards);
  } catch (error: any) {
    console.error("Error fetching cards:", error);
    return NextResponse.json(
      { message: "Error fetching cards", error: error.message },
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
        { message: "Card ID is required" },
        { status: 400 }
      );
    }

    const deletedCard = await Card.findByIdAndDelete(id);
    
    if (!deletedCard) {
      return NextResponse.json(
        { message: "Card not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: "Card deleted successfully",
      card: deletedCard
    });
  } catch (error: any) {
    console.error("Card deletion error:", error);
    return NextResponse.json(
      { message: "Error deleting card", error: error.message },
      { status: 500 }
    );
  }
} 