import { z } from "zod";
export const realisationPhotoSchema = z.object({
    url: z.string().max(2000).refine(value => /^https:\/\//.test(value) || /^\/(?!\/)/.test(value), "L’image doit utiliser une URL HTTPS ou un chemin local."),
    alt: z.string().trim().max(200, "La légende est limitée à 200 caractères.").default(""),
    role: z.enum(["gallery", "before", "after"]).default("gallery"),
});
const completionDate = z.string().refine(value => {
    if (!value)
        return true;
    return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}, "La date du chantier est invalide.");
export const realisationFieldsSchema = z.object({
    title: z.string().trim().min(2, "Donnez un titre à cette réalisation.").max(120, "Le titre est limité à 120 caractères."),
    description: z.string().trim().min(1, "Décrivez les travaux réalisés.").max(5000, "La description est limitée à 5 000 caractères."),
    category: z.string().trim().min(1, "Choisissez un métier.").max(60),
    location: z.string().trim().max(100).default(""),
    completedAt: completionDate.default(""),
    images: z.array(realisationPhotoSchema).max(20, "Une réalisation peut contenir jusqu’à 20 photos.").default([]),
    active: z.boolean().default(false),
    featured: z.boolean().default(false),
    order: z.coerce.number().int().min(0).max(9999).default(0),
});
export const realisationSchema = realisationFieldsSchema.refine(value => !value.active || value.images.length > 0, {
    message: "Ajoutez au moins une photo avant de publier la réalisation.", path: ["images"],
});
export type RealisationFields = z.infer<typeof realisationFieldsSchema>;
export type RealisationPhoto = z.infer<typeof realisationPhotoSchema>;
export type RealisationItem = Omit<RealisationFields, "completedAt"> & {
    id: string;
    completedAt: string | null;
};
export function realisationPhotos(images: unknown): RealisationPhoto[] {
    const result = z.array(realisationPhotoSchema).safeParse(images);
    return result.success ? result.data : [];
}
export function completionDateLabel(date?: string | null) {
    return date ? new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(date)) : "";
}
