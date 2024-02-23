import Image from "next/image";
import Bandeau from "@/components/bandeau/bandeau";
import HeroSection from "@/components/hero-section/hero-section";
import PinsList from "@/components/information-pins/pins-list";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between ">
<HeroSection  />
        <PinsList params={""} />
    </main>
  );
}
