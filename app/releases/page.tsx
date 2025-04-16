"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { Trash2 } from "lucide-react"
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

type CardItem = {
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

export default function ReleasesPage() {
  const { addItem } = useCart()
  const [cards, setCards] = useState<CardItem[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = async () => {
    try {
      const res = await fetch('/api/cards')
      const data = await res.json()
      // Ensure data is an array before setting state
      const cardsArray = Array.isArray(data) ? data : []
      setCards(cardsArray)
    } catch (error) {
      console.error('Error fetching cards:', error)
      setCards([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (card: CardItem) => {
    addItem({
      id: card._id,
      name: card.title,
      price: card.price,
      circle: card.circle,
      imageUrl: card.imageUrl
    })
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/cards?id=${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to delete card')
      }

      // Update the cards state by removing the deleted card
      setCards(cards.filter(card => card._id !== id))
      toast.success('Card deleted successfully')
    } catch (error) {
      console.error('Error deleting card:', error)
      toast.error('Failed to delete card')
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Philatelic Releases</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card._id} className="group hover:shadow-lg transition-all overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                {card.imageUrl && (
                  <div className="w-full h-36 bg-muted">
                    <img 
                      src={card.imageUrl} 
                      alt={card.title}
                      className="w-full h-full object-contain"
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
                          <AlertDialogTitle>Delete Card</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this card? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(card._id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
              <div className="p-3">
                <CardTitle className="text-base mb-1">{card.title}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Released: {new Date(card.releaseDate).toLocaleDateString()}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Circle: {card.circle}</p>
                <p className="text-xs text-muted-foreground">Category: {card.category}</p>
                <p className="text-xs text-muted-foreground">Price: ₹{card.price}</p>
                <Button 
                  className="w-full text-xs h-7 mt-2" 
                  onClick={() => handleAddToCart(card)}
                  disabled={card.stock === 0}
                >
                  {card.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 