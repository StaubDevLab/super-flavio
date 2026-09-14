import Header from "@/components/header/Header";
import RealisationsGroup from "@/components/realisations/realisations-group";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Les réalisations | Super Flavio", description: "Découvrez en images les chantiers de Super Flavio, votre artisan multi-services en Corrèze." };
export default function RealisationsPage() {
    return <>
        <Header />
        <main>
            <RealisationsGroup full />
        </main>
    </>;
}
