// "use client"

// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu"
// import { Bell, Search, ShoppingCart, Menu, X } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import { Logo } from "@/components/ui/logo"
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
//   SheetClose,
// } from "@/components/ui/sheet"
// import { useState } from "react"
// import { useCart } from "@/contexts/cart-context"
// import { UserAuthNav } from "./UserAuthNav"

// export function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)
//   const { state } = useCart()
//   const cartItemsCount = state.items.reduce((acc, item) => acc + item.quantity, 0)

//   return (
//     <nav className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           <div className="flex items-center gap-8">
//             <Link href="/" className="flex items-center gap-2">
//               <Logo />
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden md:block">
//               <NavigationMenu>
//                 <NavigationMenuList>
//                   <NavigationMenuItem>
//                     <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
//                     <NavigationMenuContent>
//                       <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
//                         <li className="row-span-3">
//                           <Link href="/releases" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
//                             <Badge className="w-fit mb-2">New</Badge>
//                             <div className="mb-2 text-lg font-medium">Latest Releases</div>
//                             <p className="text-sm text-muted-foreground">
//                               Discover newly released stamps and collections
//                             </p>
//                           </Link>
//                         </li>
//                         <li>
//                           <Link href="/circles" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
//                             <div className="text-sm font-medium leading-none">Postal Circles</div>
//                             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                               Browse stamps by postal circles
//                             </p>
//                           </Link>
//                         </li>
//                         <li>
//                           <Link href="/collections" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
//                             <div className="text-sm font-medium leading-none">Collections</div>
//                             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                               Curated collections of stamps
//                             </p>
//                           </Link>
//                         </li>
//                       </ul>
//                     </NavigationMenuContent>
//                   </NavigationMenuItem>
//                   <NavigationMenuItem>
//                     <Link href="/about" legacyBehavior passHref>
//                       <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                         About
//                       </NavigationMenuLink>
//                     </Link>
//                   </NavigationMenuItem>
//                   <NavigationMenuItem>
//                     <Link href="/contact" legacyBehavior passHref>
//                       <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                         Contact
//                       </NavigationMenuLink>
//                     </Link>
//                   </NavigationMenuItem>
//                 </NavigationMenuList>
//               </NavigationMenu>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <Button variant="ghost" size="icon" className="hidden md:flex">
//               <Search className="h-5 w-5" />
//             </Button>
//             <Button variant="ghost" size="icon" className="hidden md:flex">
//               <Bell className="h-5 w-5" />
//             </Button>
//             <Link href="/cart">
//               <Button variant="ghost" size="icon" className="relative">
//                 <ShoppingCart className="h-5 w-5" />
//                 {cartItemsCount > 0 && (
//                   <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full p-0">
//                     {cartItemsCount}
//                   </Badge>
//                 )}
//               </Button>
//             </Link>

//             <UserAuthNav />

//             {/* Mobile Navigation */}
//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger asChild className="md:hidden">
//                 <Button variant="ghost" size="icon">
//                   <Menu className="h-5 w-5" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right">
//                 <div className="flex flex-col gap-4">
//                   <Link href="/releases" onClick={() => setIsOpen(false)}>
//                     Latest Releases
//                   </Link>
//                   <Link href="/circles" onClick={() => setIsOpen(false)}>
//                     Postal Circles
//                   </Link>
//                   <Link href="/collections" onClick={() => setIsOpen(false)}>
//                     Collections
//                   </Link>
//                   <Link href="/about" onClick={() => setIsOpen(false)}>
//                     About
//                   </Link>
//                   <Link href="/contact" onClick={() => setIsOpen(false)}>
//                     Contact
//                   </Link>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }