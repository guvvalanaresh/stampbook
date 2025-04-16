import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GuidelinesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Guidelines</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Account Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>When managing your account:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Keep your account credentials secure</li>
              <li>Update your contact information regularly</li>
              <li>Report any suspicious activity immediately</li>
              <li>Use strong passwords and enable two-factor authentication</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Deposit Account Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>For your deposit account:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Minimum deposit amount: ₹100</li>
              <li>Maximum deposit amount: ₹50,000 per transaction</li>
              <li>Withdrawals are processed within 24-48 hours</li>
              <li>Keep track of your transaction history</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Ordering Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>When placing orders:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Verify item details before purchase</li>
              <li>Check shipping address accuracy</li>
              <li>Review order summary before confirmation</li>
              <li>Keep order confirmation emails</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>When participating in the community:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respect other members' opinions</li>
              <li>Share accurate information</li>
              <li>Report inappropriate content</li>
              <li>Follow discussion rules</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Content Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>When sharing content:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use appropriate language</li>
              <li>Respect copyright laws</li>
              <li>Provide accurate descriptions</li>
              <li>Include relevant tags and categories</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Support Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>When seeking support:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide clear problem descriptions</li>
              <li>Include relevant order numbers</li>
              <li>Be patient and respectful</li>
              <li>Follow up on unresolved issues</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>For questions about these guidelines, please contact us at:</p>
            <p className="mt-2">Email: guidelines@stampbook.in</p>
            <p>Phone: 1800-xxx-xxxx</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 