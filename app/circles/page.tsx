"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trash2, MapPin, Calendar, Clock } from "lucide-react"
import { toast } from "sonner"
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

type Collection = {
  _id: string
  title: string
  description: string
  imageUrl: string
  circle: string
  stamps: string[]
  createdAt: string
}

// Static circle information
const circleInfo = {
  "Delhi": {
    region: "Northern India",
    states: "Delhi, NCR",
  },
  "Mumbai": {
    region: "Western India",
    states: "Maharashtra, Goa",
  },
  "Chennai": {
    region: "Southern India",
    states: "Tamil Nadu, Puducherry",
  },
  "Kolkata": {
    region: "Eastern India",
    states: "West Bengal, Sikkim",
  },
  // Add more circles as needed
}

export default function CirclesPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()

  useEffect(() => {
    fetchCollections()
  }, [])

  const fetchCollections = async () => {
    try {
      const res = await fetch('/api/collections')
      const data = await res.json()
      // Ensure data is an array before setting state
      const collectionsArray = Array.isArray(data) ? data : []
      setCollections(collectionsArray)
    } catch (error) {
      console.error('Error fetching collections:', error)
      setCollections([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/collections?id=${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to delete collection')
      }

      // Update the collections state by removing the deleted collection
      setCollections(collections.filter(collection => collection._id !== id))
      toast.success('Collection deleted successfully')
    } catch (error) {
      console.error('Error deleting collection:', error)
      toast.error('Failed to delete collection')
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  // Group collections by circle
  const circleGroups = collections.reduce((groups, collection) => {
    const circle = collection.circle || 'Other'
    if (!groups[circle]) {
      groups[circle] = []
    }
    groups[circle].push(collection)
    return groups
  }, {} as Record<string, Collection[]>)

  // If no collections are found
  if (collections.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Postal Circles of India</h1>
          <p className="text-lg text-muted-foreground">No collections found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Postal Circles of India</h1>
        <p className="text-lg text-muted-foreground">
          Explore philatelic releases from various postal circles across India. Each circle represents a unique collection of stamps and postal history.
        </p>
      </div>
      
      <div className="space-y-8">
        {Object.entries(circleGroups).map(([circle, collections]) => (
          <div key={circle} className="space-y-3">
            <div className="border-b pb-2">
              <h2 className="text-2xl font-bold">{circle} Postal Circle</h2>
              <p className="text-muted-foreground">
                {circleInfo[circle as keyof typeof circleInfo]?.region || "India"} - {" "}
                {circleInfo[circle as keyof typeof circleInfo]?.states || "Information not available"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {collections.map((collection) => (
                <Card key={collection._id} className="group hover:shadow-lg transition-all">
                  <CardHeader className="p-0">
                    <div className="relative">
                      {collection.imageUrl && (
                        <div className="w-full h-32 bg-muted rounded-t-lg relative overflow-hidden flex items-center justify-center">
                          <img 
                            src={collection.imageUrl} 
                            alt={collection.title}
                            className="w-full h-full object-contain bg-muted"
                          />
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        {session?.user?.email === 'gnareshkumarreddy7@gmail.com' && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="destructive" 
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Collection</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this collection? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(collection._id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </div>
                    <div className="p-3">
                      <CardTitle className="text-base mb-1">{collection.title}</CardTitle>
                      <CardDescription className="text-xs line-clamp-2">
                        {collection.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {collection.circle}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(collection.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {collection.stamps?.length || 0} stamps
                      </div>
                    </div>
                    <Link 
                      href={`/collections/${collection._id}`}
                      className="mt-2 block w-full"
                    >
                      <Button className="w-full text-xs h-7" variant="secondary">
                        View Collection
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 