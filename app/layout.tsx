import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import Bandeau from "@/components/bandeau/bandeau";
import AuthProvider from "@/providers/auth-provider";
import QueryProvider from "@/providers/query-provider";


const poppins = Poppins({weight: "500", subsets: ["latin"]});

export const metadata: Metadata = {
    title: "SuperFlavio Plomberie",
    description: "Votre plombier de proximité sur la Corrèze.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" suppressHydrationWarning>

        <body className={poppins.className}>
        <QueryProvider>
            <AuthProvider>
                <Bandeau/>
                {children}
            </AuthProvider>
        </QueryProvider>
        </body>

        </html>
    );
}
