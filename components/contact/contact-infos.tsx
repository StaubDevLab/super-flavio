import React from 'react';
import {AtSign, MapPin, Phone, Siren, Wrench} from "lucide-react";
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
                        <Siren size={30} className={"text-white"}/>
                    </div>

                    <div>
                        <p className={'font-bold underline'}>Zone d&apos;intervention dépannage :</p>
                        <p className={"text-muted-foreground"}>Agglomérations Tulle et Brive-La-Gaillarde</p>

                    </div>
                </div>
                <div className={'flex items-center gap-3'}>
                    <div className={"bg-primary p-3 rounded-lg"}>
                        <Wrench  size={30} className={"text-white"}/>
                    </div>

                    <div>
                        <p className={'font-bold underline'}>Zone d&apos;intervention chantiers :</p>
                        <p className={"text-muted-foreground"}>Corrèze (19) et départements limitrophes</p>

                    </div>
                </div>
                <div className={'flex items-center gap-3'}>
                    <div className={"bg-primary p-3 rounded-lg"}>
                        <Phone size={30} className={"text-white"}/>
                    </div>
                    <div>
                        <p className={'font-bold underline'}>Téléphone :</p>
                        <p className={"text-muted-foreground"}>{process.env.NEXT_PUBLIC_PHONE}</p>

                    </div>
                </div>
                <div className={'flex items-center gap-3'}>
                    <div className={"bg-primary p-3 rounded-lg"}>
                        <AtSign size={30} className={"text-white"}/>
                    </div>
                    <div>
                        <p className={'font-bold underline'}>Email :</p>
                        <a href={"mailto: flavien.staub@gmail.com"}
                           className={" underline text-muted-foreground"}>{process.env.NEXT_PUBLIC_EMAIL}</a>

                    </div>
                </div>
            </div>

        </div>
    );
};