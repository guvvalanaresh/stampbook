import { NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    "/api/deposit/:path*",
    "/api/deposit-account/:path*",
    "/api/deposit-account",
    "/api/transactions/:path*",
    "/api/transactions",
    "/api/orders/:path*",
    "/api/orders",
    "/deposit-account",
    "/deposit-account/:path*",
    "/orders"
  ]
} 