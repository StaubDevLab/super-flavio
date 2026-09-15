import { getPublicServices, getPublicRealisations } from "@/lib/public-content";
import { pageMetadata, siteDescription } from "@/lib/seo";
export const dynamic = "force-dynamic";
import HeroSection from "@/components/hero-section/hero-section";
import PinsList from "@/components/information-pins/pins-list";
import ServicesGroup from "@/components/services/services-group";
import RealisationsGroup from "@/components/realisations/realisations-group";
import ContactComponent from "@/components/contact/contact-component";
export const metadata = pageMetadata("Artisan multi-services à Tulle, Brive et en Corrèze", siteDescription, "/");
export default async function Home() {
    const [services, projects] = await Promise.all([getPublicServices(), getPublicRealisations()]);
    return (<main className="flex  flex-col items-center justify-between ">
        <HeroSection />
        <PinsList params={""} />
        <ServicesGroup params={""} initialData={services} />
        <RealisationsGroup initialData={projects} />
        <ContactComponent params={""} />
    </main>);
}
