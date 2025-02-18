"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Activity,
  Wallet,
  Medal,
  Archive,
  History,
  BarChart3,
  Settings,
  Upload,
} from "lucide-react"

const accountStats = {
  balance: "₹15,000",
  totalStamps: 156,
  memberSince: "March 2024",
  accountLevel: "Gold",
  reputationScore: 4.8,
  completedTrades: 45
}

const recentTransactions = [
  {
    type: "Purchase",
    item: "1948 Mahatma Gandhi 10r Service",
    amount: "₹2,500",
    date: "Mar 15, 2024",
    status: "Completed"
  },
  {
    type: "Sale",
    item: "1937 King George VI",
    amount: "₹1,800",
    date: "Mar 12, 2024",
    status: "Completed"
  },
  {
    type: "Trade",
    item: "1854 Queen Victoria",
    amount: "Exchange",
    date: "Mar 10, 2024",
    status: "Pending"
  }
]

export default function AccountPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Account Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-muted-foreground">NPDA: #IN123456789</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary">{accountStats.accountLevel} Member</Badge>
              <Badge variant="outline">⭐ {accountStats.reputationScore}</Badge>
            </div>
          </div>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" /> Add New Stamps
        </Button>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="collection">Collection</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  NPDA Balance
                </CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{accountStats.balance}</div>
                <p className="text-xs text-muted-foreground">
                  +₹2,500 this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Collection Size
                </CardTitle>
                <Archive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{accountStats.totalStamps}</div>
                <p className="text-xs text-muted-foreground">
                  Stamps in collection
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Trading Activity
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{accountStats.completedTrades}</div>
                <p className="text-xs text-muted-foreground">
                  Successful trades
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest stamp trading activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{transaction.item}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{transaction.type}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {transaction.date}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{transaction.amount}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your philatelist milestones</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Badge variant="secondary" className="h-12 px-4 flex items-center gap-2">
                <Medal className="h-4 w-4" />
                Top Collector 2024
              </Badge>
              <Badge variant="secondary" className="h-12 px-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                100+ Stamps
              </Badge>
              <Badge variant="secondary" className="h-12 px-4 flex items-center gap-2">
                <History className="h-4 w-4" />
                1 Year Member
              </Badge>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs content would go here */}
      </Tabs>
    </main>
  )
} 