import React from 'react';
import PropTypes from 'prop-types';
import {Separator} from "@/components/ui/separator";
import {AtSign, MapPin, Phone} from "lucide-react";
type Props = {
    params:{
    }
}
export default function ContactInfos  ({params} : Props)  {
    return (
        <div className={"flex flex-col gap-3  items-center h-full min-h-full"}>
            <h3 className={"text-2xl"}>Entrons en contact</h3>
            <p className={"text-muted-foreground"}>Remplissez le formulaire pour démarrer une conversation</p>
            <div className={"flex flex-col gap-4 "}>
                <div className={'flex items-center gap-3'}>
                    <div className={"bg-primary p-3 rounded-lg"}>
                        <MapPin size={30} className={"text-white"}/>
                    </div>

                    <div>
                        <p className={'font-bold underline'}>Zone d&apos;intervention :</p>
                        <p className={"text-muted-foreground"}>Sur tout le département de la Corrèze (19)</p>

                    </div>
                </div>
                <div className={'flex items-center gap-3'}>
                    <div className={"bg-primary p-3 rounded-lg"}>
                        <Phone size={30} className={"text-white"}/>
                    </div>
                    <div>
                        <p className={'font-bold underline'}>Téléphone :</p>
                        <p className={"text-muted-foreground"}>06.00.00.00.00</p>

                    </div>
                </div>
                <div className={'flex items-center gap-3'}>
                    <div className={"bg-primary p-3 rounded-lg"}>
                        <AtSign size={30} className={"text-white"}/>
                    </div>
                    <div>
                        <p className={'font-bold underline'}>Email :</p>
                        <a href={"mailto: contact@superflavio.com"} className={" underline text-muted-foreground"}>contact@superflavio.com</a>

                    </div>
                </div>
            </div>

        </div>
    );
};