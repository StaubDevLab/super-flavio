'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Camera, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useRealisations } from "@/utils/queries/useRealisations";
import { completionDateLabel, type RealisationItem } from "@/lib/realisations";
import { Button } from "@/components/ui/button";
export default function RealisationsGroup({ full = false, initialData }: {
    full?: boolean;
    initialData?: RealisationItem[];
}) {
    const { data: projects = [], isPending, isError, refetch } = useRealisations(false, true, initialData);
    const [category, setCategory] = useState("Tous");
    const [selected, setSelected] = useState<RealisationItem | null>(null);
    const categories = ["Tous", ...Array.from(new Set(projects.map(project => project.category)))];
    const filtered = projects.filter(project => category === "Tous" || project.category === category);
    const displayed = full ? filtered : filtered.slice(0, 3);
    if (!full && !isPending && !isError && projects.length === 0) return null;
    if (!full && (isPending || isError)) return null;
    return <section id="realisations" className="w-full border-y border-black/5 bg-[#edf2e9]">
        <div className="site-container py-16 lg:py-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                <div>
                    <p className="eyebrow">LES RÉALISATIONS</p>
                    {full ? <h1 className="section-title">Des projets qui prennent vie.</h1> : <h2 className="section-title">Le savoir-faire, en images.</h2>}
                    <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">Des travaux du quotidien aux transformations de votre maison : découvrez les chantiers réalisés par Super Flavio.</p>
                </div>
                {!full && projects.length > 0 && <Link href="/realisations" className="flex items-center gap-2 text-sm font-semibold text-primary whitespace-nowrap">Toutes les réalisations <ArrowUpRight size={18} />
                </Link>}
            </div>
            {full && categories.length > 2 && <div className="mt-8 flex flex-wrap gap-2" aria-label="Filtrer les réalisations par métier">
                {categories.map(item =>
                    <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)} className={`rounded-full border px-5 py-2 text-sm ${category === item ? 'bg-[#234b32] text-white border-[#234b32]' : 'bg-white border-black/10'}`}>
                        {item}
                    </button>)}
            </div>}
            {isPending ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {[0, 1, 2].map(i =>
                    <div key={i} className="h-80 rounded-2xl animate-pulse bg-white/60" role="status" aria-label="Chargement des réalisations" />)}
            </div> : isError ? <div className="mt-8 rounded-2xl bg-white p-8 text-center">
                <p>Les réalisations ne peuvent pas être chargées pour le moment.</p>
                <Button variant="outline" className="mt-4" onClick={() => refetch()}>Réessayer</Button>
            </div> : displayed.length ?
                <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayed.map(project =>
                        <button key={project.id} onClick={() => setSelected(project)} className="group text-left rounded-2xl border border-black/5 bg-white overflow-hidden transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                            <div className="relative aspect-[1.35] bg-muted">
                                {project.images[0] ? <Image src={project.images[0].url} alt={project.images[0].alt || project.title} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw" className="object-cover" /> : <Camera className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" size={40} />}
                                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px]">
                                    {project.category}
                                </span>
                                {project.images.length > 1 && <span className="absolute bottom-4 right-4 rounded-full bg-[#203b2b]/90 px-3 py-1 text-xs text-white">
                                    {project.images.length} photos</span>}
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between gap-3">
                                    <h3 className="text-xl font-semibold tracking-tight">
                                        {project.title}
                                    </h3>
                                    <ArrowUpRight className="text-primary shrink-0" size={20} />
                                </div>
                                <p className="line-clamp-2 mt-3 text-sm text-muted-foreground leading-relaxed">
                                    {project.description}
                                </p>
                                {project.location && <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                                    <MapPin size={14} />
                                    {project.location}
                                </p>}
                            </div>
                        </button>)}
                </div> : <div className="mt-8 rounded-2xl border border-black/5 bg-white p-8 sm:p-10">
                    <Camera size={30} className="text-primary mb-4" />
                    <h3 className="font-semibold text-lg">Les chantiers arrivent bientôt ici.</h3>
                    <p className="mt-2 text-sm text-muted-foreground">En attendant les premières photos, parlons de ce que vous aimeriez réaliser chez vous.</p>
                    <Link href="/contact" className="inline-flex gap-2 items-center mt-5 text-sm font-semibold text-primary">Parlons de votre projet <ArrowUpRight size={16} />
                    </Link>
                </div>}
        </div>
        <Dialog open={Boolean(selected)} onOpenChange={open => {
            if (!open)
                setSelected(null);
        }}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
                {selected && <>
                    <DialogHeader>
                        <p className="eyebrow">
                            {selected.category}
                        </p>
                        <DialogTitle className="text-2xl sm:text-3xl tracking-tight">
                            {selected.title}
                        </DialogTitle>
                        <DialogDescription className="whitespace-pre-line leading-relaxed">
                            {selected.description}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        {selected.location && <span className="flex items-center gap-2">
                            <MapPin size={14} />
                            {selected.location}
                        </span>}{selected.completedAt && <span className="flex items-center gap-2">
                            <Calendar size={14} />
                            {completionDateLabel(selected.completedAt)}
                        </span>}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                        {selected.images.map((photo, i) =>
                            <figure key={`${photo.url}-${i}`} className="min-w-0">
                                <div className="relative aspect-[1.2] rounded-xl overflow-hidden bg-muted">
                                    <Image src={photo.url} alt={photo.alt || `${selected.title}, photo ${i + 1}`} fill sizes="(max-width: 640px) 85vw, 400px" className="object-contain" />
                                    {photo.role !== 'gallery' && <span className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 text-xs font-semibold">
                                        {photo.role === 'before' ? 'Avant' : 'Après'}
                                    </span>}
                                </div>
                                {photo.alt && <figcaption className="mt-2 text-xs text-muted-foreground">
                                    {photo.alt}
                                </figcaption>}
                            </figure>)}
                    </div>
                    <Link href="/contact" className="btn-primary self-start">Un projet similaire ? Parlons-en <ArrowUpRight size={17} />
                    </Link>
                </>}
            </DialogContent>
        </Dialog>
    </section>;
}
