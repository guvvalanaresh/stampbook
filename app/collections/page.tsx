"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// This would typically come from your database
const stamps = [
  {
    id: 1,
    year: 1950,
    name: "Penny Black Replica",
    description: "A beautiful replica of the world's first postage stamp",
    image: "/stamp-4.jpg",
    price: "₹50",
    rarity: "Rare"
  },
  {
    id: 2,
    year: 1960,
    name: "Blue Mauritius",
    description: "One of the rarest and most valuable stamps",
    image: "/stamp-5.jpg",
    price: "₹50",
    rarity: "Very Rare"
  },
  // Add more stamps as needed
]

const years = Array.from(
  { length: 2024 - 1840 + 1 },
  (_, i) => 1840 + i
).reverse()

export default function CollectionsPage() {
  const handleYearChange = (year: string) => {
    // Smooth scroll to the year section
    const element = document.getElementById(`year-${year}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-12 space-y-6">
        <h1 className="text-4xl font-bold">Stamp Collections</h1>
        <p className="text-muted-foreground text-lg text-center max-w-2xl">
          Explore our vast collection of stamps from different eras. Use the year filter to navigate through history.
        </p>
        
        {/* Year Filter */}
        <div className="w-full max-w-xs">
          <Select onValueChange={handleYearChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stamps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stamps.map((stamp) => (
          <Card key={stamp.id} id={`year-${stamp.year}`} className="flex flex-col max-w-[280px] mx-auto">
            <CardHeader className="space-y-1 p-4">
              <CardTitle className="text-lg">{stamp.name}</CardTitle>
              <CardDescription>Year: {stamp.year}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="aspect-square relative mb-2">
                <img
                  src={stamp.image}
                  alt={stamp.name}
                  className="object-cover rounded-lg w-full h-full"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {stamp.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between mt-auto p-4 pt-0">
              <div className="text-sm font-semibold">{stamp.price}</div>
              <Badge variant="secondary">{stamp.rarity}</Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
} 