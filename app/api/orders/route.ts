import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { dbConnection } from "@/app/lib/database"
import { Order, Transaction } from "@/app/lib/model"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnection()
    const orders = await Order.find({ userId: session.user.email })
      .sort({ createdAt: -1 })
      .limit(20)

    return NextResponse.json(orders)
  } catch (error: any) {
    console.error("Error fetching orders:", error)
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    
    // Validate required fields
    if (!data.items || !data.totalAmount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }
    
    await dbConnection()

    // Generate a unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    
    // Create the order
    const order = await Order.create({
      userId: session.user.email,
      orderNumber,
      totalAmount: data.totalAmount,
      status: 'pending',
      items: data.items
    })

    // Also create a transaction record
    await Transaction.create({
      userId: session.user.email,
      type: "purchase",
      amount: data.totalAmount,
      description: `Purchase for order #${orderNumber}`,
      status: 'completed',
      items: data.items
    })

    return NextResponse.json(order)
  } catch (error: any) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
} 