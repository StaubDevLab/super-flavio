import Header from "@/components/header/Header";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, ArrowDown, Check } from "lucide-react";
export default function HeroSection() {
    return <section className="w-full">
        <Header />
        <div className="site-container grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 py-14 lg:py-20 items-center">
            <div>
                <p className="eyebrow">
                    <span className="h-2 w-2 rounded-full bg-primary" /> UN ARTISAN, PLUSIEURS SAVOIR-FAIRE</p>
                <h1 className="mt-6 text-[42px] sm:text-6xl lg:text-[48px] xl:text-[60px] leading-[1.08] font-semibold tracking-[-.055em]">Vos petits travaux.<br />Vos grands projets.<br />
                    <span className="text-primary">Le même artisan.</span>
                </h1>
                <p className="mt-7 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">Plomberie, électricité, peinture, placo, charpenterie, climatisation et carrelage : un seul interlocuteur pour vos travaux en Corrèze.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <Link className="btn-primary" href="/contact">Parlons de votre projet <ArrowUpRight size={18} />
                    </Link>
                    <Link className="btn-outline" href="#services">Découvrir les services <ArrowDown size={16} />
                    </Link>
                </div>
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-2">
                        <Check size={15} className="text-primary" /> Un interlocuteur unique</span>
                    <span className="flex items-center gap-2">
                        <MapPin size={15} className="text-primary" /> Tulle, Brive et alentours</span>
                </div>
            </div>
            <div className="min-w-0">
                <div className="relative pb-4 pr-3">
                    <div aria-hidden="true" className="absolute right-0 top-5 bottom-0 left-10 rounded-[160px_28px_28px_28px] bg-[#e5eddf]" />
                    <div className="relative aspect-[.98] sm:aspect-[1.2] lg:aspect-[.98] overflow-hidden rounded-[150px_24px_24px_24px]">
                        <Image src="/assets/hero-renovation.jpg" alt="Un artisan réalise les finitions d’un mur dans une maison en rénovation" fill priority sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover object-center" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#173324]/45 to-transparent" />
                        <p className="absolute bottom-6 left-7 text-white text-sm flex items-center gap-2">
                            <MapPin size={16} /> Le savoir-faire, près de chez vous.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>;
}
