import React from 'react';
import PropTypes from 'prop-types';
import Pin from "@/components/information-pins/pin";
import {MapPin, Smile, Star, Wrench} from "lucide-react";
type Props = {
    params:{
    }
}
export default function PinsList  ({params} : Props)  {
    return (
        <section className="p-6 my-6 ">
            <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
                <Pin zoomText={'7j/7'} descriptionText={'Dépannage'}>
                    <Wrench size={40} className="text-white" />
                </Pin>
                <Pin zoomText={'3 ans'} descriptionText={"d'expériences"}>
                    <Star  size={40} className="text-white" />
                </Pin>
                <Pin zoomText={'Corrèze'} descriptionText={"zone d'intervention"}>
                    <MapPin size={40} className="text-white" />
                </Pin>
                <Pin zoomText={'100%'} descriptionText={"Garantie satisfaction"}>
                    <Smile size={40} className="text-white" />
                </Pin>
            </div>
        </section>
    );
};