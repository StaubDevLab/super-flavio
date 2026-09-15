import type { Metadata } from "next";

const configuredUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_URL_DOMAIN || "https://superflavioplomberie.fr";
export const siteUrl = new URL(configuredUrl.includes("://") ? configuredUrl : `https://${configuredUrl}`).origin;
export const siteName = "Super Flavio";
export const siteDescription = "Artisan multi-services en Corrèze : plomberie, électricité, peinture et rénovation. Dépannage à Tulle et Brive-la-Gaillarde, chantiers dans les environs.";
export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).toString();
export function pageMetadata(title: string, description: string, path: string): Metadata {
    return {
        title, description, alternates: { canonical: absoluteUrl(path) },
        openGraph: { type: "website", locale: "fr_FR", siteName, title: `${title} | ${siteName}`, description, url: absoluteUrl(path), images: [{ url: absoluteUrl("/assets/hero-renovation.jpg"), alt: "Travaux de rénovation — Super Flavio" }] },
        twitter: { card: "summary_large_image", title: `${title} | ${siteName}`, description, images: [absoluteUrl("/assets/hero-renovation.jpg")] },
    };
}
export function jsonLd(value: unknown) {
    return JSON.stringify(value).replace(/</g, "\\u003c");
}
export const businessData = {
    "@context": "https://schema.org", "@type": "Organization", "@id": absoluteUrl("/#business"),
    name: siteName, url: siteUrl, logo: absoluteUrl("/assets/logo.png"), description: siteDescription,
    telephone: process.env.NEXT_PUBLIC_PHONE || undefined, email: process.env.NEXT_PUBLIC_EMAIL || undefined,
    areaServed: ["Tulle", "Brive-la-Gaillarde", "Corrèze"],
};
