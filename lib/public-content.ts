import { Prisma } from "@prisma/client";
import { cache } from "react";
import prisma from "@/lib/db";
import { realisationPhotos } from "@/lib/realisations";

export const getPublicServices = cache(() => prisma.service.findMany({
    where: { active: true }, orderBy: [{ order: "asc" }, { createdAt: "asc" }],
}));
export const getPublicService = cache((slug: string) => prisma.service.findFirst({ where: { slug, active: true } }));
export const getPublicRealisations = cache(async () => {
    try {
    const projects = await prisma.realisation.findMany({ where: { active: true }, orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }] });
    return projects.map(project => ({ ...project, images: realisationPhotos(project.images), completedAt: project.completedAt?.toISOString() || null }));
    } catch (error) {
        // Preserve the public gallery during deployment before its migration.
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2021") return [];
        throw error;
    }
});
