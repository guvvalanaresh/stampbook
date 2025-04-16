import { NextResponse } from "next/server"
import { dbConnection } from "@/app/lib/database"
import { Cancellation } from "@/app/lib/model"

export async function GET() {
  try {
    console.log('GET - Fetching cancellations')
    await dbConnection()
    
    const cancellations = await Cancellation.find()
      .sort({ createdAt: -1 })
      .limit(50)
    
    console.log('GET - Found cancellations:', cancellations.length)
    return NextResponse.json(cancellations)
  } catch (error: any) {
    console.error("Error fetching cancellations:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    })
    return NextResponse.json(
      { error: error.message || "Failed to fetch cancellations" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    console.log('POST - Starting cancellation request')
    const data = await req.json()
    console.log('POST - Received cancellation data:', {
      title: data.title,
      circle: data.circle,
      category: data.category
    })
    
    // Validate required fields
    if (!data.title || !data.description || !data.price || !data.circle || 
        !data.releaseDate || !data.category || !data.imageUrl || !data.stock || !data.author) {
      console.log('POST - Missing required fields')
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    await dbConnection()
    console.log('POST - Database connected')

    const cancellation = await Cancellation.create({
      title: data.title,
      description: data.description,
      price: data.price,
      circle: data.circle,
      releaseDate: data.releaseDate,
      category: data.category,
      imageUrl: data.imageUrl,
      stock: data.stock,
      author: data.author,
      createdAt: new Date()
    })

    console.log('POST - Cancellation created:', {
      id: cancellation._id,
      title: cancellation.title,
      circle: cancellation.circle
    })

    return NextResponse.json({ 
      message: "Cancellation created successfully",
      cancellation 
    })
  } catch (error: any) {
    console.error("Error creating cancellation:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    })
    return NextResponse.json(
      { error: error.message || "Failed to create cancellation" },
      { status: 500 }
    )
  }
} 