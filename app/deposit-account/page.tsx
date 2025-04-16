"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Wallet, ArrowUpRight, ArrowDownRight, AlertCircle, Loader2 } from "lucide-react"

type Transaction = {
  id: string
  type: 'deposit' | 'withdrawal'
  amount: number
  description: string
  createdAt: string
}

type AccountData = {
  balance: number
  totalDeposits: number
  totalSpent: number
  transactions: Transaction[]
}

export default function DepositAccountPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [accountData, setAccountData] = useState<AccountData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Please sign in to access your deposit account")
      router.push("/signin")
      return
    }

    if (status === "authenticated") {
      fetchAccountData()
    }
  }, [status])

  const fetchAccountData = async () => {
    try {
      setError(null)
      setDataLoading(true)
      
      const res = await fetch('/api/deposit-account')
      
      if (!res.ok) {
        if (res.status === 401) {
          toast.error('Please sign in to access your account')
          router.push("/signin")
          return
        }
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || `Error: ${res.status}`);
      }
      
      const data = await res.json();
      setAccountData(data);
      
    } catch (err: any) {
      let errorMessage = 'Failed to fetch account data';
      
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setDataLoading(false)
    }
  }

  const handleAddFunds = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount")
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/deposit-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: Number(amount) }),
      })

      if (!res.ok) {
        if (res.status === 401) {
          toast.error('Please sign in to access your account')
          router.push("/signin")
          return
        }
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || `Error: ${res.status}`);
      }

      const data = await res.json()
      toast.success("Funds added successfully")
      setAmount("")
      setAccountData(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add funds';
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount)
  }

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Deposit Account</h1>
          <p className="text-lg text-muted-foreground">
            There was a problem loading your account data.
          </p>
        </div>
        
        <div className="max-w-lg mx-auto">
          <Card className="border-red-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-red-500" />
                <CardTitle>Error</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-red-600 mb-4">{error}</p>
              <Button 
                onClick={() => {
                  setError(null);
                  fetchAccountData();
                }}
                disabled={dataLoading}
              >
                {dataLoading ? "Trying again..." : "Try Again"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Deposit Account</h1>
        <p className="text-lg text-muted-foreground">
          Add funds to your deposit account for seamless philatelic transactions.
        </p>
      </div>

      {dataLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Account Balance</CardTitle>
                  <CardDescription>Your current deposit account balance</CardDescription>
                </div>
                <Wallet className="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-3xl font-bold">
                  {accountData ? formatCurrency(accountData.balance) : "₹0"}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Deposits</p>
                    <p className="font-medium">
                      {accountData ? formatCurrency(accountData.totalDeposits) : "₹0"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Spent</p>
                    <p className="font-medium">
                      {accountData ? formatCurrency(accountData.totalSpent) : "₹0"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Add Funds</CardTitle>
                  <CardDescription>Add money to your deposit account</CardDescription>
                </div>
                <ArrowUpRight className="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount (₹)</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    step="1"
                    disabled={loading}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleAddFunds}
                  disabled={loading || !amount || Number(amount) <= 0}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Add Funds"
                  )}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Minimum amount: ₹1
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest deposit account activities</CardDescription>
                </div>
                <ArrowDownRight className="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accountData?.transactions && accountData.transactions.length > 0 ? (
                  accountData.transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`font-medium ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'deposit' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    No transactions found
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 