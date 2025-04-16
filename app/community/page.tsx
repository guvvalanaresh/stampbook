"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSession } from "next-auth/react"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"
import { Trash2, MapPin, Tag, Clock, MessageCircle, Image as ImageIcon, Send, ShoppingCart } from "lucide-react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from 'date-fns'

type Listing = {
  _id: string
  title: string
  description: string
  price: number
  condition: string
  category: string
  imageUrl: string
  seller: {
    name: string
    email: string
  }
  createdAt: string
  status: "available" | "sold"
}

type Discussion = {
  _id: string
  title: string
  content: string
  author: {
    name: string
    email: string
    image?: string
  }
  images: string[]
  comments: Comment[]
  tags: string[]
  createdAt: string
}

type Comment = {
  content: string
  author: {
    name: string
    email: string
    image?: string
  }
  images: string[]
  createdAt: string
}

export default function CommunityPage() {
  const { data: session } = useSession()
  const { addItem } = useCart()
  const [activeTab, setActiveTab] = useState("browse")
  const [listings, setListings] = useState<Listing[]>([])
  const [discussions, setDiscussions] = useState<Discussion[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null)
  const [newComment, setNewComment] = useState("")
  const [commentImages, setCommentImages] = useState<string[]>([])

  useEffect(() => {
    if (activeTab === "browse") {
      fetchListings()
    } else if (activeTab === "discussions") {
      fetchDiscussions()
    }
  }, [activeTab])

  const fetchListings = async () => {
    try {
      const res = await fetch('/api/listings')
      const data = await res.json()
      setListings(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching listings:', error)
      toast.error('Failed to load listings')
    } finally {
      setLoading(false)
    }
  }

  const fetchDiscussions = async () => {
    try {
      const res = await fetch('/api/discussions')
      const data = await res.json()
      setDiscussions(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching discussions:', error)
      toast.error('Failed to load discussions')
    } finally {
      setLoading(false)
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

  const handleDiscussionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!session?.user) {
      toast.error("Please sign in to create a discussion")
      return
    }

    setIsSubmitting(true)
    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      
      const discussionData = {
        title: formData.get("title"),
        content: formData.get("content"),
        author: {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        },
        images: formData.getAll("images").map(String),
        tags: formData.get("tags")?.toString().split(",").map(tag => tag.trim()) || [],
      }

      const res = await fetch("/api/discussions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discussionData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      toast.success("Discussion created successfully")
      form.reset()
      setSelectedFile("")
      fetchDiscussions()
    } catch (error: any) {
      toast.error(error.message || "Failed to create discussion")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddComment = async (discussionId: string) => {
    if (!session?.user) {
      toast.error("Please sign in to comment")
      return
    }

    try {
      const commentData = {
        content: newComment,
        author: {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        },
        images: commentImages,
      }

      const res = await fetch(`/api/discussions/${discussionId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      toast.success("Comment added successfully")
      setNewComment("")
      setCommentImages([])
      fetchDiscussions()
    } catch (error: any) {
      toast.error(error.message || "Failed to add comment")
    }
  }

  const handleCommentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setCommentImages([...commentImages, data.url])
    } catch (error) {
      toast.error("Failed to upload image")
    }
  }

  const handleListingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!session?.user) {
      toast.error("Please sign in to create a listing")
      return
    }

    setIsSubmitting(true)
    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      
      const listingData = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        condition: formData.get("condition"),
        category: formData.get("category"),
        imageUrl: formData.get("imageUrl"),
        seller: {
          name: session.user.name,
          email: session.user.email,
        },
        status: "available"
      }

      const res = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listingData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      toast.success("Listing created successfully")
      form.reset()
      setSelectedFile("")
      fetchListings()
    } catch (error: any) {
      toast.error(error.message || "Failed to create listing")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/listings?id=${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete listing')

      setListings(listings.filter(listing => listing._id !== id))
      toast.success('Listing deleted successfully')
    } catch (error) {
      console.error('Error deleting listing:', error)
      toast.error('Failed to delete listing')
    }
  }

  const handleAddToCart = (listing: Listing) => {
    addItem({
      id: listing._id,
      name: listing.title,
      price: listing.price,
      circle: listing.condition,
      imageUrl: listing.imageUrl
    })
    toast.success("Added to cart")
  }

  const handleDeleteDiscussion = async (id: string) => {
    try {
      const response = await fetch(`/api/discussions/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to delete discussion")
      }

      setDiscussions(discussions.filter(discussion => discussion._id !== id))
      toast.success("Discussion deleted successfully")
    } catch (error: any) {
      toast.error(error.message || "Failed to delete discussion")
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Philately Community</h1>

        <Tabs defaultValue="browse" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Listings</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="sell">Sell Your Stamps</TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map((listing) => (
                <Card key={listing._id} className="group hover:shadow-lg transition-all">
                  <CardHeader className="p-0">
                    <div className="relative">
                      {listing.imageUrl && (
                        <div className="w-full h-48 bg-muted rounded-t-lg relative overflow-hidden">
                          <img 
                            src={listing.imageUrl} 
                            alt={listing.title}
                            className="w-full h-full object-contain bg-muted"
                          />
                        </div>
                      )}
                      {session?.user?.email === listing.seller.email && (
                        <div className="absolute top-2 right-2">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="destructive" 
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Listing</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this listing? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(listing._id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <CardTitle className="text-xl mb-2">{listing.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {listing.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <Tag className="h-4 w-4 mr-1" />
                            ₹{listing.price}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {listing.condition}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(listing.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">Seller: {listing.seller.name}</p>
                      {listing.status === "available" ? (
                        <Button 
                          className="w-full" 
                          onClick={() => handleAddToCart(listing)}
                          disabled={false}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {session?.user?.email === listing.seller.email ? "Buy Your Listing" : "Add to Cart"}
                        </Button>
                      ) : (
                        <Button className="w-full" disabled>Sold</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discussions">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Start a Discussion</CardTitle>
                  <CardDescription>
                    Share your thoughts, ask questions, or showcase your collection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDiscussionSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title</label>
                      <Input name="title" required placeholder="What's on your mind?" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Content</label>
                      <Textarea 
                        name="content" 
                        required 
                        placeholder="Share your thoughts or questions with the community..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Images</label>
                      <Input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        multiple
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tags</label>
                      <Input 
                        name="tags" 
                        placeholder="Add tags separated by commas (e.g., rare, indian, commemorative)"
                      />
                    </div>
                    <Button type="submit" disabled={isSubmitting || !session?.user}>
                      {isSubmitting ? "Posting..." : "Post Discussion"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {discussions.map((discussion) => (
                <Card key={discussion._id} className="group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={discussion.author.image} />
                          <AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{discussion.author.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(discussion.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      {session?.user?.email === discussion.author.email && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Discussion</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this discussion? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteDiscussion(discussion._id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                    <CardTitle className="text-xl">{discussion.title}</CardTitle>
                    <CardDescription className="whitespace-pre-wrap">
                      {discussion.content}
                    </CardDescription>
                  </CardHeader>
                  {discussion.images.length > 0 && (
                    <CardContent className="grid grid-cols-2 gap-2">
                      {discussion.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Discussion image ${index + 1}`}
                          className="rounded-lg object-cover w-full h-48"
                        />
                      ))}
                    </CardContent>
                  )}
                  <CardFooter className="flex flex-col gap-4">
                    <div className="flex gap-2">
                      {discussion.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setSelectedDiscussion(discussion)}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {discussion.comments.length} Comments
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            {discussion.title || "Discussion Details"}
                          </DialogTitle>
                          <DialogDescription>Join the discussion</DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-[400px] pr-4">
                          <div className="space-y-4">
                            {discussion.comments.map((comment, index) => (
                              <Card key={index}>
                                <CardHeader className="p-4">
                                  <div className="flex items-center gap-4">
                                    <Avatar>
                                      <AvatarImage src={comment.author.image} />
                                      <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium">{comment.author.name}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                      </p>
                                    </div>
                                  </div>
                                  <p className="mt-2 whitespace-pre-wrap">{comment.content}</p>
                                </CardHeader>
                                {comment.images.length > 0 && (
                                  <CardContent className="p-4 pt-0">
                                    <div className="grid grid-cols-2 gap-2">
                                      {comment.images.map((image, idx) => (
                                        <img
                                          key={idx}
                                          src={image}
                                          alt={`Comment image ${idx + 1}`}
                                          className="rounded-lg object-cover w-full h-32"
                                        />
                                      ))}
                                    </div>
                                  </CardContent>
                                )}
                              </Card>
                            ))}
                          </div>
                        </ScrollArea>
                        <div className="flex gap-2 items-end">
                          <div className="flex-1">
                            <Textarea
                              placeholder="Add a comment..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id="comment-image"
                              onChange={handleCommentImageUpload}
                            />
                            <label htmlFor="comment-image">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="cursor-pointer"
                              >
                                <ImageIcon className="h-4 w-4" />
                              </Button>
                            </label>
                            <Button
                              type="button"
                              onClick={() => handleAddComment(discussion._id)}
                              disabled={!newComment.trim() || !session?.user}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sell">
            <Card>
              <CardHeader>
                <CardTitle>Create New Listing</CardTitle>
                <CardDescription>
                  List your stamps for sale in the community market
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleListingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title</label>
                      <Input name="title" required placeholder="e.g., Rare Gandhi Stamp 1948" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Price (₹)</label>
                      <Input name="price" type="number" required min="0" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Condition</label>
                      <Input name="condition" required placeholder="e.g., Mint, Used, Fine" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Input name="category" required placeholder="e.g., Commemorative, Definitive" />
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
                      <Textarea 
                        name="description" 
                        required 
                        placeholder="Describe your stamp, including any special features or historical significance"
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={isSubmitting || !session?.user}>
                    {isSubmitting ? "Creating..." : "Create Listing"}
                  </Button>
                  {!session?.user && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Please sign in to create a listing
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 