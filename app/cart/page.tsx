"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Trash2, Plus, Minus } from "lucide-react"

export default function CartPage() {
  const { state, removeItem, updateQuantity, updateSpeedPost, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const total = state.items.reduce((sum: number, item) => {
    const itemTotal = item.price * item.quantity
    const speedPostFee = item.speedPost ? 10 : 0
    return sum + itemTotal + speedPostFee
  }, 0)

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId)
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  const handleSpeedPostChange = (itemId: string, speedPost: boolean) => {
    updateSpeedPost(itemId, speedPost)
  }

  const handleProceedToPayment = async () => {
    try {
      const totalAmount = state.items.reduce((sum, item) => {
        const itemTotal = item.price * item.quantity
        const speedPostFee = item.speedPost ? 10 : 0
        return sum + itemTotal + speedPostFee
      }, 0)
      const orderId = `PURCHASE-${Date.now()}`
      
      console.log("Processing payment from deposit account...")
      const withdrawResponse = await fetch("/api/deposit-account/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
          orderId,
          items: state.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
            speedPost: item.speedPost
          }))
        }),
      })

      if (!withdrawResponse.ok) {
        const errorData = await withdrawResponse.json()
        if (errorData.error === "Insufficient funds") {
          toast.error("Insufficient funds in your deposit account")
          router.push("/deposit-account")
          return
        }
        throw new Error(errorData.error || "Failed to process payment")
      }

      // Clear the cart
      clearCart()
      
      toast.success("Payment successful!")
      router.push("/orders")
    } catch (error: any) {
      console.error("Payment error:", error)
      toast.error(error.message || "Failed to process payment")
    }
  }

  const handleCheckout = async () => {
    try {
      // Create transaction
      const transactionRes = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          type: 'purchase',
          description: 'Purchase from cart',
          status: 'completed',
          items: state.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        }),
      })

      if (!transactionRes.ok) {
        throw new Error('Failed to create transaction')
      }

      // Clear cart
      clearCart()
      
      // Show success message
      toast.success("Your order has been placed successfully.")
    } catch (error) {
      console.error('Error during checkout:', error)
      toast.error("Failed to process your order. Please try again.")
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Add some philatelic items to your cart to proceed with the purchase.
              </p>
              <Button onClick={() => router.push('/releases')}>
                Browse Releases
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    {item.imageUrl && (
                      <div className="w-24 h-24 flex-shrink-0">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Circle: {item.circle}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-muted-foreground">Speed Post</label>
                        <input
                          type="checkbox"
                          checked={item.speedPost}
                          onChange={(e) => handleSpeedPostChange(item.id, e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                      <p className="font-medium">
                        ₹{(item.price * item.quantity) + (item.speedPost ? 10 : 0)}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Speed Post Fee</span>
                <span className="font-medium">₹{state.items.reduce((sum, item) => sum + (item.speedPost ? 10 : 0), 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="text-xl font-bold">₹{total}</span>
              </div>
              <Button 
                className="w-full" 
                onClick={handleProceedToPayment}
                disabled={loading}
              >
                {loading ? "Processing..." : "Proceed to Payment"}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Payment will be deducted from your deposit account
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 