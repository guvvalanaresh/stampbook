"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  useEffect(() => {
    // Log the error for debugging
    if (error) {
      console.error("Auth error:", error)
    }
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="text-muted-foreground mb-6">
          {error === "Configuration" && "There was a problem with the authentication configuration."}
          {error === "AccessDenied" && "Access was denied to your account."}
          {error === "Verification" && "The verification process failed."}
          {error === "OAuthCallback" && "The authentication process timed out. Please try again."}
          {!error && "An unknown error occurred during authentication."}
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/auth/signin">Try Again</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 