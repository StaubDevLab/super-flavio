import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { canManageServices } from "@/lib/service-access";
import { realisationFieldsSchema, realisationSchema } from "@/lib/realisations";
import { realisationData, realisationApiError } from "@/lib/realisation-api";
export async function PATCH(req: Request, { params }: {
    params: {
        id: string;
    };
}) {
    try {
        if (!canManageServices(await getServerSession(authOptions)))
            return NextResponse.json({ message: "Accès non autorisé." }, { status: 403 });
        const patch = realisationFieldsSchema.partial().safeParse(await req.json());
        if (!patch.success || !Object.keys(patch.data).length)
            return NextResponse.json({ message: patch.success ? "Aucun champ à modifier." : patch.error.issues[0].message }, { status: 400 });
        const existing = await prisma.realisation.findUnique({ where: { id: params.id } });
        if (!existing)
            return NextResponse.json({ message: "Réalisation introuvable." }, { status: 404 });
        const result = realisationSchema.safeParse({ ...existing, completedAt: existing.completedAt?.toISOString().slice(0, 10) || "", ...patch.data });
        if (!result.success)
            return NextResponse.json({ message: result.error.issues[0].message }, { status: 400 });
        // Écrire uniquement les champs reçus, pour préserver les modifications simultanées.
        const data = { ...patch.data, ...("completedAt" in patch.data ? { completedAt: realisationData(result.data).completedAt } : {}) };
        const realisation = await prisma.realisation.update({ where: { id: params.id }, data });
        return NextResponse.json({ realisation, message: "Réalisation mise à jour." });
    }
    catch (error) {
        return realisationApiError(error);
    }
}
export async function DELETE(req: Request, { params }: {
    params: {
        id: string;
    };
}) {
    try {
        if (!canManageServices(await getServerSession(authOptions)))
            return NextResponse.json({ message: "Accès non autorisé." }, { status: 403 });
        await prisma.realisation.delete({ where: { id: params.id } });
        return NextResponse.json({ message: "Réalisation supprimée." });
    }
    catch (error) {
        return realisationApiError(error);
    }
}
