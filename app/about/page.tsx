import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Phone, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About StampBook</h1>
          <p className="text-lg text-muted-foreground">
            India's Premier Digital Platform for Philately
          </p>
        </div>

        <div className="grid gap-8">
          {/* Mission */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                StampBook aims to digitize and streamline the philately experience in India, 
                making it easier for collectors to discover, purchase, and track postal stamps 
                while fostering a vibrant community of philatelists across the nation.
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">For Collectors</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Access to latest stamp releases</li>
                  <li>• Digital deposit account management</li>
                  <li>• Real-time order tracking</li>
                  <li>• Community discussions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Coverage</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• All 23 postal circles</li>
                  <li>• Special cancellations</li>
                  <li>• Commemorative stamps</li>
                  <li>• Philatelic bureaus</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Head Office</p>
                      <p className="text-sm text-muted-foreground">
                        123 Philately House, Dak Bhawan
                        <br />
                        New Delhi, 110001
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">+91 11 2309 6777</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">support@stampbook.in</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Working Hours</p>
                      <p className="text-sm text-muted-foreground">Mon - Fri, 9:00 - 18:00 IST</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 