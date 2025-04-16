import { NextResponse } from "next/server"
import { dbConnection } from "@/app/lib/database"
import { SupportTicket } from "@/app/lib/model"

export async function GET() {
  try {
    console.log('GET - Fetching support tickets')
    await dbConnection()
    
    const tickets = await SupportTicket.find()
      .sort({ createdAt: -1 })
      .limit(50)
    
    console.log('GET - Found tickets:', tickets.length)
    return NextResponse.json(tickets)
  } catch (error: any) {
    console.error("Error fetching support tickets:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    })
    return NextResponse.json(
      { error: error.message || "Failed to fetch support tickets" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    console.log('POST - Starting support ticket request')
    const data = await req.json()
    console.log('POST - Received support ticket data:', {
      name: data.name,
      email: data.email,
      subject: data.subject,
      messageLength: data.message?.length
    })
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      console.log('POST - Missing required fields:', {
        hasName: !!data.name,
        hasEmail: !!data.email,
        hasSubject: !!data.subject,
        hasMessage: !!data.message
      })
      return NextResponse.json(
        { error: "Name, email, subject, and message are required" },
        { status: 400 }
      )
    }

    await dbConnection()
    console.log('POST - Database connected')

    // Create support ticket with timestamp
    const ticket = await SupportTicket.create({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      createdAt: new Date(),
      status: 'open'
    })

    console.log('POST - Support ticket created:', {
      id: ticket._id,
      subject: ticket.subject,
      status: ticket.status
    })

    return NextResponse.json({ 
      message: "Support ticket created successfully",
      ticket 
    })
  } catch (error: any) {
    console.error("Error creating support ticket:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    })
    return NextResponse.json(
      { error: error.message || "Failed to create support ticket" },
      { status: 500 }
    )
  }
} 