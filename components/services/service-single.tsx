import type { Service } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Wrench, Droplets, Zap, Paintbrush, Layers, Hammer, Wind, Grid } from "lucide-react";
import { plainText } from "@/lib/services";
const categoryIcons = {
    Plomberie: Droplets, Électricité: Zap, Peinture: Paintbrush,
    Placo: Layers, Charpenterie: Hammer, Climatisation: Wind, Carrelage: Grid,
};
export default function ServiceSingle({ service }: {
    service: Service;
}) {
    const Icon = categoryIcons[service.category as keyof typeof categoryIcons] || Wrench;
    return <Link href={`/services/${service.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5">
        <div className="relative aspect-[1.65] overflow-hidden bg-[#e8eee3]">
            {service.image ? <Image src={service.image} alt={service.imageAlternatif || service.title} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-primary">
                <Icon size={48} strokeWidth={1} />
            </div>}
            <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-medium">
                {service.category || "Plomberie"}
            </span>
            {service.featured && <span className="absolute bottom-3 left-4 rounded-full bg-[#234b32] px-3 py-1 text-[11px] text-white">À découvrir</span>}
        </div>
        <div className="flex flex-1 flex-col p-6">
            <h3 className="text-xl font-semibold tracking-tight">
                {service.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {plainText(service.shortDescription)}
            </p>
            <div className="mt-auto pt-6 flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                    {service.priceLabel || "Parlons de votre besoin"}
                </span>
                <span className="rounded-full bg-[#eef4e9] p-2 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <ArrowUpRight size={19} />
                </span>
            </div>
        </div>
    </Link>;
}
