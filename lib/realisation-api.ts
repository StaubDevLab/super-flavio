import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import type { RealisationFields } from "./realisations";
export function realisationData(value: RealisationFields) {
    return { ...value, completedAt: value.completedAt ? new Date(`${value.completedAt}T00:00:00.000Z`) : null };
}
export function realisationApiError(error: unknown) {
    if (error instanceof SyntaxError)
        return NextResponse.json({ message: "Données invalides." }, { status: 400 });
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2021")
            return NextResponse.json({ message: "La migration des réalisations doit être appliquée à la base." }, { status: 503 });
        if (error.code === "P2025")
            return NextResponse.json({ message: "Réalisation introuvable." }, { status: 404 });
    }
    console.error("Realisation API error", { code: error instanceof Prisma.PrismaClientKnownRequestError ? error.code : "UNKNOWN" });
    return NextResponse.json({ message: "Impossible de traiter les réalisations. Réessayez." }, { status: 500 });
}
