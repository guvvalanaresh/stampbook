import { NextResponse } from "next/server"
import { dbConnection } from "@/app/lib/database"
import { SupportTicket, Notification } from "@/app/lib/model"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function PUT(request: Request, context: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnection()

    // Log the request body for debugging
    const body = await request.json()
    console.log('PUT - Request body:', body)

    const { message, status } = body
    const id = context.params.id

    // Log the extracted data
    console.log('PUT - Extracted data:', {
      message,
      status,
      id,
      userEmail: session.user.email
    })

    // Validate required fields
    if (!message || typeof message !== 'string' || message.trim() === '') {
      console.log('PUT - Invalid message:', { message })
      return NextResponse.json(
        { error: "Message is required and must be a non-empty string" },
        { status: 400 }
      )
    }

    const ticket = await SupportTicket.findById(id)
    if (!ticket) {
      console.log('PUT - Ticket not found:', { id })
      return NextResponse.json(
        { error: "Support ticket not found" },
        { status: 404 }
      )
    }

    console.log('PUT - Found ticket:', {
      id: ticket._id,
      subject: ticket.subject,
      currentStatus: ticket.status
    })

    // Update the ticket with the reply
    if (!ticket.replies) {
      ticket.replies = []
    }
    
    ticket.replies.push({
      message: message.trim(),
      author: session.user.email,
      createdAt: new Date()
    })

    if (status && ['open', 'in_progress', 'resolved'].includes(status)) {
      ticket.status = status
    }

    await ticket.save()
    console.log('PUT - Ticket updated successfully')

    // Create a notification for the ticket author
    try {
      console.log('Creating notification for ticket:', {
        ticketId: ticket._id,
        ticketEmail: ticket.email,
        currentUser: session.user.email
      })

      // Create notification with the ticket author's email as userId
      const notification = await Notification.create({
        userId: ticket.email, // Use the ticket's email as userId
        title: `Support Ticket Reply: ${ticket.subject}`,
        message: `${session.user.email} replied to your support ticket:\n\n${message}`,
        type: "info",
        read: false,
        createdAt: new Date()
      })

      console.log('Notification created successfully:', {
        id: notification._id,
        userId: notification.userId,
        title: notification.title,
        type: notification.type,
        message: notification.message
      })

      // Verify the notification was created
      const createdNotification = await Notification.findById(notification._id)
      if (!createdNotification) {
        console.error('Notification verification failed - notification not found after creation')
        throw new Error('Notification creation verification failed')
      }

      console.log('Notification verified:', {
        id: createdNotification._id,
        userId: createdNotification.userId,
        title: createdNotification.title
      })
    } catch (notificationError: any) {
      console.error("Error creating notification:", {
        message: notificationError.message,
        stack: notificationError.stack,
        code: notificationError.code,
        ticketId: ticket._id,
        ticketEmail: ticket.email
      })
      // Continue even if notification creation fails
    }

    // If the ticket is resolved, delete it
    if (status === 'resolved') {
      await SupportTicket.findByIdAndDelete(id)
      return NextResponse.json({ 
        message: "Ticket resolved and deleted successfully",
        deleted: true 
      })
    }

    return NextResponse.json({ 
      message: "Reply added successfully",
      ticket 
    })
  } catch (error: any) {
    console.error("Error updating support ticket:", {
      message: error.message,
      stack: error.stack,
      code: error.code
    })
    return NextResponse.json(
      { error: "Failed to update support ticket" },
      { status: 500 }
    )
  }
} 