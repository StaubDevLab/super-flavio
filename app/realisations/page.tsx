import { getPublicRealisations } from "@/lib/public-content";
import { pageMetadata } from "@/lib/seo";
export const dynamic = "force-dynamic";
import Header from "@/components/header/Header";
import RealisationsGroup from "@/components/realisations/realisations-group";
export const metadata = pageMetadata("Réalisations et chantiers en Corrèze", "Découvrez les travaux de plomberie, rénovation et aménagement réalisés par Super Flavio à Tulle, Brive et en Corrèze.", "/realisations");
export default async function RealisationsPage() {
    return <>
        <Header />
        <main>
            <RealisationsGroup full initialData={await getPublicRealisations()} />
        </main>
    </>;
}
