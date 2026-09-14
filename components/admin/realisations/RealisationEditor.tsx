'use client';
import { useEffect, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { ArrowUp, ArrowDown, Trash2, ImagePlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { realisationSchema, type RealisationFields, type RealisationItem, type RealisationPhoto } from "@/lib/realisations";
import { serviceCategories } from "@/lib/services";
import uploadFile from "@/utils/upload-image";
import supabase from "@/lib/storage";
const defaults: RealisationFields = { title: "", description: "", category: "Plomberie", location: "", completedAt: "", images: [], active: false, featured: false, order: 0 };
export default function RealisationEditor({ open, project, onClose, onSaved }: {
    open: boolean;
    project: RealisationItem | null;
    onClose: () => void;
    onSaved: () => Promise<void>;
}) {
    const [uploading, setUploading] = useState(false);
    const [failure, setFailure] = useState("");
    const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm<RealisationFields>({ resolver: zodResolver(realisationSchema), defaultValues: defaults });
    const values = watch();
    const busy = uploading || isSubmitting;
    useEffect(() => {
        if (open) {
            reset(project ? { ...project, completedAt: project.completedAt?.slice(0, 10) || "" } : defaults);
            setFailure("");
        }
    }, [open, project, reset]);
    function updatePhotos(photos: RealisationPhoto[]) { setValue('images', photos, { shouldDirty: true, shouldValidate: true }); }
    function changePhoto(index: number, patch: Partial<RealisationPhoto>) { updatePhotos(values.images.map((photo, i) => i === index ? { ...photo, ...patch } : photo)); }
    function movePhoto(index: number, direction: number) {
        const next = [...values.images];
        [next[index], next[index + direction]] = [next[index + direction], next[index]];
        updatePhotos(next);
    }
    async function addPhotos(event: ChangeEvent<HTMLInputElement>) {
        const input = event.currentTarget;
        const files = Array.from(input.files || []);
        input.value = "";
        if (!files.length)
            return;
        if (values.images.length + files.length > 20) {
            setFailure("Vous pouvez ajouter au maximum 20 photos par réalisation.");
            return;
        }
        if (files.some(file => !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024)) {
            setFailure("Chaque photo doit être un JPG, PNG ou WebP de moins de 5 Mo.");
            return;
        }
        setUploading(true);
        setFailure("");
        try {
            const results = await Promise.allSettled(files.map(async (file) => {
                const result = await uploadFile(file);
                return { url: supabase.storage.from('images').getPublicUrl(result.path).data.publicUrl, alt: "", role: 'gallery' as const };
            }));
            const uploaded = results.flatMap(result => result.status === 'fulfilled' ? [result.value] : []);
            updatePhotos([...values.images, ...uploaded]);
            if (results.some(result => result.status === 'rejected'))
                setFailure("Certaines photos n’ont pas pu être chargées. Les autres ont été conservées ; réessayez pour les photos manquantes.");
        }
        finally {
            setUploading(false);
        }
    }
    async function save(data: RealisationFields) {
        setFailure("");
        try {
            if (project)
                await axios.patch(`/api/realisations/${project.id}`, data);
            else
                await axios.post('/api/realisations', data);
            await onSaved();
            onClose();
        }
        catch (error) {
            setFailure(axios.isAxiosError(error) ? error.response?.data?.message || "Connexion impossible. Réessayez." : "Impossible d’enregistrer cette réalisation.");
        }
    }
    return <Dialog open={open} onOpenChange={next => {
        if (!next && !busy)
            onClose();
    }}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <DialogHeader>
                <DialogTitle className="text-2xl">
                    {project ? 'Modifier la réalisation' : 'Créer une réalisation'}
                </DialogTitle>
                <DialogDescription>Présentez un chantier et ses photos. Vous pouvez commencer par un brouillon.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(save)}>
                <fieldset disabled={busy} className="mt-6 grid lg:grid-cols-2 gap-8 min-w-0">
                    <div className="space-y-5 min-w-0">
                        <div>
                            <Label htmlFor="project-title">Titre du chantier *</Label>
                            <Input id="project-title" className="mt-2" placeholder="Ex. Rénovation d’une salle de bain" {...register('title')} />
                            {errors.title && <p className="text-xs text-destructive mt-1">
                                {errors.title.message}
                            </p>}
                        </div>
                        <div>
                            <Label htmlFor="project-category">Métier *</Label>
                            <Input id="project-category" className="mt-2" list="project-categories" {...register('category')} />
                            <datalist id="project-categories">
                                {serviceCategories.map(category =>
                                    <option key={category} value={category} />)}
                            </datalist>
                            {errors.category && <p className="text-xs text-destructive">
                                {errors.category.message}
                            </p>}
                        </div>
                        <div>
                            <Label htmlFor="project-description">Travaux réalisés *</Label>
                            <Textarea id="project-description" rows={6} className="mt-2" placeholder="Décrivez le besoin du client, votre intervention et le résultat." {...register('description')} />
                            {errors.description && <p className="text-xs text-destructive mt-1">
                                {errors.description.message}
                            </p>}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="project-location">Commune (facultatif)</Label>
                                <Input id="project-location" className="mt-2" placeholder="Ex. Tulle" {...register('location')} />
                                {errors.location && <p className="text-xs text-destructive">
                                    {errors.location.message}
                                </p>}
                            </div>
                            <div>
                                <Label htmlFor="project-date">Date de réalisation</Label>
                                <Input id="project-date" type="date" className="mt-2" {...register('completedAt')} />
                                {errors.completedAt && <p className="text-xs text-destructive">
                                    {errors.completedAt.message}
                                </p>}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="project-order">Ordre d’affichage</Label>
                            <Input id="project-order" type="number" min={0} max={9999} className="mt-2" {...register('order', { valueAsNumber: true })} />
                            <p className="text-xs text-muted-foreground mt-1">Les plus petits numéros apparaissent en premier.</p>
                            {errors.order && <p className="text-xs text-destructive">
                                {errors.order.message}
                            </p>}
                        </div>
                        <div className="rounded-xl bg-muted/60 p-4 space-y-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <Label htmlFor="project-active">Publier sur le site</Label>
                                    <p className="text-xs text-muted-foreground mt-1">Une photo est nécessaire pour publier.</p>
                                </div>
                                <Switch id="project-active" checked={values.active} onCheckedChange={value => setValue('active', value, { shouldDirty: true })} />
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <Label htmlFor="project-featured">Mettre en avant sur l’accueil</Label>
                                    <p className="text-xs text-muted-foreground mt-1">Prioritaire parmi les trois chantiers affichés.</p>
                                </div>
                                <Switch id="project-featured" checked={values.featured} onCheckedChange={value => setValue('featured', value, { shouldDirty: true })} />
                            </div>
                        </div>
                    </div>
                    <div className="min-w-0">
                        <div className="rounded-xl border bg-white p-5">
                            <h3 className="text-sm font-semibold flex items-center gap-2">
                                <ImagePlus size={18} className="text-primary" />Photos du chantier</h3>
                            <Label htmlFor="project-photos" className="block text-xs text-muted-foreground mt-3">Ajoutez plusieurs photos à la fois · JPG, PNG, WebP · 5 Mo par photo</Label>
                            <Input id="project-photos" type="file" multiple accept="image/jpeg,image/png,image/webp" className="mt-2 file:text-foreground file:mr-3" onChange={addPhotos} />
                            <p className="text-xs text-muted-foreground mt-3">La première photo sert de couverture. Utilisez les flèches pour changer l’ordre et les repères pour distinguer l’avant et l’après.</p>
                        </div>
                        {errors.images && <p role="alert" className="text-xs text-destructive mt-3">
                            {errors.images.message || errors.images.root?.message || "Vérifiez les photos et leurs légendes."}
                        </p>}
                        <div className="mt-4 space-y-4">
                            {values.images.map((photo, i) =>
                                <div key={`${photo.url}-${i}`} className="rounded-xl border bg-white p-4">
                                    <div className="flex items-start gap-4">
                                        <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                                            <Image src={photo.url} alt={photo.alt || `Photo ${i + 1}`} fill sizes="96px" className="object-cover" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-semibold mb-3">
                                                {i === 0 ? 'Photo de couverture' : `Photo ${i + 1}`}
                                            </p>
                                            <div className="flex gap-1">
                                                <Button type="button" size="icon" variant="outline" disabled={busy || i === 0} aria-label={`Monter la photo ${i + 1}`} onClick={() => movePhoto(i, -1)}>
                                                    <ArrowUp size={15} />
                                                </Button>
                                                <Button type="button" size="icon" variant="outline" disabled={busy || i === values.images.length - 1} aria-label={`Descendre la photo ${i + 1}`} onClick={() => movePhoto(i, 1)}>
                                                    <ArrowDown size={15} />
                                                </Button>
                                                <Button type="button" size="icon" variant="ghost" className="text-destructive" aria-label={`Retirer la photo ${i + 1}`} onClick={() => updatePhotos(values.images.filter((_, index) => index !== i))}>
                                                    <Trash2 size={15} />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <Label htmlFor={`photo-alt-${i}`} className="block mt-3">Légende / description de la photo</Label>
                                    <Input id={`photo-alt-${i}`} value={photo.alt} maxLength={200} className="mt-2" placeholder="Ex. Salle de bain après la pose du carrelage" onChange={event => changePhoto(i, { alt: event.target.value })} />
                                    <label htmlFor={`photo-role-${i}`} className="block mt-3 text-sm font-medium">Repère</label>
                                    <select id={`photo-role-${i}`} value={photo.role} onChange={event => changePhoto(i, { role: event.target.value as RealisationPhoto['role'] })} className="mt-2 w-full h-10 rounded-lg border bg-background px-3 text-sm">
                                        <option value="gallery">Photo du chantier</option>
                                        <option value="before">Avant les travaux</option>
                                        <option value="after">Après les travaux</option>
                                    </select>
                                </div>)}
                        </div>
                        {!values.images.length && <p className="text-sm text-muted-foreground text-center p-6">Aucune photo pour le moment.</p>}
                    </div>
                </fieldset>
                {failure && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-destructive">
                    {failure}
                </p>}
                <DialogFooter className="mt-7 border-t pt-5">
                    <Button type="button" variant="outline" disabled={busy} onClick={onClose}>Annuler</Button>
                    <Button type="submit" disabled={busy}>
                        {uploading ? 'Chargement des photos…' : isSubmitting ? 'Enregistrement…' : values.active ? 'Enregistrer et publier' : 'Enregistrer le brouillon'}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>;
}
