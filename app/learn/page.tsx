"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Clock, Filter } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const articles = [
  {
    title: "New Indian Heritage Stamp Series Released",
    description: "Exploring the latest collection of stamps celebrating India's rich cultural heritage, featuring traditional art forms and historical monuments.",
    category: "New Release",
    readTime: "5 min read",
    date: "Mar 15, 2024",
    author: "Rahul Sharma",
    image: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?q=80&w=600&h=400&fit=crop"
  },
  {
    title: "Special Edition Olympic Games 2024 Stamps",
    description: "A detailed look at the commemorative stamps issued for the Paris 2024 Olympic Games, featuring iconic sports moments.",
    category: "Special Edition",
    readTime: "8 min read",
    date: "Mar 12, 2024",
    author: "Sarah Wilson",
    image: "https://images.unsplash.com/photo-1578307362674-b209690512c8?q=80&w=600&h=400&fit=crop"
  },
  {
    title: "Wildlife Conservation Series: 2024 Collection",
    description: "Discover the new stamp series dedicated to endangered species, raising awareness about wildlife conservation.",
    category: "New Release",
    readTime: "6 min read",
    date: "Mar 10, 2024",
    author: "David Chen",
    image: "https://images.unsplash.com/photo-1584727638095-bd9c8c2c8d2c?q=80&w=600&h=400&fit=crop"
  }
]

export default function LearnPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Stamp News & Articles
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest stamp releases, special editions, and philately news from around the world.
        </p>
      </section>

      {/* Filters */}
      <section className="mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-slate-50 rounded-lg">
          <h2 className="text-lg font-semibold">Filter Articles</h2>
          <div className="flex flex-wrap gap-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="new-release">New Releases</SelectItem>
                <SelectItem value="special">Special Editions</SelectItem>
                <SelectItem value="historical">Historical</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="grid grid-cols-1 gap-8">
        {articles.map((article) => (
          <Card key={article.title} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-[3/2] relative">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="object-cover w-full h-full"
                />
                <Badge className="absolute top-4 left-4">{article.category}</Badge>
              </div>
              <div className="flex flex-col justify-between p-6">
                <div className="space-y-4">
                  <CardTitle className="text-2xl hover:text-primary cursor-pointer">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {article.description}
                  </CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">By {article.author}</span>
                  <Button variant="ghost" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* Newsletter Section */}
      <section className="mt-16 py-12 bg-slate-50 rounded-lg text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl font-bold">Stay Updated</h2>
          <p className="text-muted-foreground">
            Subscribe to our newsletter to receive updates about new stamp releases and articles.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </main>
  )
} 