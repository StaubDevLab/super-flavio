import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { canManageServices } from "@/lib/service-access";
import { realisationSchema } from "@/lib/realisations";
import { realisationData, realisationApiError } from "@/lib/realisation-api";
import { Prisma } from "@prisma/client";
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
    const admin = new URL(req.url).searchParams.get("admin") === "1";
    try {
        if (admin && !canManageServices(await getServerSession(authOptions)))
            return NextResponse.json({ message: "Accès non autorisé." }, { status: 403 });
        const realisations = await prisma.realisation.findMany({
            where: admin ? {} : { active: true },
            orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
        });
        return NextResponse.json(realisations);
    }
    catch (error) {
        // La galerie publique reste disponible pendant un déploiement précédant la migration.
        if (!admin && error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2021")
            return NextResponse.json([]);
        return realisationApiError(error);
    }
}
export async function POST(req: Request) {
    try {
        if (!canManageServices(await getServerSession(authOptions)))
            return NextResponse.json({ message: "Accès non autorisé." }, { status: 403 });
        const result = realisationSchema.safeParse(await req.json());
        if (!result.success)
            return NextResponse.json({ message: result.error.issues[0].message }, { status: 400 });
        const realisation = await prisma.realisation.create({ data: realisationData(result.data) });
        return NextResponse.json({ realisation, message: "Réalisation créée." }, { status: 201 });
    }
    catch (error) {
        return realisationApiError(error);
    }
}
