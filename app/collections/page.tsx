"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

type Collection = {
  _id: string
  title: string
  description: string
  imageUrl: string
  author: string
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch('/api/collections')
        const data = await res.json()
        setCollections(data)
      } catch (error) {
        console.error('Error fetching collections:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Stamp Collections</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {collections.map((collection) => (
          <Card key={collection._id} className="group hover:shadow-lg transition-all">
            <CardHeader className="p-3">
              <CardTitle className="text-base">{collection.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              {collection.imageUrl && (
                <div className="aspect-video bg-muted rounded-md mb-2 overflow-hidden">
                  <img 
                    src={collection.imageUrl} 
                    alt={collection.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {collection.description}
              </p>
              <Link 
                href={`/collections/${collection._id}`}
                className="text-primary hover:underline text-xs"
              >
                View Collection →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 