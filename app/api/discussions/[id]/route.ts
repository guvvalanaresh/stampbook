import { NextResponse } from "next/server"
import { dbConnection } from "@/app/lib/database"
import { Discussion } from "@/app/lib/model"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnection()
    const discussion = await Discussion.findById(params.id)
    
    if (!discussion) {
      return NextResponse.json(
        { error: "Discussion not found" },
        { status: 404 }
      )
    }

    // Only allow the author to delete their own discussion
    if (discussion.author.email !== session.user.email) {
      return NextResponse.json(
        { error: "You can only delete your own discussions" },
        { status: 403 }
      )
    }

    await Discussion.findByIdAndDelete(params.id)

    return NextResponse.json({ message: "Discussion deleted successfully" })
  } catch (error: any) {
    console.error("Error deleting discussion:", error)
    return NextResponse.json(
      { error: "Failed to delete discussion" },
      { status: 500 }
    )
  }
} 