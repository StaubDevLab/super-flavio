import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import slugify from "slugify";
import { serviceSchema } from "@/lib/services";
import { canManageServices } from "@/lib/service-access";
import { Prisma } from "@prisma/client";
export const dynamic = "force-dynamic";
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        const services = await prisma.service.findMany({ where: canManageServices(session) ? {} : { active: true }, orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
        return NextResponse.json(services);
    }
    catch {
        return NextResponse.json({ message: "Impossible de charger les services." }, { status: 500 });
    }
}
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!canManageServices(session))
        return NextResponse.json({ message: "Accès non autorisé." }, { status: 403 });
    try {
        const result = serviceSchema.safeParse(await req.json());
        if (!result.success)
            return NextResponse.json({ message: result.error.issues[0].message }, { status: 400 });
        const base = slugify(result.data.title, { lower: true, strict: true, locale: "fr" }) || "service";
        let slug = base;
        let suffix = 2;
        while (await prisma.service.findUnique({ where: { slug } }))
            slug = `${base}-${suffix++}`;
        const service = await prisma.service.create({ data: { ...result.data, slug } });
        return NextResponse.json({ service, message: "Service ajouté avec succès." }, { status: 201 });
    }
    catch (error) {
        if (error instanceof SyntaxError)
            return NextResponse.json({ message: "Données invalides." }, { status: 400 });
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002")
            return NextResponse.json({ message: "Ce service existe déjà. Réessayez avec un autre nom." }, { status: 409 });
        return NextResponse.json({ message: "Impossible d’ajouter le service." }, { status: 500 });
    }
}
