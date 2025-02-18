"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Tag, Star, Shield, CheckCircle, AlertCircle } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { UploadStampDialog } from "@/app/components/upload-stamp-dialog"
import { useState } from "react"

const stamps = [
  {
    id: 1,
    name: "1948 Mahatma Gandhi 10r Service",
    price: "₹12,500",
    condition: "Mint",
    category: "Historical",
    seller: "Sarah Wilson",
    sellerRating: 4.9,
    image: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?q=80&w=300&h=200&fit=crop",
    listed: "2 days ago"
  },
  {
    id: 2,
    name: "1854 Queen Victoria Red",
    price: "₹8,900",
    condition: "Fine Used",
    category: "Rare",
    seller: "John Smith",
    sellerRating: 4.7,
    image: "https://images.unsplash.com/photo-1578307362674-b209690512c8?q=80&w=300&h=200&fit=crop",
    listed: "5 days ago"
  },
  {
    id: 3,
    name: "1929 Airmail Service",
    price: "₹5,500",
    condition: "Very Fine",
    category: "Aviation",
    seller: "David Chen",
    sellerRating: 4.8,
    image: "https://images.unsplash.com/photo-1584727638095-bd9c8c2c8d2c?q=80&w=300&h=200&fit=crop",
    listed: "1 week ago"
  }
]

export default function TradePage() {
  const [stampListings, setStampListings] = useState(stamps)

  const handleNewStamp = (newStamp: any) => {
    setStampListings([newStamp, ...stampListings])
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 space-y-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Secure Stamp Trading
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Buy, sell, and trade stamps with verified collectors. Every transaction is secured by our NPDA system.
        </p>
        <div className="flex justify-center gap-8 pt-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm">NPDA Protected</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span className="text-sm">Verified Sellers</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            <span className="text-sm">Secure Payments</span>
          </div>
        </div>
      </section>

      {/* NPDA Info Card */}
      <section className="mb-12">
        <Card className="bg-slate-50">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 rounded-full bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">NPDA Secure Trading</h3>
              <p className="text-sm text-muted-foreground">
                Your transactions are protected by the National Philately Deposit Account system. 
                Funds are held securely until both parties confirm the trade.
              </p>
            </div>
            <Button variant="outline">Learn More</Button>
          </CardContent>
        </Card>
      </section>

      {/* Search and Filters */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search stamps..." className="pl-10" />
          </div>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="historical">Historical</SelectItem>
                <SelectItem value="rare">Rare</SelectItem>
                <SelectItem value="aviation">Aviation</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                <SelectItem value="mint">Mint</SelectItem>
                <SelectItem value="fine">Fine Used</SelectItem>
                <SelectItem value="very-fine">Very Fine</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Stamps Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stampListings.map((stamp) => (
          <Card key={stamp.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[3/2] relative">
              <img 
                src={stamp.image} 
                alt={stamp.name}
                className="object-cover w-full h-full"
              />
              <Badge className="absolute top-4 right-4">{stamp.condition}</Badge>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        NPDA
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Protected by NPDA Secure Trading</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{stamp.name}</CardTitle>
                  <CardDescription>{stamp.category}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{stamp.price}</div>
                  <CardDescription>{stamp.listed}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${stamp.seller}`} />
                    <AvatarFallback>{stamp.seller[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-medium">{stamp.seller}</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <CheckCircle className="h-3 w-3 text-primary fill-primary" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Verified Seller</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {stamp.sellerRating}
                      </span>
                    </div>
                  </div>
                </div>
                <Button className="gap-2">
                  <Shield className="h-4 w-4" />
                  Make Secure Offer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* How It Works Section */}
      <section className="mt-16 py-12 bg-slate-50 rounded-lg">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">How NPDA Secure Trading Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">1. Make Secure Offer</h3>
              <p className="text-sm text-muted-foreground">
                Place your offer through our NPDA-protected system
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">2. Seller Confirms</h3>
              <p className="text-sm text-muted-foreground">
                Verified seller accepts and ships the stamp
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Tag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">3. Safe Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Funds are released once you confirm receipt
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sell CTA */}
      <section className="mt-16 py-12 bg-slate-50 rounded-lg text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl font-bold">Have Stamps to Sell?</h2>
          <p className="text-muted-foreground">
            List your stamps and reach thousands of verified collectors.
          </p>
          <UploadStampDialog onUpload={handleNewStamp} />
        </div>
      </section>
    </main>
  )
} 