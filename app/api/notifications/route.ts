import { NextResponse } from "next/server"
import { dbConnection } from "@/app/lib/database"
import { Notification } from "@/app/lib/model"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const AUTHORIZED_EMAIL = "gnareshkumarreddy7@gmail.com"

export async function GET() {
  try {
    // Get user session
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log('GET - Starting request')
    await dbConnection()
    console.log('GET - Database connected')
    
    // Only fetch notifications for the authenticated user
    const notifications = await Notification.find({ userId: session.user.email })
      .sort({ createdAt: -1 })
    
    console.log('GET - Found notifications:', notifications.length)
    return NextResponse.json(notifications)
  } catch (error: any) {
    console.error("Error fetching notifications:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    console.log('POST - Starting request')
    const data = await req.json()
    console.log('POST - Received notification data:', {
      title: data.title,
      type: data.type,
      messageLength: data.message?.length,
      userId: data.userId
    })
    
    // Validate required fields
    if (!data.title || !data.message || !data.type) {
      console.log('POST - Missing required fields:', {
        hasTitle: !!data.title,
        hasMessage: !!data.message,
        hasType: !!data.type
      })
      return NextResponse.json(
        { error: "Title, message, and type are required" },
        { status: 400 }
      )
    }

    await dbConnection()
    console.log('POST - Database connected')

    // Create notification with timestamp
    const notification = await Notification.create({
      title: data.title,
      message: data.message,
      type: data.type,
      userId: data.userId,
      createdAt: new Date(),
      read: false
    })

    console.log('POST - Notification created:', {
      id: notification._id,
      title: notification.title,
      type: notification.type,
      userId: notification.userId
    })

    return NextResponse.json({ 
      message: "Notification sent successfully",
      notification 
    })
  } catch (error: any) {
    console.error("Error creating notification:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    })
    return NextResponse.json(
      { error: error.message || "Failed to create notification" },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    console.log('PUT - Starting request')
    const { id } = await req.json()
    console.log('PUT - Request data:', { id })
    
    if (!id) {
      console.log('PUT - No ID provided')
      return NextResponse.json(
        { error: "Notification ID is required" },
        { status: 400 }
      )
    }

    await dbConnection()
    console.log('PUT - Database connected')

    const notification = await Notification.findOneAndUpdate(
      { _id: id },
      { read: true },
      { new: true }
    )

    if (!notification) {
      console.log('PUT - Notification not found')
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      )
    }

    console.log('PUT - Notification updated:', {
      id: notification._id,
      title: notification.title,
      read: notification.read
    })
    
    return NextResponse.json(notification)
  } catch (error: any) {
    console.error("Error updating notification:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    return NextResponse.json(
      { error: error.message || "Failed to update notification" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    console.log('DELETE - Starting request')
    const { id } = await req.json()
    console.log('DELETE - Request data:', { id })
    
    if (!id) {
      console.log('DELETE - No ID provided')
      return NextResponse.json(
        { error: "Notification ID is required" },
        { status: 400 }
      )
    }

    await dbConnection()
    console.log('DELETE - Database connected')

    const notification = await Notification.findByIdAndDelete(id)

    if (!notification) {
      console.log('DELETE - Notification not found')
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      )
    }

    console.log('DELETE - Notification deleted:', {
      id: notification._id,
      title: notification.title
    })
    
    return NextResponse.json({ message: "Notification deleted successfully" })
  } catch (error: any) {
    console.error("Error deleting notification:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    return NextResponse.json(
      { error: error.message || "Failed to delete notification" },
      { status: 500 }
    )
  }
} 