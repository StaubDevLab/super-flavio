'use client';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import { close as closeDialog, open as openDialog } from "@/stores/dialog-slice";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState, type ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema, serviceCategories, type ServiceFields, plainText } from "@/lib/services";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/providers/query-provider";
import { toast } from "@/components/ui/use-toast";
import dynamic from "next/dynamic";
import uploadFile from "@/utils/upload-image";
import supabase from "@/lib/storage";
import type { Service } from "@prisma/client";
import ServiceSingle from "@/components/services/service-single";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const defaults: ServiceFields = { title: "", shortDescription: "", description: "", category: "Plomberie", featured: false, active: true, order: 0, image: "", imageAlternatif: "", priceLabel: "", prestations: "" };
const modules = { toolbar: [["bold", "italic"], [{ header: [2, 3, false] }], [{ list: "ordered" }, { list: "bullet" }], ["clean"]] };
export default function UpdateService() {
    const dispatch = useDispatch();
    const { open, service } = useSelector((state: {
        dialog: {
            open: boolean;
            service?: Service;
        };
    }) => state.dialog);
    const [imageLoading, setImageLoading] = useState(false);
    const [failure, setFailure] = useState("");
    const { register, control, reset, setValue, watch, handleSubmit, formState: { errors } } = useForm<ServiceFields>({ resolver: zodResolver(serviceSchema), defaultValues: defaults });
    const values = watch();
    useEffect(() => {
        if (open) {
            reset(service ? { ...defaults, ...service, category: service.category || "Plomberie", shortDescription: plainText(service.shortDescription) } : defaults);
            setFailure("");
        }
    }, [service, open, reset]);
    const save = useMutation({
        mutationFn: (data: ServiceFields) => service ? axios.patch(`/api/services/${service.id}`, data) : axios.post("/api/services", data), onSuccess: async () => {
            await Promise.all([queryClient.invalidateQueries({ queryKey: ['services'] }), queryClient.invalidateQueries({ queryKey: ['service'] })]);
            toast({ description: service ? "Service mis à jour." : "Service créé." });
            dispatch(closeDialog());
        }
    });
    async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file)
            return;
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
            setFailure("Choisissez une image JPG, PNG ou WebP de moins de 5 Mo.");
            event.target.value = "";
            return;
        }
        setImageLoading(true);
        setFailure("");
        try {
            const image = await uploadFile(file);
            const url = supabase.storage.from('images').getPublicUrl(image.path).data.publicUrl;
            setValue("image", url, { shouldValidate: true });
        }
        catch {
            setFailure("L’image n’a pas pu être chargée. Réessayez.");
        }
        finally {
            setImageLoading(false);
            event.target.value = "";
        }
    }
    async function onSubmit(data: ServiceFields) {
        setFailure("");
        try {
            await save.mutateAsync(data);
        }
        catch (error) {
            setFailure(axios.isAxiosError(error) ? error.response?.data?.message || "Connexion impossible. Réessayez." : "Impossible d’enregistrer le service.");
        }
    }
    const busy = imageLoading || save.isPending;
    const preview = { ...values, id: service?.id || "preview", slug: service?.slug || "apercu", createdAt: service?.createdAt || new Date() } as Service;
    return <Dialog open={open} onOpenChange={next => {
        if (!busy)
            dispatch(next ? openDialog(service) : closeDialog());
    }}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <DialogHeader>
                <DialogTitle className="text-2xl">
                    {service ? "Modifier le service" : "Créer un service"}
                </DialogTitle>
                <DialogDescription>Présentez votre savoir-faire, puis choisissez comment le publier.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 mt-6">
                    <fieldset disabled={busy} className="space-y-5 min-w-0">
                        <div>
                            <Label htmlFor="service-title">Nom du service *</Label>
                            <Input id="service-title" className="mt-2" placeholder="Ex. Installation et rénovation électrique" {...register("title")} />
                            {errors.title && <p className="text-destructive text-xs mt-1">
                                {errors.title.message}
                            </p>}
                        </div>
                        <div>
                            <Label htmlFor="service-category">Métier *</Label>
                            <Input id="service-category" list="service-categories" className="mt-2" {...register("category")} />
                            <datalist id="service-categories">
                                {serviceCategories.map(category =>
                                    <option key={category} value={category} />)}
                            </datalist>
                            <p className="text-xs text-muted-foreground mt-1">Choisissez un métier ou saisissez une nouvelle catégorie.</p>
                            {errors.category && <p className="text-destructive text-xs">
                                {errors.category.message}
                            </p>}
                        </div>
                        <div>
                            <Label htmlFor="service-summary">Résumé pour la carte *</Label>
                            <Textarea id="service-summary" rows={3} className="mt-2" placeholder="Votre service en deux ou trois phrases." {...register("shortDescription")} />
                            {errors.shortDescription && <p className="text-destructive text-xs mt-1">
                                {errors.shortDescription.message}
                            </p>}
                        </div>
                        <div>
                            <Label>Description détaillée *</Label>
                            <div className="mt-2 bg-white">
                                <Controller name="description" control={control} render={({ field }) =>
                                    <ReactQuill theme="snow" modules={modules} value={field.value} onChange={field.onChange} placeholder="Décrivez votre intervention et son intérêt pour le client." />} />
                            </div>
                            {errors.description && <p className="text-destructive text-xs mt-1">
                                {errors.description.message}
                            </p>}
                        </div>
                        <div>
                            <Label htmlFor="service-prestations">Prestations incluses</Label>
                            <Textarea id="service-prestations" className="mt-2" rows={4} placeholder={'Une prestation par ligne\nInstallation de prises\nRemplacement de luminaires'} {...register("prestations")} />
                            <p className="text-xs text-muted-foreground mt-1">Une ligne par prestation, affichée sur la page du service.</p>
                            {errors.prestations && <p className="text-destructive text-xs">
                                {errors.prestations.message}
                            </p>}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="service-price">Tarif indicatif (facultatif)</Label>
                                <Input id="service-price" className="mt-2" placeholder="Ex. Sur devis" {...register("priceLabel")} />
                                {errors.priceLabel && <p className="text-destructive text-xs">
                                    {errors.priceLabel.message}
                                </p>}
                            </div>
                            <div>
                                <Label htmlFor="service-order">Ordre d’affichage</Label>
                                <Input id="service-order" type="number" min={0} max={9999} className="mt-2" {...register("order", { valueAsNumber: true })} />
                                <p className="text-xs text-muted-foreground mt-1">Les plus petits numéros apparaissent en premier.</p>
                                {errors.order && <p className="text-destructive text-xs">
                                    {errors.order.message}
                                </p>}
                            </div>
                        </div>
                        <div className="rounded-xl bg-muted/60 p-4 space-y-4">
                            <Controller name="active" control={control} render={({ field }) =>
                                <div className="flex justify-between items-center gap-4">
                                    <div>
                                        <Label htmlFor="service-active">Publier le service</Label>
                                        <p className="text-xs text-muted-foreground mt-1">Visible sur le site. Désactivez pour garder un brouillon.</p>
                                    </div>
                                    <Switch id="service-active" checked={field.value} onCheckedChange={field.onChange} />
                                </div>} />
                            <Controller name="featured" control={control} render={({ field }) =>
                                <div className="flex justify-between items-center gap-4">
                                    <div>
                                        <Label htmlFor="service-featured">Mettre en avant</Label>
                                        <p className="text-xs text-muted-foreground mt-1">Prioritaire sur la page d’accueil.</p>
                                    </div>
                                    <Switch id="service-featured" checked={field.value} onCheckedChange={field.onChange} />
                                </div>} />
                        </div>
                    </fieldset>
                    <div className="min-w-0 space-y-5">
                        <fieldset disabled={busy} className="rounded-xl border bg-white p-5 space-y-4">
                            <h3 className="font-semibold text-sm">Photo du service</h3>
                            <div>
                                <Label htmlFor="service-image">Ajouter ou remplacer la photo</Label>
                                <Input id="service-image" type="file" accept="image/jpeg,image/png,image/webp" className="mt-2 file:text-foreground file:mr-3" onChange={handleFileChange} />
                                <p className="text-xs text-muted-foreground mt-1">JPG, PNG ou WebP · 5 Mo maximum</p>
                            </div>
                            {values.image && <Button type="button" variant="outline" size="sm" onClick={() => setValue("image", "")}>Retirer la photo</Button>}
                            <div>
                                <Label htmlFor="service-alt">Description de la photo</Label>
                                <Input id="service-alt" className="mt-2" placeholder="Ex. Pose de carrelage dans une salle de bain" {...register("imageAlternatif")} />
                                <p className="text-xs text-muted-foreground mt-1">Pour l’accessibilité et le référencement.</p>
                                {errors.imageAlternatif && <p className="text-destructive text-xs">
                                    {errors.imageAlternatif.message}
                                </p>}
                            </div>
                            {errors.image && <p className="text-destructive text-xs">
                                {errors.image.message}
                            </p>}
                        </fieldset>
                        <div>
                            <p className="eyebrow mb-3">APERÇU DE LA CARTE</p>
                            <div className="pointer-events-none" {...{ inert: "" }}>
                                <ServiceSingle service={{ ...preview, title: values.title || "Nom de votre service" }} />
                            </div>
                            <p className="mt-3 text-xs text-muted-foreground">L’aperçu se met à jour pendant votre saisie.</p>
                        </div>
                    </div>
                </div>
                {failure && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-destructive">
                    {failure}
                </p>}
                <DialogFooter className="mt-7 border-t pt-5">
                    <Button type="button" variant="outline" disabled={busy} onClick={() => dispatch(closeDialog())}>Annuler</Button>
                    <Button type="submit" disabled={busy}>
                        {imageLoading ? "Chargement de la photo…" : save.isPending ? "Enregistrement…" : values.active ? "Enregistrer et publier" : "Enregistrer le brouillon"}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>;
}
