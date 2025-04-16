// "use client"

// import { Geist, Geist_Mono, Nunito } from "next/font/google";
// import { Navbar } from '@/components/ui/navbar'
// import { Footer } from '@/components/ui/footer'
// import { CartProvider } from "@/contexts/cart-context"
// import { OrdersProvider } from "@/contexts/orders-context"
// import { Providers } from "../components/Providers"
// import { Toaster } from "sonner"
// import { SessionProvider } from "next-auth/react"

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
//   display: "swap",
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
//   display: "swap",
// });

// const nunito = Nunito({
//   variable: "--font-nunito",
//   subsets: ["latin"],
//   display: "swap",
// });

// export function RootLayoutClient({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <div className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} antialiased`}>
//       <SessionProvider>
//         <Providers>
//           <OrdersProvider>
//             <CartProvider>
//               <div className="min-h-screen flex flex-col">
//                 <Navbar />
//                 <main className="flex-1">
//                   {children}
//                 </main>
//                 <Footer />
//                 <Toaster />
//               </div>
//             </CartProvider>
//           </OrdersProvider>
//         </Providers>
//       </SessionProvider>
//     </div>
//   );
// } 