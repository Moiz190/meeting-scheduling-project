import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
export const config = {
    matcher: ["/", '/meeting', "/signup", "/login"]
}
export const middleware = (req: NextRequest) => {
    const token = cookies().get("token")?.value;
    // if (req.nextUrl.pathname === "/") {
    //     return NextResponse.redirect(new URL("/login", req.url));
    // }

    // if (!token && req.nextUrl.pathname === "/meeting") {
    //     return NextResponse.redirect(new URL("/login", req.url));
    // }
    // if (token && req.nextUrl.pathname !== "/meeting") {
    //     return NextResponse.redirect(new URL("/meeting", req.url));
    // }
    return NextResponse.next()


}