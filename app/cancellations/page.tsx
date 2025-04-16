"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"
import { useSession } from "next-auth/react"
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

export default function CancellationsPage() {
  const router = useRouter()
  const [cancellations, setCancellations] = useState<Cancellation[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()

  useEffect(() => {
    fetchCancellations()
  }, [])

  const fetchCancellations = async () => {
    try {
      const res = await fetch('/api/cancellations')
      const data = await res.json()
      // Ensure data is an array before setting state
      const cancellationsArray = Array.isArray(data) ? data : []
      setCancellations(cancellationsArray)
    } catch (error) {
      console.error('Error fetching cancellations:', error)
      setCancellations([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (id: string) => {
    router.push(`/cancellations/${id}`)
  }

  const deleteCancellation = async (id: string) => {
    try {
      const response = await fetch(`/api/cancellations/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete cancellation")

      setCancellations(cancellations.filter(cancellation => cancellation._id !== id))
      toast.success("Cancellation deleted successfully")
    } catch (error) {
      toast.error("Failed to delete cancellation")
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Philatelic Cancellations</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cancellations.map((cancellation) => (
          <Card key={cancellation._id} className="group hover:shadow-lg transition-all overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                {cancellation.imageUrl && (
                  <div className="w-full h-36 bg-muted">
                    <img 
                      src={cancellation.imageUrl} 
                      alt={cancellation.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  {session?.user?.email === 'gnareshkumarreddy7@gmail.com' && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 h-7 w-7"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Cancellation</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this cancellation? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteCancellation(cancellation._id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
              <div className="p-3">
                <CardTitle className="text-base mb-1">{cancellation.title}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Released: {new Date(cancellation.releaseDate).toLocaleDateString()}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Circle: {cancellation.circle}</p>
                <p className="text-xs text-muted-foreground">Category: {cancellation.category}</p>
                <p className="text-xs text-muted-foreground">Price: ₹{cancellation.price}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{cancellation.description}</p>
                <Button 
                  className="w-full text-xs h-7 mt-2" 
                  onClick={() => handleViewDetails(cancellation._id)}
                  variant="outline"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 