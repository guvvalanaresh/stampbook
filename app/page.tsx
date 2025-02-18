import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 space-y-6">
        <Badge variant="secondary" className="text-sm">Welcome to</Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          PhilatelyConnect
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join the largest community of stamp collectors in the country. Share, learn, and grow your collection with fellow philatelists.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" variant="outline" asChild>
          <Link href="/community">Join Community</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/collections">Explore Collections</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/connect" className="block group">
            <Card className={cn(
              "transition-colors",
              "hover:border-primary/50"
            )}>
              <CardHeader>
                <CardTitle className="group-hover:text-primary">Connect</CardTitle>
                <CardDescription>
                  Meet fellow stamp enthusiasts
                </CardDescription>
              </CardHeader>
              <CardContent>
                Join discussions, share your collection, and connect with collectors from across the nation.
              </CardContent>
            </Card>
          </Link>

          <Link href="/learn" className="block group">
            <Card className={cn(
              "transition-colors",
              "hover:border-primary/50"
            )}>
              <CardHeader>
                <CardTitle className="group-hover:text-primary">Learn</CardTitle>
                <CardDescription>
                  Expand your knowledge
                </CardDescription>
              </CardHeader>
              <CardContent>
                Access expert articles, guides, and resources about stamp collecting and philately history.
              </CardContent>
            </Card>
          </Link>

          <Link href="/trade" className="block group">
            <Card className={cn(
              "transition-colors",
              "hover:border-primary/50"
            )}>
              <CardHeader>
                <CardTitle className="group-hover:text-primary">Trade</CardTitle>
                <CardDescription>
                  Grow your collection
                </CardDescription>
              </CardHeader>
              <CardContent>
                Find rare stamps, trade with trusted collectors, and expand your collection safely.
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">5,000+</h3>
            <p className="text-muted-foreground">Active Members</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">50,000+</h3>
            <p className="text-muted-foreground">Stamps Cataloged</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">1,000+</h3>
            <p className="text-muted-foreground">Monthly Trades</p>
          </div>
        </div>
      </section>
    </main>
  )
}
