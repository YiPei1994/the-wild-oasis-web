/* import { NextResponse } from "next/server";

export function middleware(request: Request) {

  return NextResponse.redirect(new URL("/", request.url));
} */

import { auth } from "./lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
