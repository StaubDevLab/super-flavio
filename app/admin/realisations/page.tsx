'use client';
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, Camera, Star, ArrowUpRight } from "lucide-react";
import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";
import RealisationEditor from "@/components/admin/realisations/RealisationEditor";
import { useRealisations } from "@/utils/queries/useRealisations";
import { completionDateLabel, type RealisationItem } from "@/lib/realisations";
export default function AdminRealisationsPage() {
    const router = useRouter();
    const session = useSession({ required: true, onUnauthenticated: () => router.push('/api/auth/signin') });
    const cache = useQueryClient();
    const { data: projects = [], isPending, isError, error, refetch } = useRealisations(true, session.status === 'authenticated');
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Tous");
    const [status, setStatus] = useState("Tous");
    const [editorOpen, setEditorOpen] = useState(false);
    const [editing, setEditing] = useState<RealisationItem | null>(null);
    const [deleting, setDeleting] = useState<RealisationItem | null>(null);
    const [deleteFailure, setDeleteFailure] = useState("");
    async function refresh() { await cache.invalidateQueries({ queryKey: ['realisations'] }); }
    const update = useMutation({
        mutationFn: ({ id, active }: {
            id: string;
            active: boolean;
        }) => axios.patch(`/api/realisations/${id}`, { active }), onSuccess: refresh, onError: error => toast({ variant: 'destructive', description: axios.isAxiosError(error) ? error.response?.data?.message || 'Impossible de modifier la publication.' : 'Impossible de modifier la publication.' })
    });
    const remove = useMutation({ mutationFn: (id: string) => axios.delete(`/api/realisations/${id}`) });
    const categories = Array.from(new Set(projects.map(project => project.category)));
    const filtered = projects.filter(project => `${project.title} ${project.category} ${project.location}`.toLocaleLowerCase('fr').includes(search.toLocaleLowerCase('fr')) && (category === 'Tous' || category === project.category) && (status === 'Tous' || (status === 'Publiés' ? project.active : !project.active)));
    function edit(project: RealisationItem | null) { setEditing(project); setEditorOpen(true); }
    async function deleteProject() {
        if (!deleting)
            return;
        setDeleteFailure("");
        try {
            await remove.mutateAsync(deleting.id);
            await refresh();
            setDeleting(null);
            toast({ description: 'Réalisation supprimée.' });
        }
        catch (error) {
            setDeleteFailure(axios.isAxiosError(error) ? error.response?.data?.message || 'Impossible de supprimer la réalisation.' : 'Impossible de supprimer la réalisation.');
        }
    }
    return <>
        <Header />
        <main className="site-container flex-grow py-12">
            <Link href="/admin" className="text-sm text-muted-foreground">← Votre espace artisan</Link>
            <div className="mt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                <div>
                    <p className="eyebrow">VOTRE PORTFOLIO</p>
                    <h1 className="section-title">Gérer vos réalisations</h1>
                    <p className="mt-3 text-sm text-muted-foreground">Montrez vos chantiers et faites vivre votre galerie de photos.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Link className="btn-outline" href="/realisations">Voir la galerie <ArrowUpRight size={16} />
                    </Link>
                    <Button className="h-auto py-3.5" disabled={session.status !== 'authenticated'} onClick={() => edit(null)}>
                        <Plus size={16} className="mr-2" />Créer une réalisation</Button>
                </div>
            </div>
            {session.status === 'authenticated' && <>
                {!isPending && !isError && <div className="grid sm:grid-cols-3 gap-4 my-8">
                    {[['Réalisations', projects.length], ['Publiées', projects.filter(project => project.active).length], ['Mises en avant', projects.filter(project => project.active && project.featured).length]].map(([label, count]) =>
                        <div key={label} className="rounded-xl border bg-white p-5">
                            <p className="text-3xl font-semibold">
                                {count}
                            </p>
                            <p className="mt-2 text-xs text-muted-foreground">
                                {label}
                            </p>
                        </div>)}
                </div>}
                <div className="my-6 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search size={17} className="absolute left-3 top-3 text-muted-foreground" />
                        <Input aria-label="Rechercher une réalisation" placeholder="Rechercher un chantier, un métier ou une commune…" className="pl-10 bg-white" value={search} onChange={event => setSearch(event.target.value)} />
                    </div>
                    <select aria-label="Filtrer les réalisations par métier" value={category} onChange={event => setCategory(event.target.value)} className="h-10 rounded-lg border bg-white px-3 text-sm">
                        <option value="Tous">Tous les métiers</option>
                        {categories.map(item =>
                            <option key={item}>
                                {item}
                            </option>)}
                    </select>
                    <select aria-label="Filtrer les réalisations par publication" value={status} onChange={event => setStatus(event.target.value)} className="h-10 rounded-lg border bg-white px-3 text-sm">
                        <option value="Tous">Tous les statuts</option>
                        <option>Publiés</option>
                        <option>Brouillons</option>
                    </select>
                </div>
                {isPending ? <p role="status" className="p-10 text-center text-muted-foreground">Chargement des réalisations…</p> : isError ? <div role="alert" className="rounded-xl border bg-white p-8 text-center">
                    <p>
                        {axios.isAxiosError(error) ? error.response?.data?.message || 'Impossible de charger les réalisations.' : 'Impossible de charger les réalisations.'}
                    </p>
                    <Button variant="outline" className="mt-4" onClick={() => refetch()}>Réessayer</Button>
                </div> : <>
                    <p aria-live="polite" className="text-xs text-muted-foreground mb-3">
                        {filtered.length} réalisation(s) affichée(s)</p>
                    <div className="space-y-4">
                        {filtered.map(project =>
                            <article key={project.id} className="flex flex-col md:flex-row gap-5 md:items-center rounded-xl border bg-white p-5">
                                <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-muted">
                                    {project.images[0] ? <Image src={project.images[0].url} alt={project.images[0].alt || project.title} fill sizes="128px" className="object-cover" /> : <Camera size={26} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h2 className="font-semibold">
                                            {project.title}
                                        </h2>
                                        {project.featured && <Star size={14} className="text-primary" aria-label="Mise en avant" />}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {[project.category, project.location, completionDateLabel(project.completedAt)].filter(Boolean).join(' · ')}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {project.images.length} photo(s) · Ordre {project.order}
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <Switch aria-label={`Publier ${project.title}`} checked={project.active} disabled={update.isPending} onCheckedChange={active => update.mutate({ id: project.id, active })} />
                                    <span className="text-xs">
                                        {project.active ? 'Publié' : 'Brouillon'}
                                    </span>
                                    <Button size="sm" variant="outline" onClick={() => edit(project)}>Modifier</Button>
                                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => { setDeleting(project); setDeleteFailure(''); }}>Supprimer</Button>
                                </div>
                            </article>)}
                    </div>
                    {!filtered.length && <div className="rounded-xl border bg-white p-10 text-center">
                        <Camera size={30} className="text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">
                            {projects.length ? 'Aucun chantier ne correspond à vos filtres.' : 'Ajoutez votre premier chantier pour commencer la galerie.'}
                        </p>
                        {!projects.length && <Button className="mt-5" onClick={() => edit(null)}>Créer une réalisation</Button>}
                    </div>}
                </>}
                <RealisationEditor open={editorOpen} project={editing} onClose={() => setEditorOpen(false)} onSaved={async () => { await refresh(); toast({ description: editing ? 'Réalisation mise à jour.' : 'Réalisation créée.' }); }} />
            </>}
            <AlertDialog open={Boolean(deleting)} onOpenChange={open => {
                if (!open && !remove.isPending)
                    setDeleting(null);
            }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer cette réalisation ?</AlertDialogTitle>
                        <AlertDialogDescription>« {deleting?.title} » sera retirée définitivement du portfolio. Pour simplement la masquer, désactivez sa publication.</AlertDialogDescription>
                    </AlertDialogHeader>
                    {deleteFailure && <p role="alert" className="text-sm text-destructive">
                        {deleteFailure}
                    </p>}
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={remove.isPending}>Annuler</AlertDialogCancel>
                        <Button variant="destructive" disabled={remove.isPending} onClick={deleteProject}>
                            {remove.isPending ? 'Suppression…' : 'Supprimer'}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Toaster />
        </main>
    </>;
}
