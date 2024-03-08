"use client"

import * as React from "react"
import Link from "next/link"

import {cn} from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


import {usePathname} from "next/navigation";



export default function HeaderNavigation() {
    const pathname = usePathname();

    // const {data: categories} = useCategories()

    return (
        <NavigationMenu className={cn("hidden md:flex ")}>
            <NavigationMenuList className={"flex flex-row justify-between gap-6"}>
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={` font-bold text-xl transition-colors duration-300 ease-in-out  hover:bg-primary hover:text-white  px-3 py-2 rounded-xl ${pathname === "/" && "bg-primary text-white"} `}>
                            Accueil

                        </NavigationMenuLink>

                    </Link>

                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/services" legacyBehavior passHref>
                        <NavigationMenuLink className={` font-bold text-xl transition-colors duration-300 ease-in-out  hover:bg-primary hover:text-white px-3 py-2 rounded-xl ${pathname === "/services" && "bg-primary text-white"} `}>
                            Services
                        </NavigationMenuLink>
                    </Link>



                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={` font-bold text-xl  transition-colors duration-300 ease-in-out  hover:bg-primary  hover:text-white  px-3 py-2 rounded-xl ${pathname === "/about" && "bg-primary text-white"} `}>
                            À propos
                        </NavigationMenuLink>
                    </Link>

                </NavigationMenuItem>


            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        " block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
