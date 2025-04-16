import { NextResponse } from "next/server";
import { dbConnection } from "@/app/lib/database";
import { Collection } from "@/app/lib/model";

export async function GET(request: Request, context: { params: { id: string } }) {
  try {
    await dbConnection();
    const params = await context.params;
    const id = params.id;
    const collection = await Collection.findById(id);
    
    if (!collection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(collection);
  } catch (error: any) {
    console.error("Error fetching collection:", error);
    return NextResponse.json(
      { error: "Failed to fetch collection" },
      { status: 500 }
    );
  }
} 