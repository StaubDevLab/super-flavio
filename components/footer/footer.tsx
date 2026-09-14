import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
export default function Footer() {
    return <footer className="mt-auto bg-[#203b2b] text-white">
        <div className="site-container py-12">
            <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="flex items-center gap-4">
                    <Image src="/assets/logo.png" width={60} height={60} alt="Super Flavio" className="rounded-full" />
                    <div>
                        <p className="text-xl font-semibold">Super Flavio.</p>
                        <p className="text-sm mt-2 text-white/60">Un artisan de proximité. Plusieurs savoir-faire.</p>
                    </div>
                </div>
                <nav className="flex flex-wrap items-center gap-6 text-sm" aria-label="Navigation de pied de page">
                    <Link href="/">Accueil</Link>
                    <Link href="/services">Les services</Link>
                    <Link href="/contact" className="flex items-center gap-2">Votre projet <ArrowUpRight size={16} />
                    </Link>
                </nav>
            </div>
            <div className="mt-10 border-t border-white/15 pt-6 flex flex-wrap justify-between gap-3 text-xs text-white/50">
                <p>© {new Date().getFullYear()} Super Flavio · Artisan multi-services en Corrèze</p>
                <p>Site réalisé par StaubDév</p>
            </div>
        </div>
    </footer>;
}
