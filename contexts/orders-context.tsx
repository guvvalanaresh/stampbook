"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"

type Order = {
  orderNumber: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    imageUrl?: string
  }>
  totalAmount: number
  createdAt: string
}

type OrdersContextType = {
  orders: Order[]
  loading: boolean
  error: string | null
  refreshOrders: () => Promise<void>
}

const defaultContextValue: OrdersContextType = {
  orders: [],
  loading: false,
  error: null,
  refreshOrders: async () => {}
}

const OrdersContext = createContext<OrdersContextType>(defaultContextValue)

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async () => {
    if (!session?.user) return

    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/orders")
      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }
      const data = await response.json()
      setOrders(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      fetchOrders()
    }
  }, [status, session])

  const value = {
    orders,
    loading,
    error,
    refreshOrders: fetchOrders
  }

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  return context
} 