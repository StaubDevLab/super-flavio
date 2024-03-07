import {Clock, MapPin, Phone} from "lucide-react";

export default function Bandeau() {
    return (
        <div className={"bg-primary flex flex-col md:flex-row items-center md:justify-between w-full sticky top-0 p-3 text-white z-40"}>
            <p><MapPin className={"mr-2 inline"}/>Corrèze (19)</p>
            <p><Clock className={"mr-2 inline"}/>Du lundi au samedi de 9h à 18h</p>
            <p><Phone className={"mr-2 inline"}/>06 00 00 00 00</p>
        </div>
    )
}