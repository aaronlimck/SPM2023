import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // "withAuth" augments your "Request" with user's token
    // console.log(request.nextUrl.pathname);
    // console.log(request.nextauth.token);

    // if (
    //   request.nextUrl.pathname.startsWith("/hr") &&
    //   request.nextauth.token?.role !== "HR"
    // ) {
    //   return NextResponse.rewrite(new URL("/denied", request.url));
    // }

    if (
      request.nextUrl.pathname.startsWith("/hr") &&
      request.nextauth.token?.role === "STAFF"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/hr/:path*", "/staff/:path*"] };
