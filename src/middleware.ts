import { NextRequest, NextResponse } from "next/server";
import { isValid } from "zod";
import { isValidPassword } from "./lib/isValidPassword";

export async function middleware(req: NextRequest) {
    if (await isAuthenticaded(req) === false) {
        return new NextResponse("No esta autorizado", {status: 401, headers: { "WWW-Authenticate": "Basic"}})
    }
}

async function isAuthenticaded(req: NextRequest) {
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization")

    if (authHeader == null) return false

    const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
        .toString()
        .split(":")

    

    return (
        username === process.env.ADMIN_USERNAME && 
        (await isValidPassword(
            password, 
            process.env.HASHED_ADMIN_PASSWORD as string
        ))
    )
}

export const config = {
    matcher: "/admin/:path*"
}