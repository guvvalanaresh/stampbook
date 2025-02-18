"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    
    <nav className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="PhilatelyConnect Logo"
            width={32}
            height={32}
            className="rounded-sm"
          />
          <span className="font-bold text-xl font-audiowide">stampbook</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-8 font-nunito">
          <Link 
            href="/" 
            className="text-sm font-bold hover:text-primary relative after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            Home
          </Link>
          <Link 
            href="/learn" 
            className="text-sm font-bold hover:text-primary relative after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            News
          </Link>
          <Link 
            href="/collections" 
            className="text-sm font-bold hover:text-primary relative after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            Collections
          </Link>
          <Link 
            href="/orders" 
            className="text-sm font-bold hover:text-primary relative after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            Orders
          </Link>
          <Link 
            href="/account" 
            className="text-sm font-bold hover:text-primary relative after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            Account
          </Link>
          <Link 
            href="/community" 
            className="text-sm font-bold hover:text-primary relative after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            Community
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button size="sm" asChild className="bg-black text-white hover:bg-black/90">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8 font-nunito">
              <Link 
                href="/" 
                className="text-sm font-bold hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/learn" 
                className="text-sm font-bold hover:text-primary"
                onClick={() => setOpen(false)}
              >
                News
              </Link>
              <Link 
                href="/collections" 
                className="text-sm font-bold hover:text-primary relative w-fit after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                onClick={() => setOpen(false)}
              >
                Collections
              </Link>
              <Link 
                href="/orders" 
                className="text-sm font-bold hover:text-primary relative w-fit after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                onClick={() => setOpen(false)}
              >
                Orders
              </Link>
              <Link 
                href="/account" 
                className="text-sm font-bold hover:text-primary relative w-fit after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                onClick={() => setOpen(false)}
              >
                Account
              </Link>
              <Link 
                href="/community" 
                className="text-sm font-bold hover:text-primary relative w-fit after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                onClick={() => setOpen(false)}
              >
                Community
              </Link>
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/signin" onClick={() => setOpen(false)}>Sign In</Link>
                </Button>
                <Button size="sm" asChild className="bg-black text-white hover:bg-black/90">
                  <Link href="/signup" onClick={() => setOpen(false)}>Sign Up</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
} 