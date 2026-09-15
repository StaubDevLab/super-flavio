import { notFound } from "next/navigation";
import ServiceSinglePageComponent from "@/components/services/service-single-page-component";
import Header from "@/components/header/Header";
import { getPublicService } from "@/lib/public-content";
import { absoluteUrl, pageMetadata, jsonLd } from "@/lib/seo";
import { plainText } from "@/lib/services";
export const dynamic = "force-dynamic";
type Props = { params: { slug: string } };
export async function generateMetadata({ params }: Props) {
    const service = await getPublicService(params.slug);
    if (!service) notFound();
    return pageMetadata(`${service.title} en Corrèze`, plainText(service.shortDescription || service.description).slice(0, 160), `/services/${encodeURIComponent(service.slug)}`);
}
export default async function SingleServicePage({ params }: Props) {
    const service = await getPublicService(params.slug);
    if (!service) notFound();
    const url = absoluteUrl(`/services/${encodeURIComponent(service.slug)}`);
    const data = { "@context": "https://schema.org", "@graph": [
        { "@type": "Service", name: service.title, description: plainText(service.description), url, serviceType: service.category, areaServed: "Corrèze", provider: { "@id": absoluteUrl("/#business") } },
        { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
            { "@type": "ListItem", position: 3, name: service.title, item: url },
        ] },
    ] };
    return <><Header /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} /><ServiceSinglePageComponent service={service} /></>;
}
