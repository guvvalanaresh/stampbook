"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Users, Share2 } from "lucide-react"

const features = [
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Join Discussions",
    description: "Engage in meaningful conversations about stamp collecting, share your expertise, and learn from others."
  },
  {
    icon: <Share2 className="h-6 w-6" />,
    title: "Share Collections",
    description: "Showcase your prized stamps, tell their stories, and get feedback from fellow collectors."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Build Networks",
    description: "Connect with collectors who share your interests and build lasting relationships."
  }
]

const activeDiscussions = [
  {
    title: "Rare Finds Show & Tell",
    participants: 28,
    lastActive: "2 mins ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1"
  },
  {
    title: "Beginner's Corner",
    participants: 45,
    lastActive: "5 mins ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2"
  },
  {
    title: "Trading Tips & Advice",
    participants: 32,
    lastActive: "12 mins ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3"
  }
]

export default function ConnectPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Connect with Fellow Collectors
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join a vibrant community of stamp enthusiasts. Share your passion, learn from others, and grow your collection together.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">Start a Discussion</Button>
          <Button size="lg" variant="outline">Browse Topics</Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Active Discussions */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8">Active Discussions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeDiscussions.map((discussion) => (
            <Card key={discussion.title} className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={discussion.avatar} />
                  <AvatarFallback>DC</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{discussion.title}</CardTitle>
                  <CardDescription>{discussion.lastActive}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {discussion.participants} participants
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline">View All Discussions</Button>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-slate-50 rounded-lg">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold">Our Growing Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary">15K+</div>
              <div className="text-muted-foreground">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">50K+</div>
              <div className="text-muted-foreground">Daily Messages</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">100+</div>
              <div className="text-muted-foreground">Countries</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 