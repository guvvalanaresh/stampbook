"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ExternalLink,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Mock order data
const orders = [
  {
    id: "ORD-2024-001",
    date: "Mar 15, 2024",
    status: "Delivered",
    items: [
      {
        name: "1948 Mahatma Gandhi 10r Service",
        price: "₹12,500",
        image: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?q=80&w=300&h=200&fit=crop",
      }
    ],
    total: "₹12,500",
    tracking: {
      number: "IND123456789",
      status: "Delivered",
      updates: [
        { date: "Mar 15, 2024", time: "14:30", status: "Delivered to recipient" },
        { date: "Mar 14, 2024", time: "10:15", status: "Out for delivery" },
        { date: "Mar 13, 2024", time: "18:20", status: "Arrived at local facility" }
      ]
    },
    payment: {
      method: "NPDA Balance",
      status: "Completed",
      transactionId: "TXN123456"
    }
  },
  {
    id: "ORD-2024-002",
    date: "Mar 12, 2024",
    status: "In Transit",
    items: [
      {
        name: "1854 Queen Victoria Red",
        price: "₹8,900",
        image: "https://images.unsplash.com/photo-1578307362674-b209690512c8?q=80&w=300&h=200&fit=crop",
      }
    ],
    total: "₹8,900",
    tracking: {
      number: "IND987654321",
      status: "In Transit",
      updates: [
        { date: "Mar 14, 2024", time: "09:45", status: "Package in transit" },
        { date: "Mar 13, 2024", time: "16:30", status: "Shipped from seller" }
      ]
    },
    payment: {
      method: "Credit Card",
      status: "Completed",
      transactionId: "TXN789012"
    }
  }
]

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-100 text-green-800'
    case 'in transit':
      return 'bg-blue-100 text-blue-800'
    case 'processing':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function OrdersPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">
          Track your stamp purchases and view order history
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg mb-1">Order {order.id}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Placed on {order.date}</span>
                  </div>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="items">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      <span>Order Details</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 py-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-muted-foreground">{item.price}</p>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Total</span>
                        <span className="font-medium">{order.total}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tracking">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      <span>Tracking Information</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Tracking Number:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{order.tracking.number}</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {order.tracking.updates.map((update, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="h-4 w-4 rounded-full bg-primary" />
                              {index !== order.tracking.updates.length - 1 && (
                                <div className="w-0.5 h-full bg-border" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{update.status}</p>
                              <p className="text-sm text-muted-foreground">
                                {update.date} at {update.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="payment">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Payment Information</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Method</span>
                        <span>{order.payment.method}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transaction ID</span>
                        <span>{order.payment.transactionId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge variant="outline">{order.payment.status}</Badge>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
} 