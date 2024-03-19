'use client'
import React from 'react';
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import Link from "next/link";


import HeaderLogo from "@/components/header/HeaderLogo";
import {useSession} from "next-auth/react";
import HeaderButton from "@/components/header/HeaderButton";
import HeaderAvatar from "@/components/header/HeaderAvatar";


const ResponsiveMenu = () => {
    const {data: session, status} = useSession();
    return (
        <Sheet>
            <SheetTrigger>
                <Menu size={30} className={'cursor-pointer  md:hidden'}/>
            </SheetTrigger>
            <SheetContent side={'left'} className={"flex flex-col"}>
                <HeaderLogo/>
                <nav className={'flex flex-col gap-4 text-lg items-start'}>
                    <HeaderAvatar/>
                    <Link href={'/contact'}>
                        <HeaderButton content={"Prendre rdv"}/>
                    </Link>
                    <div className="group cursor-pointer">
                        <Link href={"/"}>
                            Accueil
                        </Link>

                        <div
                            className="h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out"></div>
                    </div>
                    <div className="group cursor-pointer">
                        <Link href={"/services"}>
                            Services
                        </Link>

                        <div
                            className="h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out"></div>
                    </div>
                    {/*<div className="group cursor-pointer">*/}
                    {/*    <Link href={"/about"}>*/}
                    {/*        À propos*/}
                    {/*    </Link>*/}
                    {/*    <div*/}
                    {/*        className="h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out">*/}

                    {/*    </div>*/}
                    {/*</div>*/}
                    {session && status === "authenticated" && (
                        <div className="group cursor-pointer">
                            <Link href={"/admin"}>
                                Admin
                            </Link>
                            <div
                                className="h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out">

                            </div>
                        </div>
                    )}


                </nav>

            </SheetContent>
        </Sheet>
    );
};

export default ResponsiveMenu;
