import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { serviceSchema } from "@/lib/services";
import { canManageServices } from "@/lib/service-access";
import { Prisma } from "@prisma/client";
function failure(error: unknown, message: string) {
    if (error instanceof SyntaxError)
        return NextResponse.json({ message: "Données invalides." }, { status: 400 });
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025")
        return NextResponse.json({ message: "Service introuvable." }, { status: 404 });
    return NextResponse.json({ message }, { status: 500 });
}
export async function PATCH(req: Request, { params }: {
    params: {
        id: string;
    };
}) {
    const session = await getServerSession(authOptions);
    if (!canManageServices(session))
        return NextResponse.json({ message: "Accès non autorisé." }, { status: 403 });
    try {
        const result = serviceSchema.partial().safeParse(await req.json());
        if (!result.success || !Object.keys(result.data).length)
            return NextResponse.json({ message: result.success ? "Aucun champ à modifier." : result.error.issues[0].message }, { status: 400 });
        const service = await prisma.service.update({ where: { id: params.id }, data: result.data });
        return NextResponse.json({ service, message: "Service mis à jour." });
    }
    catch (error) {
        return failure(error, "Impossible de mettre à jour le service.");
    }
}
export async function DELETE(req: Request, { params }: {
    params: {
        id: string;
    };
}) {
    const session = await getServerSession(authOptions);
    if (!canManageServices(session))
        return NextResponse.json({ message: "Accès non autorisé." }, { status: 403 });
    try {
        await prisma.service.delete({ where: { id: params.id } });
        return NextResponse.json({ message: "Service supprimé." });
    }
    catch (error) {
        return failure(error, "Impossible de supprimer le service.");
    }
}
