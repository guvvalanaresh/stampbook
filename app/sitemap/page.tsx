import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SitemapPage() {
  const sections = [
    {
      title: "Main Pages",
      links: [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/support", label: "Support" },
      ]
    },
    {
      title: "Explore",
      links: [
        { href: "/releases", label: "Latest Releases" },
        { href: "/circles", label: "Postal Circles" },
        { href: "/cancellations", label: "Special Cancellations" },
        { href: "/community", label: "Community" },
      ]
    },
    {
      title: "Services",
      links: [
        { href: "/deposit-account", label: "Deposit Account" },
        { href: "/orders", label: "Track Orders" },
        { href: "/guidelines", label: "Guidelines" },
      ]
    },
    {
      title: "Legal",
      links: [
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
        { href: "/sitemap", label: "Sitemap" },
      ]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 