import type { Adapter } from "next-auth/adapters";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
export const authOptions: NextAuthOptions = {
    debug: false,
    adapter: PrismaAdapter(prisma) as Adapter,
    secret: process.env.NEXTAUTH_SECRET as string,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_PROVIDER_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_PROVIDER_CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        async signIn({ user }) {
            const allowedEmails = (process.env.ALLOWED_EMAILS || process.env.NEXT_PUBLIC_ALLOWED_EMAILS || "").split(",").map(email => email.trim().toLowerCase()).filter(Boolean);
            return Boolean(user?.email && allowedEmails.includes(user.email.toLowerCase()));
        },
    },
    session: {
        strategy: "jwt",
    },
};
