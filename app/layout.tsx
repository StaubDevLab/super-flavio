import type { Metadata } from "next";
import React, { Suspense } from 'react';
import GoogleAnalytics from '@/components/google-analytics/GoogleAnalytics';
import CookieBanner from '@/components/cookie-banner/CookieBanner';
import { Poppins } from "next/font/google";
import "./globals.css";
import Bandeau from "@/components/bandeau/bandeau";
import AuthProvider from "@/providers/auth-provider";
import QueryProvider from "@/providers/query-provider";
import Footer from "@/components/footer/footer";
import ReduxProvider from "@/providers/redux-provider";
const poppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });
export const metadata: Metadata = {
    title: "Super Flavio | Artisan multi-services en Corrèze",
    description: "Plomberie, rénovation et petits travaux : Super Flavio, votre artisan de proximité à Tulle, Brive et en Corrèze.",
};
export default function RootLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return (<html lang="fr" suppressHydrationWarning>
        <Suspense fallback={null}>
            <GoogleAnalytics GA_MEASUREMENT_ID='G-QJRM2V7YMT' />
        </Suspense>
        <body className={`flex flex-col  min-h-screen ${poppins.className}`}>
            <QueryProvider>
                <AuthProvider>
                    <ReduxProvider>
                        <Bandeau />
                        {children}
                        <Footer />
                        <CookieBanner />
                    </ReduxProvider>
                </AuthProvider>
            </QueryProvider>
        </body>
    </html>);
}
