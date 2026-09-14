'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function HeaderNavigation() {
    const path = usePathname();
    return <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-8 text-sm">
        {[["/", "Accueil"], ["/services", "Les services"], ["/contact", "Contact"]].map(([href, label]) =>
            <Link key={href} href={href} aria-current={(href === "/" ? path === href : path.startsWith(href)) ? "page" : undefined} className={`py-2 transition-colors hover:text-primary ${(href === "/" ? path === href : path.startsWith(href)) ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                {label}
            </Link>)}
    </nav>;
}
