"use client"

import { Providers } from "@/components/providers"
import { Navbar } from "@/components/ui/navbar"
import { Toaster } from "@/components/ui/sonner"
import { OrdersProvider } from "@/contexts/orders-context"
import { Footer } from "@/components/ui/footer"
import { NotificationProvider } from "@/app/context/NotificationContext"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <NotificationProvider>
        <OrdersProvider>
          <Navbar />
          {children}
          <Toaster />
        </OrdersProvider>
      </NotificationProvider>
    </Providers>
  )
} 