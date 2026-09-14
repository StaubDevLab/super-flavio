import ServicesGroup from "@/components/services/services-group";
import Header from "@/components/header/Header";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Les services | Super Flavio", description: "Découvrez les prestations de votre artisan multi-services en Corrèze." };
export default function ServicesPage() {
    return <>
        <Header />
        <main>
            <ServicesGroup params="" full />
        </main>
    </>;
}
