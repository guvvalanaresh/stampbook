"use client"

import { useEffect, useState } from "react"
import { Bell, Trash2, MessageSquare, HelpCircle, User } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useNotifications } from "@/app/context/NotificationContext"

interface Notification {
  _id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  createdAt: string
  read: boolean
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const { toast } = useToast()
  const { updateUnreadCount } = useNotifications()

  useEffect(() => {
    fetchNotifications()
  }, [])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return "Invalid date"
      }
      return formatDistanceToNow(date, { addSuffix: true })
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Invalid date"
    }
  }

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications")
      if (!response.ok) throw new Error("Failed to fetch notifications")
      const data = await response.json()
      setNotifications(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load notifications",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: "PUT",
      })

      if (!response.ok) throw new Error("Failed to mark notification as read")

      setNotifications(notifications.map(notification =>
        notification._id === id
          ? { ...notification, read: true }
          : notification
      ))
      updateUnreadCount() // Update the unread count in the navbar
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark notification as read",
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const deleteNotification = async (id: string) => {
    try {
      const response = await fetch("/api/notifications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error("Failed to delete notification")

      setNotifications(notifications.filter(notification => notification._id !== id))
      updateUnreadCount() // Update the unread count in the navbar
      toast({
        title: "Success",
        description: "Notification deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete notification",
        variant: "destructive",
      })
    }
  }

  const handleNotificationClick = async (notification: Notification) => {
    try {
      if (!notification.read) {
        const success = await markAsRead(notification._id)
        if (!success) return
      }
      setSelectedNotification(notification)
    } catch (error) {
      console.error("Error handling notification click:", error)
      toast({
        title: "Error",
        description: "Failed to open notification",
        variant: "destructive",
      })
    }
  }

  const getNotificationIcon = (notification: Notification) => {
    if (notification.title.toLowerCase().includes('support ticket')) {
      return <HelpCircle className="h-5 w-5 text-blue-500" />
    }
    return <MessageSquare className="h-5 w-5 text-gray-500" />
  }

  // Separate notifications into different categories
  const supportTicketNotifications = notifications.filter(notification => 
    notification.title.toLowerCase().includes('support ticket') || 
    notification.title.toLowerCase().includes('support ticket reply')
  )
  const authorNotifications = notifications.filter(notification => 
    !notification.title.toLowerCase().includes('support ticket') && 
    !notification.title.toLowerCase().includes('support ticket reply')
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Bell className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No notifications yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Author Notifications Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-purple-500" />
              <h2 className="text-xl font-semibold text-purple-600">Notifications</h2>
            </div>
            <div className="space-y-4">
              {authorNotifications.length > 0 ? (
                authorNotifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      notification.read
                        ? "bg-gray-50 hover:bg-gray-100"
                        : "bg-white shadow-sm hover:bg-gray-50"
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification)}
                        <div>
                          <h3 className="font-semibold">{notification.title}</h3>
                          <p className="text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            {formatDate(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <span className="text-xs text-blue-600">New</span>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Notification</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this notification? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteNotification(notification._id)
                                }}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No notifications</p>
              )}
            </div>
          </div>

          {/* Support Team Replies Section */}
           {/* <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-blue-600">Support</h2>
            </div>
            <div className="space-y-4">
              {supportTicketNotifications.length > 0 ? (
                supportTicketNotifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      notification.read
                        ? "bg-gray-50 hover:bg-gray-100"
                        : "bg-white shadow-sm hover:bg-gray-50"
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification)}
                        <div>
                          <h3 className="font-semibold">{notification.title}</h3>
                          <p className="text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            {formatDate(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <span className="text-xs text-blue-600">New</span>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Notification</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this notification? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteNotification(notification._id)
                                }}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No support notifications</p>
              )}
            </div>
          </div> ends here */}
        </div>
      )}

      <Dialog open={selectedNotification !== null} onOpenChange={() => setSelectedNotification(null)}>
        {selectedNotification && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedNotification.title || "Notification Details"}
              </DialogTitle>
              <DialogDescription asChild>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    {formatDate(selectedNotification.createdAt)}
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="text-sm whitespace-pre-wrap">
                      {selectedNotification.message}
                    </div>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
} 