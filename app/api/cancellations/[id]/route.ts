import { NextResponse } from "next/server"
import { dbConnection } from "@/app/lib/database"
import { Cancellation } from "@/app/lib/model"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnection()
    const cancellation = await Cancellation.findById(params.id)
    
    if (!cancellation) {
      return NextResponse.json(
        { error: "Cancellation not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(cancellation)
  } catch (error: any) {
    console.error("Error fetching cancellation:", error)
    return NextResponse.json(
      { error: "Failed to fetch cancellation" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnection()
    const cancellation = await Cancellation.findByIdAndDelete(params.id)
    
    if (!cancellation) {
      return NextResponse.json(
        { error: "Cancellation not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Cancellation deleted successfully" })
  } catch (error: any) {
    console.error("Error deleting cancellation:", error)
    return NextResponse.json(
      { error: "Failed to delete cancellation" },
      { status: 500 }
    )
  }
} 