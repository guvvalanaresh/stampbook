"use client"

import { useOrders } from "@/contexts/orders-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, CheckCircle2, Clock, MapPin } from "lucide-react"
import { useParams } from "next/navigation"

const statusColors = {
  'PAYMENT_PENDING': 'bg-yellow-500',
  'PAYMENT_COMPLETED': 'bg-blue-500',
  'PROCESSING': 'bg-blue-500',
  'SHIPPED': 'bg-purple-500',
  'OUT_FOR_DELIVERY': 'bg-orange-500',
  'DELIVERED': 'bg-green-500',
}

export default function OrderTrackingPage() {
  const params = useParams()
  const { getOrder } = useOrders()
  const order = getOrder(params.orderId as string)

  if (!order) {
    return <div>Order not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Order #{order.id}</h1>
            <p className="text-muted-foreground">
              Placed on {order.createdAt.toLocaleDateString()}
            </p>
          </div>
          <Badge className={statusColors[order.status]}>
            {order.status.replace(/_/g, ' ')}
          </Badge>
        </div>

        {/* Tracking Timeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tracking Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {order.timeline.map((event, index) => (
                <div key={index} className="flex gap-4 mb-8 last:mb-0">
                  <div className="flex-none">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {event.status === 'DELIVERED' ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : event.status === 'SHIPPED' ? (
                        <Truck className="h-5 w-5 text-primary" />
                      ) : (
                        <Clock className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{event.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.circle}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{item.price.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary flex-none mt-0.5" />
                  <div>
                    <p className="font-medium">Delivery Address</p>
                    <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
                  </div>
                </div>
                {order.trackingNumber && (
                  <div className="flex items-start gap-2">
                    <Package className="h-5 w-5 text-primary flex-none mt-0.5" />
                    <div>
                      <p className="font-medium">Tracking Number</p>
                      <p className="text-sm text-muted-foreground">{order.trackingNumber}</p>
                    </div>
                  </div>
                )}
                {order.estimatedDelivery && (
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-primary flex-none mt-0.5" />
                    <div>
                      <p className="font-medium">Estimated Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        {order.estimatedDelivery.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 