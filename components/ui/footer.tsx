import Link from "next/link"
import { Button } from "./button"
import { Input } from "./input"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="font-bold text-2xl mb-4 block">
              IndiaPhilately
            </Link>
            <p className="text-muted-foreground mb-4 max-w-sm">
              India's premier platform connecting philatelists nationwide through a comprehensive digital ecosystem for stamp collection and trading.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@stampbook.in</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>1800-xxx-xxxx (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>India Post Philately Division</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/releases" className="text-muted-foreground hover:text-primary transition-colors">Latest Releases</Link></li>
              <li><Link href="/circles" className="text-muted-foreground hover:text-primary transition-colors">Postal Circles</Link></li>
              <li><Link href="/cancellations" className="text-muted-foreground hover:text-primary transition-colors">Special Cancellations</Link></li>
              <li><Link href="/community" className="text-muted-foreground hover:text-primary transition-colors">Community</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/deposit-account" className="text-muted-foreground hover:text-primary transition-colors">Deposit Account</Link></li>
              <li><Link href="/orders" className="text-muted-foreground hover:text-primary transition-colors">Track Orders</Link></li>
              <li><Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">Support</Link></li>
              <li><Link href="/guidelines" className="text-muted-foreground hover:text-primary transition-colors">Guidelines</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest releases and events.
            </p>
            <div className="space-y-2">
              <Input placeholder="Enter your email" type="email" />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} stampbook.in. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 