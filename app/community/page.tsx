"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Users, Heart } from "lucide-react"

const discussions = [
  {
    id: 1,
    title: "Rare Indian Stamps from 1947",
    content: "Just discovered a fascinating collection of stamps from India's independence era. Would love to discuss their historical significance.",
    author: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    likes: 23,
    comments: 15,
    tag: "Discussion"
  },
  {
    id: 2,
    title: "Upcoming Stamp Exhibition in Mumbai",
    content: "Excited to share details about the upcoming philately exhibition in Mumbai next month. Who's planning to attend?",
    author: "Sarah Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    likes: 45,
    comments: 28,
    tag: "Event"
  },
  {
    id: 3,
    title: "Tips for New Collectors",
    content: "Starting your stamp collection? Here are some essential tips I've learned over the years of collecting.",
    author: "David Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    likes: 56,
    comments: 32,
    tag: "Guide"
  }
]

export default function CommunityPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Philatelist Community</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with fellow stamp collectors, share your knowledge, and discover amazing collections.
        </p>
      </div>

      {/* Create Post Section */}
      <div className="max-w-3xl mx-auto mb-12">
        <Card>
          <CardContent className="pt-6">
            <Input 
              placeholder="Start a discussion or share something with the community..." 
              className="mb-4"
            />
            <div className="flex justify-end">
              <Button>Create Post</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Discussions Feed */}
      <div className="max-w-3xl mx-auto space-y-6">
        {discussions.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src={post.avatar} />
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-muted-foreground">Posted by {post.author}</p>
                </div>
                <Badge className="ml-auto">{post.tag}</Badge>
              </div>
              <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
              <p className="text-muted-foreground">{post.content}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 text-muted-foreground">
                <button className="flex items-center gap-2 hover:text-primary transition">
                  <Heart className="h-5 w-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-primary transition">
                  <MessageCircle className="h-5 w-5" />
                  <span>{post.comments}</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Join Community CTA */}
      <div className="max-w-3xl mx-auto mt-12 text-center">
        <Card className="bg-slate-50">
          <CardContent className="py-8">
            <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Join Our Growing Community</h2>
            <p className="text-muted-foreground mb-4">
              Connect with 5,000+ stamp collectors from around the world.
            </p>
            <Button size="lg">Join Community</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
} 