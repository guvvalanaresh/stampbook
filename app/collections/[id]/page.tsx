"use client"

import { useEffect, useState, use } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"

type CollectionCard = {
  _id: string
  title: string
  description: string
  price: number
  circle: string
  imageUrl: string
  releaseDate: string
  category: string
  stock: number
}

type Collection = {
  _id: string
  title: string
  description: string
  imageUrl: string
  author: string
  stamps: CollectionCard[]
}

export default function CollectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { addItem } = useCart()
  const [collection, setCollection] = useState<Collection | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await fetch(`/api/collections/${id}`)
        const data = await res.json()
        setCollection(data)
      } catch (error) {
        console.error('Error fetching collection:', error)
        toast.error('Failed to load collection')
      } finally {
        setLoading(false)
      }
    }

    fetchCollection()
  }, [id])

  const handleAddToCart = (card: CollectionCard) => {
    addItem({
      id: card._id,
      name: card.title,
      price: card.price,
      circle: card.circle,
      imageUrl: card.imageUrl
    })
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!collection) {
    return <div className="container mx-auto px-4 py-8">Collection not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {collection.imageUrl && (
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-2xl">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img 
                src={collection.imageUrl} 
                alt={collection.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{collection.title}</h1>
        <p className="text-muted-foreground">{collection.description}</p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Stamps</TabsTrigger>
          {Array.from(new Set(collection.stamps.map(stamp => stamp.category))).map(category => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {collection.stamps.map((stamp) => (
              <Card key={stamp._id} className="group hover:shadow-lg transition-all max-w-sm mx-auto w-full">
                <CardHeader className="p-0">
                  <div className="aspect-video bg-muted">
                    <img 
                      src={stamp.imageUrl} 
                      alt={stamp.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <CardTitle className="text-lg mb-1">{stamp.title}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Released: {new Date(stamp.releaseDate).toLocaleDateString()}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="space-y-1.5">
                    <p className="text-xs text-muted-foreground">Circle: {stamp.circle}</p>
                    <p className="text-xs text-muted-foreground">Category: {stamp.category}</p>
                    <p className="text-xs text-muted-foreground">Price: ₹{stamp.price}</p>
                    <Button 
                      className="w-full text-sm" 
                      onClick={() => handleAddToCart(stamp)}
                      disabled={stamp.stock === 0}
                    >
                      {stamp.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {Array.from(new Set(collection.stamps.map(stamp => stamp.category))).map(category => (
          <TabsContent key={category} value={category} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {collection.stamps
                .filter(stamp => stamp.category === category)
                .map((stamp) => (
                  <Card key={stamp._id} className="group hover:shadow-lg transition-all max-w-sm mx-auto w-full">
                    <CardHeader className="p-0">
                      <div className="aspect-video bg-muted">
                        <img 
                          src={stamp.imageUrl} 
                          alt={stamp.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <CardTitle className="text-lg mb-1">{stamp.title}</CardTitle>
                        <p className="text-xs text-muted-foreground">
                          Released: {new Date(stamp.releaseDate).toLocaleDateString()}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="space-y-1.5">
                        <p className="text-xs text-muted-foreground">Circle: {stamp.circle}</p>
                        <p className="text-xs text-muted-foreground">Category: {stamp.category}</p>
                        <p className="text-xs text-muted-foreground">Price: ₹{stamp.price}</p>
                        <Button 
                          className="w-full text-sm" 
                          onClick={() => handleAddToCart(stamp)}
                          disabled={stamp.stock === 0}
                        >
                          {stamp.stock === 0 ? "Out of Stock" : "Add to Cart"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
} 