"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { use } from "react"

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

export default function CancellationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [cancellation, setCancellation] = useState<Cancellation | null>(null)
  const [loading, setLoading] = useState(true)
  const { id } = use(params)

  useEffect(() => {
    fetchCancellationDetails()
  }, [id])

  const fetchCancellationDetails = async () => {
    try {
      const res = await fetch(`/api/cancellations/${id}`)
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch cancellation details')
      }

      setCancellation(data)
    } catch (error) {
      console.error('Error fetching cancellation details:', error)
      toast.error('Failed to load cancellation details')
      router.push('/cancellations')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!cancellation) {
    return <div className="container mx-auto px-4 py-8">Cancellation not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline" 
        onClick={() => router.back()}
        className="mb-6"
      >
        Back to Cancellations
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{cancellation.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {cancellation.imageUrl && (
                <div className="max-w-md mx-auto">
                  <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={cancellation.imageUrl} 
                      alt={cancellation.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Released: {new Date(cancellation.releaseDate).toLocaleDateString()}
                </p>
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
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {cancellation.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 