import GoogleProvider from 'next-auth/providers/google'
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/lib/db";


export const authOptions:{debug: boolean, adapter: any, secret: string, providers: any, callbacks: any, session:any} = {
    debug: true,
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET as string,
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_PROVIDER_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_PROVIDER_CLIENT_SECRET as string,
        })],
    callbacks: {

        async signIn({ user , profile } : { user: any, profile: any }) {
            const allowedEmails:Array<string> = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(",") as Array<string>;

            if (!allowedEmails === undefined && !profile &&  !allowedEmails.includes(profile.email)) {
                return { user: null };
            }
            return user;

        },
    },
    session: {
        strategy: "jwt",
    },



}