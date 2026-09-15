import type { MetadataRoute } from "next";
import { getPublicServices } from "@/lib/public-content";
import { absoluteUrl } from "@/lib/seo";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const services = await getPublicServices();
    return ["/", "/services", "/realisations", "/contact", ...services.map(service => `/services/${encodeURIComponent(service.slug)}`)].map(path => ({ url: absoluteUrl(path) }));
}
