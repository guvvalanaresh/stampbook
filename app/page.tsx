"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Mail, MapPin, Users, Stamp, Package, Calendar } from "lucide-react";
import Link from "next/link";
import router from "next/router";
import { toast } from "sonner"

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

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  const [latestCards, setLatestCards] = useState<CardItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLatestCards = async () => {
      try {
        const res = await fetch('/api/cards')
        const data = await res.json()
        // Ensure data is an array before slicing
        const cardsArray = Array.isArray(data) ? data : []
        setLatestCards(cardsArray.slice(0, 6))
      } catch (error) {
        console.error('Error fetching latest cards:', error)
        setLatestCards([]) // Set empty array on error
      } finally {
        setLoading(false)
      }
    }

    fetchLatestCards()
  }, [])

  const handleDepositAccountClick = () => {
    if (!session) {
      toast.error("Please sign in to access your deposit account")
      router.push("/signin")
      return
    }
    router.push("/deposit-account")
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading latest releases...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 via-primary/5 to-background py-16 sm:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        <div className="container mx-auto px-4 text-center relative">
          <Badge className="mb-4" variant="secondary">National Platform for Philatelists</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            India's Premier Philately Platform
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover, collect, and connect with fellow philatelists across India through our comprehensive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/releases">
              <Button size="lg" className="group">
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
              </Button>
            </Link>
            <Button onClick={handleDepositAccountClick} variant="outline" className="bg-white text-black hover:bg-white/90">
              Create Deposit Account
            </Button>
          </div>
        </div>
      </section>

      {/* Features Tabs */}
      <section className="py-12 sm:py-16 lg:py-20 container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Platform Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to explore and collect stamps from across India
          </p>
        </div>

        <Tabs defaultValue="collect" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="collect">Collect</TabsTrigger>
            <TabsTrigger value="connect">Connect</TabsTrigger>
            <TabsTrigger value="manage">Manage</TabsTrigger>
          </TabsList>
          <TabsContent value="collect">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Stamp className="h-6 w-6" />}
                title="National Access"
                description="Browse and collect stamps from all postal circles across India"
              />
              <FeatureCard
                icon={<Package className="h-6 w-6" />}
                title="Secure Delivery"
                description="Reliable shipping through registered post and speed post"
              />
              <FeatureCard
                icon={<Calendar className="h-6 w-6" />}
                title="New Releases"
                description="Stay updated with the latest philatelic releases"
              />
            </div>
          </TabsContent>
          <TabsContent value="connect">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Users className="h-6 w-6" />}
                title="Community"
                description="Connect with fellow philatelists and share your collection"
              />
              {/* Add more feature cards for connect tab */}
            </div>
          </TabsContent>
          <TabsContent value="manage">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Mail className="h-6 w-6" />}
                title="Track Orders"
                description="Monitor your purchases and shipping status"
              />
              {/* Add more feature cards for manage tab */}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Latest Releases */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
            <div>
              <Badge variant="secondary" className="mb-4">New Arrivals</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold">Latest Releases</h2>
            </div>
            <Link href="/releases" className="mt-4 sm:mt-0">
              <Button variant="outline" className="group">
                View All Collections
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {latestCards.map((card) => (
              <Card key={card._id} className="group hover:shadow-lg transition-all">
                <CardHeader className="p-0">
                  <div className="aspect-[4/3] bg-muted rounded-t-lg relative overflow-hidden">
                    {card.imageUrl && (
                      <img 
                        src={card.imageUrl}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0" />
                    <Badge className="absolute top-4 left-4" variant="secondary">
                      ₹{card.price}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-lg mb-2 line-clamp-1">{card.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {card.circle}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Category: {card.category}</p>
                  <p className="text-sm text-muted-foreground">Released: {new Date(card.releaseDate).toLocaleDateString()}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Link href={`/releases#${card._id}`} className="w-full">
                    <Button className="w-full group-hover:bg-primary" variant="secondary">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 sm:py-16 lg:py-20 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          <StatCard number="23" label="Postal Circles" />
          <StatCard number="1000+" label="Active Members" />
          <StatCard number="500+" label="Monthly Releases" />
          <StatCard number="50K+" label="Transactions" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="container mx-auto px-4 text-center relative">
          <Badge variant="secondary" className="mb-4">Get Started Today</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Join the National Philately Community</h2>
          <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
            Create your account today and get access to exclusive releases, special cancellations, and connect with fellow philatelists.
          </p>
          <Button size="lg" className="group" onClick={() => router.push('/signin')}>
            Register Now
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <p className="text-3xl font-bold text-primary mb-2">{number}</p>
          <p className="text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
