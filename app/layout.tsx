import type { Metadata } from "next";
import { siteUrl, siteDescription, businessData, jsonLd } from "@/lib/seo";
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
    metadataBase: new URL(siteUrl),
    title: { default: "Super Flavio | Artisan multi-services en Corrèze", template: "%s | Super Flavio" },
    description: siteDescription,
    icons: { icon: "/assets/logo.png", apple: "/assets/logo.png" },
    robots: { index: true, follow: true },
};
export default function RootLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return (<html lang="fr" suppressHydrationWarning>
        <body className={`flex flex-col min-h-screen ${poppins.className}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessData) }} />
        <Suspense fallback={null}>
            <GoogleAnalytics GA_MEASUREMENT_ID='G-QJRM2V7YMT' />
        </Suspense>

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
