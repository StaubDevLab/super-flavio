import React from 'react';
import PropTypes from 'prop-types';
import Pin from "@/components/information-pins/pin";
import {Bitcoin, GraduationCap, MapPin, Smile, Star, Wrench} from "lucide-react";
import {motion} from "framer-motion";
type Props = {
    params:{
    }
}
export default function PinsList  ({params} : Props)  {
    return (
        <section className="p-6 my-6 ">
            <div className="container grid grid-cols-1 gap-6  mx-auto sm:grid-cols-2  xl:grid-cols-4  xl:justify-items-center">
                <Pin zoomText={'7j/7'} descriptionText={'Dépannage'}>
                    <Wrench size={40} className="text-white"/>
                </Pin>
                <Pin zoomText={'Plombier'} descriptionText={"diplômé"}>
                    <GraduationCap size={40} className="text-white"/>
                </Pin>
                <Pin zoomText={'Corrèze'} descriptionText={"zone d'intervention"}>
                    <MapPin size={40} className="text-white"/>
                </Pin>
                <Pin zoomText={'100%'} descriptionText={"Garantie satisfaction"}>
                    <Smile size={40} className="text-white"/>
                </Pin>
                {/*<Pin zoomText={'Paiements'} descriptionText={"Cryptos & Bitcoin acceptés"}>*/}
                {/*    <Bitcoin size={40} className="text-white" />*/}
                {/*</Pin>*/}
                <div
                            className=" cursor-pointer sm:col-start-1 sm:col-span-2 xl:col-start-2 xl:col-span-2 flex p-4 space-x-4 rounded-lg md:space-x-6  border-2 shadow-xl ">
                    <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 bg-primary">
                        <Bitcoin size={40} className="text-white" />
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-3xl font-semibold leadi">Paiements</p>
                        <p className="capitalize">Cryptos & Bitcoin</p>
                    </div>
                </div>
            </div>
        </section>
    );
};