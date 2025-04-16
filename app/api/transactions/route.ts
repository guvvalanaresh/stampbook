import { NextResponse } from "next/server"
import { dbConnection } from "@/app/lib/database"
import { Transaction } from "@/app/lib/model"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnection()
    const transactions = await Transaction.find({ userId: session.user.email })
      .sort({ createdAt: -1 })
      .limit(50)

    return NextResponse.json(transactions)
  } catch (error: any) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
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
    await dbConnection()

    const transaction = await Transaction.create({
      ...data,
      userId: session.user.email
    })

    return NextResponse.json(transaction)
  } catch (error: any) {
    console.error("Error creating transaction:", error)
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    )
  }
} 