import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { dbConnection } from "@/app/lib/database"
import { DepositAccount, Transaction, Order } from "@/app/lib/model"

export async function POST(req: Request) {
  try {
    // Get user session
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const { amount, orderId, items } = await req.json()
    
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      )
    }

    // Connect to database
    await dbConnection()

    // Get the account and check if there's enough balance
    const account = await DepositAccount.findOne({ userId: session.user.email })
    if (!account) {
      return NextResponse.json(
        { error: "Account not found" },
        { status: 404 }
      )
    }

    if (account.balance < amount) {
      return NextResponse.json(
        { 
          error: "Insufficient funds", 
          currentBalance: account.balance,
          requiredAmount: amount
        },
        { status: 400 }
      )
    }

    // Update the account with the withdrawal
    account.balance -= amount
    account.totalSpent += amount
    await account.save()

    // Create order record
    const order = await Order.create({
      userId: session.user.email,
      orderNumber: orderId,
      totalAmount: amount,
      status: 'completed',
      items: items || []
    })

    // Create transaction record
    const itemNames = items.map((item: any) => item.name || 'Item').join(', ')
    const description = items.length > 0 
      ? `Payment for purchase (${itemNames})`
      : `Payment for purchase`

    await Transaction.create({
      userId: session.user.email,
      type: "withdrawal",
      amount,
      description: `Purchase - Order #${orderId}`,
      orderId: order._id
    })

    return NextResponse.json({
      success: true,
      message: "Payment processed successfully",
      account: {
        balance: account.balance,
        totalDeposits: account.totalDeposits,
        totalSpent: account.totalSpent
      }
    })
  } catch (error: any) {
    console.error("Error processing payment:", error)
    return NextResponse.json(
      { error: "Failed to process payment" },
      { status: 500 }
    )
  }
} 