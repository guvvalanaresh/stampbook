import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { dbConnection } from "@/app/lib/database"
import { DepositAccount, Transaction } from "@/app/lib/model"
import mongoose from "mongoose"

// Define transaction type for mapping results
interface TransactionResult {
  _id: any;
  type: string;
  amount: number;
  description: string;
  createdAt: Date;
  userId: string;
}

export async function GET() {
  try {
    // Get user session
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    try {
      await dbConnection()
    } catch (dbError: any) {
      console.error("Database connection error:", dbError)
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      )
    }
    
    // Get or create account
    let account
    try {
      account = await DepositAccount.findOne({ userId: session.user.email })
      
      if (!account) {
        console.log(`Creating new deposit account for user: ${session.user.email}`)
        account = new DepositAccount({
          userId: session.user.email,
          balance: 0,
          totalDeposits: 0,
          totalSpent: 0
        })
        await account.save()
      }
    } catch (accountError: any) {
      console.error("Account fetch/create error:", accountError)
      return NextResponse.json(
        { error: "Failed to retrieve or create account" },
        { status: 500 }
      )
    }

    // Get transactions
    let transactions: any[] = []
    try {
      transactions = await Transaction.find({ 
        userId: session.user.email,
        type: { $in: ['deposit', 'withdrawal'] }
      })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()
    } catch (transactionError: any) {
      console.error("Transaction fetch error:", transactionError)
      // Continue without transactions
      transactions = []
    }

    // Return a simplified response to avoid serialization issues
    return NextResponse.json({
      _id: account._id ? account._id.toString() : '',
      userId: account.userId || '',
      balance: account.balance || 0,
      totalDeposits: account.totalDeposits || 0,
      totalSpent: account.totalSpent || 0,
      createdAt: account.createdAt || new Date(),
      updatedAt: account.updatedAt || new Date(),
      transactions: transactions.map((t: any) => ({
        id: t?._id ? t._id.toString() : '',
        type: t?.type || 'unknown',
        amount: t?.amount || 0,
        description: t?.description || '',
        createdAt: t?.createdAt || new Date()
      }))
    })
  } catch (error: any) {
    console.error("Error in deposit account GET:", error)
    return NextResponse.json(
      { error: "Failed to fetch account data" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    // Get user session
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    let amount
    try {
      const body = await req.json()
      amount = body.amount
      if (!amount || amount <= 0) {
        return NextResponse.json(
          { error: "Invalid amount" },
          { status: 400 }
        )
      }
    } catch (parseError: any) {
      console.error("JSON parse error:", parseError)
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      )
    }

    // Connect to database
    try {
      await dbConnection()
    } catch (dbError: any) {
      console.error("Database connection error:", dbError)
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      )
    }

    // Update account and create transaction
    let account, transactions: any[] = []
    try {
      // Update the account with the new funds
      account = await DepositAccount.findOneAndUpdate(
        { userId: session.user.email },
        { 
          $inc: { 
            balance: amount,
            totalDeposits: amount
          }
        },
        { 
          new: true,
          upsert: true,
          setDefaultsOnInsert: true
        }
      )

      // Create a new transaction record
      await Transaction.create({
        userId: session.user.email,
        type: "deposit",
        amount,
        description: "Added funds to account"
      })

      // Get recent transactions
      transactions = await Transaction.find({ 
        userId: session.user.email,
        type: { $in: ['deposit', 'withdrawal'] }
      })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()
    } catch (operationError: any) {
      console.error("Account/transaction operation error:", operationError)
      return NextResponse.json(
        { error: "Failed to process deposit" },
        { status: 500 }
      )
    }

    // Return a simplified response to avoid serialization issues
    return NextResponse.json({
      _id: account._id ? account._id.toString() : '',
      userId: account.userId || '',
      balance: account.balance || 0,
      totalDeposits: account.totalDeposits || 0,
      totalSpent: account.totalSpent || 0,
      createdAt: account.createdAt || new Date(),
      updatedAt: account.updatedAt || new Date(),
      transactions: transactions.map((t: any) => ({
        id: t?._id ? t._id.toString() : '',
        type: t?.type || 'unknown',
        amount: t?.amount || 0,
        description: t?.description || '',
        createdAt: t?.createdAt || new Date()
      }))
    })
  } catch (error: any) {
    console.error("Error in deposit account POST:", error)
    return NextResponse.json(
      { error: "Failed to add funds" },
      { status: 500 }
    )
  }
} 