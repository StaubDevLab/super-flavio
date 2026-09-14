'use client';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Wrench, Camera, ArrowUpRight } from "lucide-react";
import Header from "@/components/header/Header";
export default function AdminPage() {
    const { data: session } = useSession();
    return <>
        <Header />
        <main className="site-container py-12 flex-grow">
            <p className="eyebrow">VOTRE ESPACE ARTISAN</p>
            <h1 className="section-title">Bienvenue {session?.user?.name?.split(' ')[0]}
            </h1>
            <p className="text-muted-foreground mt-4">Faites évoluer votre vitrine au rythme de votre activité.</p>
            <div className="grid md:grid-cols-2 gap-6 mt-10">
                {[
                    { href: '/admin/services', Icon: Wrench, title: 'Vos services', description: 'Présentez vos métiers, vos prestations et vos tarifs.' },
                    { href: '/admin/realisations', Icon: Camera, title: 'Vos réalisations', description: 'Ajoutez vos chantiers, leurs photos et les étapes avant / après.' },
                ].map(({ href, Icon, title, description }) =>
                    <Link href={href} key={href} className="rounded-2xl border bg-white p-8 hover:border-primary transition-colors">
                        <Icon className="text-primary" size={30} />
                        <h2 className="text-2xl font-semibold mt-6">
                            {title}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-3">
                            {description}
                        </p>
                        <span className="flex items-center gap-2 text-primary text-sm font-semibold mt-6">Gérer <ArrowUpRight size={17} />
                        </span>
                    </Link>)}
            </div>
        </main>
    </>;
}
