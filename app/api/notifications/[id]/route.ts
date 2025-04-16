import { NextResponse } from "next/server"
import { dbConnection } from "@/app/lib/database"
import { Notification } from "@/app/lib/model"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function PUT(request: Request, context: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnection()
    const params = await context.params
    const id = params.id

    const notification = await Notification.findById(id)
    if (!notification) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      )
    }

    // Update the notification as read
    notification.read = true
    await notification.save()

    return NextResponse.json({ success: true, notification })
  } catch (error: any) {
    console.error("Error marking notification as read:", error)
    return NextResponse.json(
      { error: "Failed to mark notification as read" },
      { status: 500 }
    )
  }
} 