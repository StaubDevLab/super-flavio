'use client';
import HeaderLogo from "./HeaderLogo";
import HeaderNavigation from "./HeaderNavigation";
import ResponsiveMenu from "./ResponsiveMenu";
import HeaderAvatar from "./HeaderAvatar";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function Header() {
    return <header className="w-full border-b border-black/5 bg-background">
        <div className="site-container flex min-h-[96px] items-center justify-between gap-4">
            <HeaderLogo />
            <HeaderNavigation />
            <div className="flex items-center gap-3">
                <Link href="/contact" className="hidden sm:inline-flex btn-primary">Parlons de votre projet <ArrowUpRight size={17} />
                </Link>
                <HeaderAvatar />
                <ResponsiveMenu />
            </div>
        </div>
    </header>;
}
