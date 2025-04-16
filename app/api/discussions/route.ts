import { NextResponse } from "next/server";
import { dbConnection } from "@/app/lib/database";
import { Discussion } from "@/app/lib/model";

export async function GET() {
  try {
    await dbConnection();
    const discussions = await Discussion.find().sort({ createdAt: -1 });
    return NextResponse.json(discussions);
  } catch (error: any) {
    console.error("Error fetching discussions:", error);
    return NextResponse.json(
      { message: "Error fetching discussions", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnection();
    const data = await req.json();
    
    const discussion = await Discussion.create(data);
    
    return NextResponse.json({ 
      message: "Discussion created successfully", 
      discussion 
    });
  } catch (error: any) {
    console.error("Discussion creation error:", error);
    return NextResponse.json(
      { 
        message: "Error creating discussion", 
        error: error.message || "Unknown error occurred" 
      },
      { status: 500 }
    );
  }
} 