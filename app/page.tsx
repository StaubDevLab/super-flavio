import HeroSection from "@/components/hero-section/hero-section";
import PinsList from "@/components/information-pins/pins-list";
import ServicesGroup from "@/components/services/services-group";

export default function Home() {
    return (
        <main className="flex  flex-col items-center justify-between ">
            <HeroSection/>
            <PinsList params={""}/>
            <ServicesGroup params={""} />
        </main>
    );
}
