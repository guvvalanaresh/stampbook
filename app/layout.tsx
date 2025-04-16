import { Inter } from "next/font/google"
import "./globals.css"
import { Footer } from "@/components/ui/footer"
import { ClientLayout } from "@/app/components/client-layout"
import { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Stampbook",
  description: "Discover, collect, and connect with fellow philatelists across India through our comprehensive platform.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
        <Footer />
      </body>
    </html>
  )
}