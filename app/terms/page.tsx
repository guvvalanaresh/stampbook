import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p>By accessing and using IndiaPhilately, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Account Registration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>To use our services, you must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be at least 18 years old</li>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Deposit Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>When using our deposit account service:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Funds must be added through approved payment methods</li>
              <li>Minimum deposit amounts apply</li>
              <li>Withdrawals are subject to verification</li>
              <li>Account activity is monitored for security</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Purchases and Orders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>When making purchases:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prices are subject to change without notice</li>
              <li>Orders are subject to availability</li>
              <li>Payment must be received before processing</li>
              <li>Shipping times may vary</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent>
            <p>All content on IndiaPhilately, including images, text, and designs, is protected by intellectual property rights and may not be used without permission.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p>IndiaPhilately is not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>For questions about these Terms of Service, please contact us at:</p>
            <p className="mt-2">Email: legal@stampbook.in</p>
            <p>Phone: 1800-xxx-xxxx</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 