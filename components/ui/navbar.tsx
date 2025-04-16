"use client"

import Link from "next/link"
import { Button } from "./button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Bell, Search, ShoppingCart, Menu, X } from "lucide-react"
import { Badge } from "./badge"
import { Logo } from "./logo"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { UserAuthNav } from "@/app/components/UserAuthNav"
import { useSession } from "next-auth/react"
import { useNotifications } from "@/app/context/NotificationContext"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { state } = useCart()
  const { data: session } = useSession()
  const { unreadCount } = useNotifications()
  const cartItemsCount = state.items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <nav className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        <li className="row-span-3">
                          <Link href="/releases" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                            <Badge className="w-fit mb-2">New</Badge>
                            <div className="mb-2 text-lg font-medium">Latest Releases</div>
                            <p className="text-sm text-muted-foreground">
                              Discover new stamp releases from across India
                            </p>
                          </Link>
                        </li>
                        <ListItem href="/circles" title="Postal Circles">
                          Browse stamps by postal circle
                        </ListItem>
                        <ListItem href="/cancellations" title="Special Cancellations">
                          View special and commemorative cancellations
                        </ListItem>
                        <ListItem href="/community" title="Community">
                          Connect with fellow collectors
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        <ListItem href="/deposit-account" title="Deposit Account">
                          Manage your national philately deposit account
                        </ListItem>
                        <ListItem href="/orders" title="Track Orders">
                          Monitor your purchases and shipping status
                        </ListItem>
                        <ListItem href="/notifications" title="Notifications">
                          Stay updated with new releases and events
                        </ListItem>
                        <ListItem href="/support" title="Support">
                          Get help with your queries
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {session?.user?.email === 'gnareshkumarreddy7@gmail.com' && (
                    <NavigationMenuItem>
                      <Link href="/author" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          Author
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  )}

                  <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
            <UserAuthNav />
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-6 py-4">
                  <div className="flex items-center justify-between">
                    <Logo />
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Link href="/releases" className="text-lg font-medium">Latest Releases</Link>
                    <Link href="/circles" className="text-lg font-medium">Postal Circles</Link>
                    <Link href="/cancellations" className="text-lg font-medium">Special Cancellations</Link>
                    <Link href="/community" className="text-lg font-medium">Community</Link>
                    <Link href="/deposit-account" className="text-lg font-medium">Deposit Account</Link>
                    {session?.user?.email === 'gnareshkumarreddy7@gmail.com' && (
                      <Link href="/author" className="text-lg font-medium">Author</Link>
                    )}
                    <Link href="/about" className="text-lg font-medium">About</Link>
                    <Link href="/orders" className="text-lg font-medium">Track Orders</Link>
                    <Link href="/notifications" className="text-lg font-medium flex items-center gap-2">
                      Notifications
                      {unreadCount > 0 && (
                        <span className="h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2 mt-auto">
                    <UserAuthNav />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

function ListItem({ className, title, children, ...props }: React.ComponentPropsWithoutRef<"a"> & { title: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
} 