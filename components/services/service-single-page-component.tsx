'use client';
import Image from "next/image";
import Link from "next/link";
import { useServiceBySlug } from "@/utils/queries/useServiceBySlug";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
export default function ServiceSinglePageComponent({ slug }: {
    slug: string;
}) {
    const { data: service, isPending, isError, refetch } = useServiceBySlug(slug);
    if (isPending)
        return <div className="site-container py-16">
            <div className="h-80 rounded-2xl animate-pulse bg-muted" role="status" aria-label="Chargement du service" />
        </div>;
    if (isError || !service)
        return <div className="site-container py-16 text-center">
            <h1 className="text-2xl font-semibold">Service indisponible</h1>
            <p className="mt-4 text-muted-foreground">Cette prestation n’est pas disponible pour le moment.</p>
            <Link href="/services" className="btn-outline mt-6">Retour aux services</Link>
            <button className="btn-outline ml-3" onClick={() => refetch()}>Réessayer</button>
        </div>;
    const prestations = (service.prestations || "").split('\n').map(item => item.trim()).filter(Boolean);
    return <main className="site-container py-12 lg:py-20">
        <Link href="/services" className="inline-flex gap-2 items-center text-sm text-muted-foreground mb-8">
            <ArrowLeft size={16} /> Tous les services</Link>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
                <p className="eyebrow">
                    {service.category || "Plomberie"}
                </p>
                <h1 className="section-title">
                    {service.title}
                </h1>
                <div className="quill-content mt-6 text-muted-foreground" dangerouslySetInnerHTML={{ __html: service.description || "" }} />
                {prestations.length > 0 && <div className="mt-8">
                    <h2 className="text-xl font-semibold">Ce que je vous propose</h2>
                    <ul className="mt-4 space-y-3">
                        {prestations.map((item, i) =>
                            <li key={i} className="flex gap-3 text-sm">
                                <Check size={18} className="text-primary shrink-0" />
                                {item}
                            </li>)}
                    </ul>
                </div>}
                <div className="mt-8 rounded-2xl bg-white border p-6">
                    {service.priceLabel && <p className="text-lg font-semibold mb-4">
                        {service.priceLabel}
                    </p>}
                    <p className="text-sm text-muted-foreground mb-5">Chaque projet est unique. Parlons de vos besoins pour définir une intervention adaptée.</p>
                    <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="btn-primary">Demander des renseignements <ArrowUpRight size={17} />
                    </Link>
                </div>
            </div>
            {service.image && <div className="relative aspect-square lg:sticky lg:top-8 self-start overflow-hidden rounded-3xl">
                <Image src={service.image} alt={service.imageAlternatif || service.title} fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover" />
            </div>}
        </div>
    </main>;
}
