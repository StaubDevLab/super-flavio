import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/providers/theme-provider";
import Bandeau from "@/components/bandeau/bandeau";


const inter = Inter({subsets: ["latin"]});

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

        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange

        >
            <Bandeau/>
            {children}
        </ThemeProvider>
        </body>

        </html>
    );
}
