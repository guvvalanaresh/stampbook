"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams } from "next/navigation"

type Collection = {
  _id: string
  title: string
  description: string
  imageUrl: string
  circle: string
  stamps: string[]
}

export default function CircleDetailPage() {
  const params = useParams()
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch('/api/collections')
        const data = await res.json()
        // Filter collections for this circle
        setCollections(data.filter((c: Collection) => 
          c.circle.toLowerCase() === params.circle
        ))
      } catch (error) {
        console.error('Error fetching collections:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [params.circle])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{params.circle} Postal Circle</h1>
        <Link href="/circles">
          <Button variant="outline">Back to Circles</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Card key={collection._id}>
            <CardHeader>
              <CardTitle>{collection.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {collection.imageUrl && (
                <div className="relative w-full h-28 mb-4 bg-muted rounded-md overflow-hidden flex items-center justify-center">
                  <img 
                    src={collection.imageUrl} 
                    alt={collection.title}
                    className="max-w-[160px] max-h-[100px] w-auto h-auto object-contain"
                  />
                </div>
              )}
              <p className="text-sm text-muted-foreground mb-4">
                {collection.description}
              </p>
              <Link 
                href={`/collections/${collection._id}`}
                className="text-primary hover:underline"
              >
                View Collection ({collection.stamps?.length || 0} stamps) →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 