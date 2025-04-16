"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster, toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

const AUTHORIZED_EMAIL = "gnareshkumarreddy7@gmail.com"

type SupportTicket = {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'open' | 'in_progress' | 'resolved'
  replies: {
    message: string
    author: string
    createdAt: string
  }[]
  createdAt: string
}

type Cancellation = {
  _id: string
  title: string
  description: string
  price: number
  circle: string
  releaseDate: string
  category: string
  imageUrl: string
  stock: number
  author: string
  createdAt: string
}

export default function AuthorDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<string>("")
  const [authorError, setAuthorError] = useState<string>("")
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([])
  const [ticketsLoading, setTicketsLoading] = useState(true)
  const [cancellations, setCancellations] = useState<Cancellation[]>([])
  const [cancellationsLoading, setCancellationsLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router])

  useEffect(() => {
    fetchSupportTickets()
    fetchCancellations()
  }, [])

  const fetchSupportTickets = async () => {
    try {
      const res = await fetch("/api/support")
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch support tickets')
      }

      setSupportTickets(data)
    } catch (error: any) {
      console.error('Error fetching support tickets:', error)
      toast.error(error.message || 'Failed to fetch support tickets')
    } finally {
      setTicketsLoading(false)
    }
  }

  const fetchCancellations = async () => {
    try {
      const res = await fetch("/api/cancellations")
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch cancellations')
      }

      setCancellations(data)
    } catch (error: any) {
      console.error('Error fetching cancellations:', error)
      toast.error(error.message || 'Failed to fetch cancellations')
    } finally {
      setCancellationsLoading(false)
    }
  }

  if (status === "loading") {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!session?.user || session.user.email !== AUTHORIZED_EMAIL) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
              <p className="text-muted-foreground mb-6">
                You are not authorized to access this page.
              </p>
              <Button onClick={() => router.push("/")}>
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const validateAuthorEmail = (email: string) => {
    if (email !== AUTHORIZED_EMAIL) {
      setAuthorError("You are not authorized to create content")
      return false
    }
    setAuthorError("")
    return true
  }

  const handleCardSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      const authorEmail = formData.get("author") as string

      if (!validateAuthorEmail(authorEmail)) {
        throw new Error(authorError)
      }

      const cardData = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        circle: formData.get("circle"),
        releaseDate: formData.get("releaseDate"),
        category: formData.get("category"),
        imageUrl: formData.get("imageUrl"),
        stock: Number(formData.get("stock")),
        author: formData.get("author"),
      }

      console.log('Submitting card data:', cardData);
      
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create card')
      }

      console.log('Card created:', data);
      toast.success("Card created successfully")
      form.reset()
      setSelectedFile("")
    } catch (error: any) {
      console.error('Card creation error:', error);
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCollectionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      const authorEmail = formData.get("author") as string

      if (!validateAuthorEmail(authorEmail)) {
        throw new Error(authorError)
      }

      const collectionData = {
        title: formData.get("title"),
        description: formData.get("description"),
        imageUrl: formData.get("imageUrl"),
        circle: formData.get("circle"),
        author: formData.get("author"),
        stamps: []
      }

      console.log('Submitting collection data:', collectionData);

      const res = await fetch("/api/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collectionData),
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create collection')
      }

      console.log('Collection created:', data);
      toast.success("Collection created successfully")
      form.reset()
      setSelectedFile("")
    } catch (error: any) {
      console.error('Collection creation error:', error);
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file.name)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      const imageUrlInput = e.target.form?.querySelector('input[name="imageUrl"]') as HTMLInputElement
      if (imageUrlInput) imageUrlInput.value = data.url
    } catch (error) {
      toast.error("Failed to upload image")
      setSelectedFile("")
    }
  }

  const handleNotificationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      const authorEmail = formData.get("author") as string

      if (!validateAuthorEmail(authorEmail)) {
        throw new Error(authorError)
      }

      const notificationData = {
        title: formData.get("title"),
        message: formData.get("message"),
        type: formData.get("type"),
        userId: authorEmail
      }

      console.log('Sending notification data:', notificationData)

      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificationData),
      })

      const data = await res.json()
      console.log('API response:', data)
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create notification')
      }

      toast.success("Notification sent successfully")
      form.reset()
    } catch (error: any) {
      console.error('Notification creation error:', error)
      toast.error(error.message || 'Failed to send notification')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancellationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      const authorEmail = formData.get("author") as string

      if (!validateAuthorEmail(authorEmail)) {
        throw new Error(authorError)
      }

      const cancellationData = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        circle: formData.get("circle"),
        releaseDate: formData.get("releaseDate"),
        category: formData.get("category"),
        imageUrl: formData.get("imageUrl"),
        stock: Number(formData.get("stock")),
        author: formData.get("author"),
      }

      console.log('Submitting cancellation data:', cancellationData)
      
      const res = await fetch("/api/cancellations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cancellationData),
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create cancellation')
      }

      console.log('Cancellation created:', data)
      toast.success("Cancellation created successfully")
      form.reset()
      setSelectedFile("")
      fetchCancellations() // Refresh the list
    } catch (error: any) {
      console.error('Cancellation creation error:', error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTicketReply = async (ticketId: string, message: string, status: string) => {
    try {
      const response = await fetch(`/api/support/${ticketId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, status }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to update ticket")
      }

      const data = await response.json()
      
      // If the ticket was resolved and deleted, remove it from the state
      if (status === 'resolved') {
        setSupportTickets(prevTickets => 
          prevTickets.filter(ticket => ticket._id !== ticketId)
        )
        toast.success("Ticket resolved and removed successfully")
      } else {
        toast.success("Ticket updated successfully")
        fetchSupportTickets() // Refresh the tickets list
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update ticket")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Author Dashboard</h1>

      <Toaster />

      <Tabs defaultValue="cards" className="space-y-6">
        <TabsList>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="support">Support Tickets</TabsTrigger>
          <TabsTrigger value="cancellations">Cancellations</TabsTrigger>
        </TabsList>

        <TabsContent value="cards">
          <Card>
            <CardHeader>
              <CardTitle>Create New Card</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCardSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Author Email</label>
                    <Input 
                      name="author" 
                      type="email" 
                      required 
                      placeholder="Enter your email"
                      onChange={(e) => validateAuthorEmail(e.target.value)}
                    />
                    {authorError && (
                      <p className="text-sm text-destructive mt-1">{authorError}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input name="title" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price (₹)</label>
                    <Input name="price" type="number" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Circle</label>
                    <Input name="circle" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Release Date</label>
                    <Input name="releaseDate" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Input name="category" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Stock</label>
                    <Input name="stock" type="number" required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Image</label>
                    <div className="flex flex-col gap-2">
                      <Input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        required
                      />
                      <input type="hidden" name="imageUrl" />
                      {selectedFile && (
                        <p className="text-sm text-muted-foreground">
                          Selected file: {selectedFile}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea name="description" required />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Card"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collections">
          <Card>
            <CardHeader>
              <CardTitle>Create New Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCollectionSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Author Email</label>
                    <Input 
                      name="author" 
                      type="email" 
                      required 
                      placeholder="Enter your email"
                      onChange={(e) => validateAuthorEmail(e.target.value)}
                    />
                    {authorError && (
                      <p className="text-sm text-destructive mt-1">{authorError}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input name="title" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Postal Circle</label>
                    <Input name="circle" required placeholder="e.g., Delhi, Mumbai" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Image</label>
                    <div className="flex flex-col gap-2">
                      <Input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        required
                      />
                      <input type="hidden" name="imageUrl" />
                      {selectedFile && (
                        <p className="text-sm text-muted-foreground">
                          Selected file: {selectedFile}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea name="description" required />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Collection"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Send Notification</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNotificationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Author Email</label>
                    <Input 
                      name="author" 
                      type="email" 
                      required 
                      placeholder="Enter your email"
                      onChange={(e) => validateAuthorEmail(e.target.value)}
                    />
                    {authorError && (
                      <p className="text-sm text-destructive mt-1">{authorError}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input name="title" required placeholder="Notification title" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <Select name="type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select notification type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea 
                      name="message" 
                      required 
                      placeholder="Enter notification message"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Notification"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              {ticketsLoading ? (
                <div className="text-center py-8">Loading tickets...</div>
              ) : supportTickets.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No support tickets found
                </div>
              ) : (
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <Card key={ticket._id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{ticket.subject}</h3>
                            <Badge variant={
                              ticket.status === 'open' ? 'default' :
                              ticket.status === 'in_progress' ? 'secondary' :
                              'outline'
                            }>
                              {ticket.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            From: {ticket.name} ({ticket.email})
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                        <Select
                          defaultValue={ticket.status}
                          onValueChange={(value) => handleTicketReply(ticket._id, "", value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Update status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm whitespace-pre-wrap">{ticket.message}</p>
                      </div>
                      {ticket.replies && ticket.replies.length > 0 && (
                        <div className="mt-4 space-y-4">
                          <h4 className="font-medium">Replies</h4>
                          {ticket.replies.map((reply, index) => (
                            <div key={index} className="pl-4 border-l-2 border-muted">
                              <p className="text-sm whitespace-pre-wrap">{reply.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                By {reply.author} • {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          const form = e.target as HTMLFormElement
                          const message = form.message.value
                          if (message.trim()) {
                            handleTicketReply(ticket._id, message, ticket.status)
                            form.reset()
                          }
                        }}
                        className="mt-4 space-y-2"
                      >
                        <Textarea
                          name="message"
                          placeholder="Add a reply..."
                          className="min-h-[80px]"
                        />
                        <Button type="submit" size="sm">
                          Send Reply
                        </Button>
                      </form>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancellations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Cancellation</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCancellationSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Author Email</label>
                      <Input 
                        name="author" 
                        type="email" 
                        required 
                        placeholder="Enter your email"
                        onChange={(e) => validateAuthorEmail(e.target.value)}
                      />
                      {authorError && (
                        <p className="text-sm text-destructive mt-1">{authorError}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title</label>
                      <Input name="title" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Price (₹)</label>
                      <Input name="price" type="number" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Circle</label>
                      <Input name="circle" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Release Date</label>
                      <Input name="releaseDate" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Input name="category" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Stock</label>
                      <Input name="stock" type="number" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Image</label>
                      <div className="flex flex-col gap-2">
                        <Input 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageUpload}
                          required
                        />
                        <input type="hidden" name="imageUrl" />
                        {selectedFile && (
                          <p className="text-sm text-muted-foreground">
                            Selected file: {selectedFile}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea name="description" required />
                    </div>
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Cancellation"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Cancellations</CardTitle>
              </CardHeader>
              <CardContent>
                {cancellationsLoading ? (
                  <div className="text-center py-8">Loading cancellations...</div>
                ) : cancellations.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No cancellations found
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cancellations.map((cancellation) => (
                      <Card key={cancellation._id} className="p-4">
                        <div className="flex items-start gap-4">
                          {cancellation.imageUrl && (
                            <img 
                              src={cancellation.imageUrl} 
                              alt={cancellation.title}
                              className="w-20 h-20 object-cover rounded"
                            />
                          )}
                          <div className="flex-1 space-y-1">
                            <h3 className="font-medium">{cancellation.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              Circle: {cancellation.circle}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Category: {cancellation.category}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Price: ₹{cancellation.price}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Stock: {cancellation.stock}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Released: {new Date(cancellation.releaseDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 