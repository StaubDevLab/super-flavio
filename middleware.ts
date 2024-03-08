import withAuth from "next-auth/middleware"
import { authOptions } from "@/lib/auth-options";
export { default } from "next-auth/middleware";
// export default  withAuth({
//     pages: {
//         // signIn: '/api/auth/signin',
//         error: '/error',
//     },
//     jwt: { decode: authOptions.jwt?.decode },
//     callbacks: {
//          authorized: ({ token }) =>{
//             console.log(token)
//             return !!token
//         },
//     },
// })



export const config = { matcher: ["/admin/:path*"] }