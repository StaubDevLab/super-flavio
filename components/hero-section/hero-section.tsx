import React from 'react';
import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

import PropTypes from 'prop-types';

type Props = {
    params:{
    }
}
export default function HeroSection  ()  {
    return (
        <header className="w-full">
            <div className="w-full bg-center bg-cover"
                 style={{backgroundImage: 'url(/assets/hero-image.jpg)'}}>
                <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 py-12">
                    <div className="text-center">
                        <div className="container px-4 mx-auto">
                            <div className="max-w-4xl mx-auto text-center">
                                <span
                                    className="text-gray-200 font-semibold uppercase tracking-widest">SuperFlavio</span>
                                <h2 className="mt-8 mb-6 text-4xl lg:text-5xl font-bold text-gray-100">Votre expert plombier sur la <span className={"text-primary"}>Corrèze <span className={"text-3xl animate-pulse"}>|</span></span> <span >🪠👨🏼‍🔧</span></h2>
                                <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-300">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum sit cum iure qui,
                                    nostrum at sapiente
                                    ducimus.
                                </p>
                                <a className="inline-block w-full md:w-auto mb-4 md:mr-6 py-5 px-8 text-sm font-bold uppercase border-2 border-transparent bg-gray-200 rounded hover:bg-gray-100 text-gray-800 transition duration-200"
                                   href="#">start your free trial</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    );
};