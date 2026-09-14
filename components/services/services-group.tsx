'use client';
import { useState } from "react";
import ServiceSingle from "./service-single";
import { useServices } from "@/utils/queries/useServices";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function ServicesGroup({ params, full = false }: {
    params: {};
    full?: boolean;
}) {
    const { data: services, isPending, isError, refetch } = useServices();
    const [category, setCategory] = useState("Tous");
    const visible = (services || []).filter(service => service.active);
    const categories = ["Tous", ...Array.from(new Set(visible.map(service => service.category || "Plomberie")))];
    const filtered = visible.filter(service => category === "Tous" || (service.category || "Plomberie") === category);
    const displayed = full ? filtered : [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order).slice(0, 6);
    return <section id="services" className="site-container w-full py-16 lg:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div>
                <p className="eyebrow">LES SERVICES</p>
                {full ? <h1 className="section-title">Un savoir-faire pour chaque besoin.</h1> : <h2 className="section-title">Une maison, mille projets.</h2>}
                <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">Entretenir, réparer, transformer. Retrouvez les prestations de Super Flavio et parlons de ce dont vous avez besoin.</p>
            </div>
            {!full && <Link href="/services" className="text-sm font-semibold flex items-center gap-2 whitespace-nowrap text-primary">Tous les services <ArrowUpRight size={18} />
            </Link>}
        </div>
        {categories.length > 2 && <div className="mt-8 flex flex-wrap gap-2" aria-label="Filtrer les services par métier">
            {categories.map(item =>
                <button key={item} onClick={() => setCategory(item)} aria-pressed={item === category} className={`rounded-full px-5 py-2 text-sm border transition-colors ${item === category ? "bg-[#234b32] text-white border-[#234b32]" : "bg-white border-black/10 hover:border-primary"}`}>
                    {item}
                </button>)}
        </div>}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isPending ? Array.from({ length: 3 }, (_, i) =>
                <div key={i} className="h-80 animate-pulse rounded-2xl bg-muted" aria-label="Chargement des services" />) : displayed.map(service =>
                    <ServiceSingle key={service.id} service={service} />)}
        </div>
        {isError && <div className="rounded-2xl border bg-white p-8 text-center">
            <p>Les services ne peuvent pas être chargés pour le moment.</p>
            <Button variant="outline" className="mt-4" onClick={() => refetch()}>Réessayer</Button>
        </div>}
        {!isPending && !isError && !displayed.length && <div className="rounded-2xl border bg-white p-8 text-center">
            <p className="text-muted-foreground">Les prestations seront bientôt disponibles ici.</p>
            <Link href="/contact" className="inline-flex mt-4 text-primary">Contactez Super Flavio pour votre projet <ArrowUpRight size={18} />
            </Link>
        </div>}
    </section>;
}
