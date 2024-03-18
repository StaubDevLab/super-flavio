'use client'
import React, {useEffect, useState} from 'react';

import Header from "@/components/header/Header";


type Props = {
    params:{
    }
}
export default function HeroSection  ()  {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const calculateBackgroundStyles = () => {
        // Adjust the factor for the desired zoom effect
        const backgroundSize = 100 + scrollY * 0.1;
        const backgroundPosition = `50% ${scrollY * 0.1}px`;
        return {
            backgroundImage: 'url(/assets/hero-image.jpg)',
            backgroundSize: `${backgroundSize}% auto`,
            backgroundPosition: backgroundPosition,
            backgroundRepeat: 'no-repeat',
        };
    };
    return (
        <header className="w-full">

            <div className="w-full bg-center bg-cover "
                 style={{backgroundImage: 'url(/assets/hero-image.jpg)'}}
                 >


                <div className="flex flex-col items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 pb-12">
                    <Header/>
                    <div className="text-center">
                        <div className="container px-4 mx-auto">

                            <div className="max-w-4xl mx-auto text-center">

                                <h2 className="mt-8 mb-6 text-4xl lg:text-5xl font-bold text-gray-100">Votre expert plombier sur la <span className={"text-primary"}>Corrèze <span className={"text-3xl animate-pulse"}>|</span></span> <span >🪠👨🏼‍🔧</span></h2>
                                <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-300">
                                    Solution tout-en-un pour tous vos projets de plomberie et vos travaux de rénovation.
                                </p>
                                <a className="inline-block w-auto md:w-auto mb-4 md:mr-6 py-3 px-4 text-sm font-bold uppercase border-2 border-transparent bg-primary rounded-lg transition-transform duration-500 ease-in-out hover:scale-110 text-white "
                                   href="/contact">Me contacter</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    );
};