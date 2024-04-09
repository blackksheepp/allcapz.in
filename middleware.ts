import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = [
    "/",
    "/product/.*",
    "/email",
    "/admin",
    "/google",
    "/checkout"
];

export const middleware = async (request: NextRequest) => {
    const regex = publicRoutes.map(p => new RegExp(p.replaceAll("/", "\\/") + "$"));
    const path = request.nextUrl.pathname;

    if (regex.some(r => r.test(path))) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|img|assets|_next/static|_next/image|favicon.ico).*)',
    ],
}