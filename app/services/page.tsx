import { getPublicServices } from "@/lib/public-content";
import { pageMetadata, siteDescription } from "@/lib/seo";
export const dynamic = "force-dynamic";
import ServicesGroup from "@/components/services/services-group";
import Header from "@/components/header/Header";
export const metadata = pageMetadata("Plomberie, rénovation et petits travaux en Corrèze", siteDescription, "/services");
export default async function ServicesPage() {
    return <>
        <Header />
        <main>
            <ServicesGroup params="" full initialData={await getPublicServices()} />
        </main>
    </>;
}
