"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface NotificationContextType {
  unreadCount: number
  setUnreadCount: (count: number) => void
  updateUnreadCount: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0)
  const { status } = useSession()

  const updateUnreadCount = async () => {
    try {
      // Only fetch if authenticated
      if (status !== 'authenticated') {
        setUnreadCount(0)
        return
      }

      const response = await fetch('/api/notifications')
      if (!response.ok) {
        if (response.status === 401) {
          setUnreadCount(0)
          return
        }
        throw new Error('Failed to fetch notifications')
      }
      const notifications = await response.json()
      const unread = notifications.filter((n: any) => !n.read).length
      setUnreadCount(unread)
    } catch (error) {
      console.error('Error updating unread count:', error)
      // Don't set unread count to 0 on error, keep the current count
      // This prevents the notification badge from disappearing on temporary network issues
    }
  }

  useEffect(() => {
    updateUnreadCount()
    // Set up polling every 30 seconds
    const interval = setInterval(updateUnreadCount, 30000)
    return () => clearInterval(interval)
  }, [status])

  return (
    <NotificationContext.Provider value={{ unreadCount, setUnreadCount, updateUnreadCount }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
} 