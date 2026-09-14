'use client';
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import HeaderLogo from "./HeaderLogo";
import { useSession } from "next-auth/react";
export default function ResponsiveMenu() {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    return <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="lg:hidden p-2" aria-label="Ouvrir le menu">
            <Menu size={24} />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-8">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <HeaderLogo />
            <nav className="flex flex-col gap-5">
                {[["/", "Accueil"], ["/services", "Les services"], ["/contact", "Parlons de votre projet"], ...(session ? [["/admin/services", "Gérer les services"]] : [])].map(([href, label]) =>
                    <SheetClose asChild key={href}>
                        <Link href={href}>
                            {label}
                        </Link>
                    </SheetClose>)}
            </nav>
        </SheetContent>
    </Sheet>;
}
