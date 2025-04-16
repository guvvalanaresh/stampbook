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
// import { UserAuthNav } from "@/app/components/UserAuthNav"
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
//   SheetClose,
// } from "@/components/ui/sheet"
// import { useState } from "react"
// import { useCart } from "@/contexts/cart-context"
// import { usePathname } from "next/navigation"
// import { cn } from "@/lib/utils"
// import { Fragment } from "react"
// import { Transition } from "@headlessui/react"
// import { UserCircle } from "lucide-react"
// import { signOut, useSession } from "next-auth/react"
// import { Menu as MenuIcon } from "lucide-react"
// import { Menu as MenuHeadlessUI } from "@headlessui/react"

// export function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)
//   const { state } = useCart()
//   const cartItemsCount = state.items.reduce((acc, item) => acc + item.quantity, 0)
//   const pathname = usePathname()
//   const { data: session } = useSession()

//   const routes = [
//     {
//       href: '/',
//       label: 'Home',
//       active: pathname === '/'
//     },
//     {
//       href: '/listings',
//       label: 'Listings',
//       active: pathname === '/listings'
//     },
//     {
//       href: '/orders',
//       label: 'Orders',
//       active: pathname === '/orders'
//     },
//     {
//       href: '/deposit-account',
//       label: 'Deposit Account',
//       active: pathname === '/deposit-account'
//     }
//   ]

//   return (
//     <nav className="bg-white border-b">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex">
//             <div className="flex-shrink-0 flex items-center">
//               <Link href="/" className="text-2xl font-bold text-gray-900">
//                 Philately
//               </Link>
//             </div>
//             <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//               {routes.map((route) => (
//                 <Link
//                   key={route.href}
//                   href={route.href}
//                   className={cn(
//                     "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
//                     route.active
//                       ? "border-indigo-500 text-gray-900"
//                       : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
//                   )}
//                 >
//                   {route.label}
//                 </Link>
//               ))}
//             </div>
//           </div>
//           <div className="hidden sm:ml-6 sm:flex sm:items-center">
//             <Link
//               href="/cart"
//               className="relative p-2 text-gray-400 hover:text-gray-500"
//             >
//               <ShoppingCart className="h-6 w-6" />
//               {cartItemsCount > 0 && (
//                 <span className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 rounded-full bg-indigo-500 text-xs text-white flex items-center justify-center">
//                   {cartItemsCount}
//                 </span>
//               )}
//             </Link>
//             <MenuHeadlessUI as="div" className="ml-3 relative">
//               <div>
//                 <MenuHeadlessUI.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                   <span className="sr-only">Open user menu</span>
//                   <UserCircle className="h-8 w-8 text-gray-400" />
//                 </MenuHeadlessUI.Button>
//               </div>
//               <Transition
//                 as={Fragment}
//                 enter="transition ease-out duration-200"
//                 enterFrom="transform opacity-0 scale-95"
//                 enterTo="transform opacity-100 scale-100"
//                 leave="transition ease-in duration-75"
//                 leaveFrom="transform opacity-100 scale-100"
//                 leaveTo="transform opacity-0 scale-95"
//               >
//                 <MenuHeadlessUI.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
//                   {!session ? (
//                     <MenuHeadlessUI.Item>
//                       {({ active }: { active: boolean }) => (
//                         <div className="px-4 py-2 text-sm text-gray-700">
//                           About Us
//                         </div>
//                       )}
//                     </MenuHeadlessUI.Item>
//                   ) : session.user?.email === 'gnareshkumarreddy7@gmail.com' ? (
//                     <MenuHeadlessUI.Item>
//                       {({ active }: { active: boolean }) => (
//                         <div className="px-4 py-2 text-sm text-gray-700">
//                           Author: Gnaresh Kumar Reddy
//                         </div>
//                       )}
//                     </MenuHeadlessUI.Item>
//                   ) : null}
//                   {session && (
//                     <>
//                       <MenuHeadlessUI.Item>
//                         {({ active }: { active: boolean }) => (
//                           <Link
//                             href="/profile"
//                             className={cn(
//                               active ? "bg-gray-100" : "",
//                               "block px-4 py-2 text-sm text-gray-700"
//                             )}
//                           >
//                             Your Profile
//                           </Link>
//                         )}
//                       </MenuHeadlessUI.Item>
//                       <MenuHeadlessUI.Item>
//                         {({ active }: { active: boolean }) => (
//                           <button
//                             onClick={() => signOut()}
//                             className={cn(
//                               active ? "bg-gray-100" : "",
//                               "block w-full text-left px-4 py-2 text-sm text-gray-700"
//                             )}
//                           >
//                             Sign out
//                           </button>
//                         )}
//                       </MenuHeadlessUI.Item>
//                     </>
//                   )}
//                 </MenuHeadlessUI.Items>
//               </Transition>
//             </MenuHeadlessUI>
//           </div>
//           <div className="-mr-2 flex items-center sm:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
//             >
//               <span className="sr-only">Open main menu</span>
//               {isOpen ? (
//                 <X className="block h-6 w-6" />
//               ) : (
//                 <MenuIcon className="block h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//       <Transition
//         show={isOpen}
//         enter="transition ease-out duration-100 transform"
//         enterFrom="opacity-0 scale-95"
//         enterTo="opacity-100 scale-100"
//         leave="transition ease-in duration-75 transform"
//         leaveFrom="opacity-100 scale-100"
//         leaveTo="opacity-0 scale-95"
//       >
//         <div className="sm:hidden">
//           <div className="pt-2 pb-3 space-y-1">
//             {routes.map((route) => (
//               <Link
//                 key={route.href}
//                 href={route.href}
//                 className={cn(
//                   "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
//                   route.active
//                     ? "bg-indigo-50 border-indigo-500 text-indigo-700"
//                     : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
//                 )}
//               >
//                 {route.label}
//               </Link>
//             ))}
//           </div>
//           <div className="pt-4 pb-3 border-t border-gray-200">
//             <div className="flex items-center px-4">
//               <div className="flex-shrink-0">
//                 <UserCircle className="h-10 w-10 text-gray-400" />
//               </div>
//               <div className="ml-3">
//                 {!session ? (
//                   <div className="text-base font-medium text-gray-800">
//                     About Us
//                   </div>
//                 ) : session.user?.email === 'gnareshkumarreddy7@gmail.com' ? (
//                   <div className="text-base font-medium text-gray-800">
//                     Author: Gnaresh Kumar Reddy
//                   </div>
//                 ) : null}
//               </div>
//             </div>
//             {session && (
//               <div className="mt-3 space-y-1">
//                 <Link
//                   href="/profile"
//                   className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
//                 >
//                   Your Profile
//                 </Link>
//                 <button
//                   onClick={() => signOut()}
//                   className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
//                 >
//                   Sign out
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </Transition>
//     </nav>
//   )
// }

// function ListItem({ className, title, children, ...props }: React.ComponentPropsWithoutRef<"a"> & { title: string }) {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   )
// } 