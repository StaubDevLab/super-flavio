import Link from "next/link";
import Image from "next/image";
export default function HeaderLogo() {
    return <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Super Flavio, accueil">
        <Image src="/assets/logo.png" width={58} height={58} className="rounded-full" alt="Logo Super Flavio" />
        <span className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">Super Flavio<span className="text-primary">.</span>
            </span>
            <span className="text-[11px] tracking-[.13em] uppercase text-muted-foreground">Artisan multi-services</span>
        </span>
    </Link>;
}
