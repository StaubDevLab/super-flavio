import { z } from "zod";
export const serviceCategories = ["Plomberie", "Électricité", "Peinture", "Placo", "Charpenterie", "Climatisation", "Carrelage", "Autre"];
export function plainText(value?: string | null) {
    return (value || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}
const richText = z.string().max(30000).refine(value => plainText(value).length > 0, "La description est obligatoire.");
export const serviceSchema = z.object({
    title: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères.").max(100),
    shortDescription: richText,
    description: richText,
    category: z.string().trim().min(1).max(60).default("Plomberie"),
    featured: z.boolean().default(false),
    active: z.boolean().default(true),
    order: z.coerce.number().int().min(0).max(9999).default(0),
    priceLabel: z.string().trim().max(100).nullable().optional(),
    prestations: z.string().trim().max(3000).nullable().optional(),
    image: z.string().max(2000).nullable().optional().refine(value => !value || /^https:\/\//.test(value) || /^\/(?!\/)/.test(value), "L’image doit être une URL HTTPS ou un chemin local."),
    imageAlternatif: z.string().trim().max(200).nullable().optional(),
});
export type ServiceFields = z.infer<typeof serviceSchema>;
