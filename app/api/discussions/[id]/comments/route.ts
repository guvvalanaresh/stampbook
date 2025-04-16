import { NextResponse } from "next/server";
import { dbConnection } from "@/app/lib/database";
import { Discussion } from "@/app/lib/model";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnection();
    const { id } = params;
    const data = await req.json();

    const discussion = await Discussion.findById(id);
    
    if (!discussion) {
      return NextResponse.json(
        { message: "Discussion not found" },
        { status: 404 }
      );
    }

    discussion.comments.push(data);
    await discussion.save();

    return NextResponse.json({ 
      message: "Comment added successfully",
      discussion
    });
  } catch (error: any) {
    console.error("Comment creation error:", error);
    return NextResponse.json(
      { message: "Error adding comment", error: error.message },
      { status: 500 }
    );
  }
} 