'use client'
import React from 'react';
import PageContainer from "@/components/ui/page-container";
import HeaderNavigation from "@/components/header/HeaderNavigation";
import HeaderLogo from "@/components/header/HeaderLogo";
import ResponsiveMenu from "@/components/header/ResponsiveMenu";
import HeaderButton from "@/components/header/HeaderButton";
import HeaderAvatar from "@/components/header/HeaderAvatar";
import {usePathname} from "next/navigation";

const Header = () => {
    const pathname = usePathname();

    return (
        <header className={'p-4 w-full '}>

                <div className={`flex items-center justify-between ${pathname === "/" && "text-white"}`}>
                    <HeaderLogo/>

                    <HeaderNavigation/>
                    <div className="flex items-center">
                        <HeaderButton content={"Prendre rdv"}/>
                    </div>
                    <div className={"flex gap-4 "}>
                        <ResponsiveMenu/>
                        <HeaderAvatar/>
                    </div>


                </div>



        </header>
    );
};

export default Header;
