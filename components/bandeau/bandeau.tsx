import { Clock, MapPin, Phone } from "lucide-react";
export default function Bandeau() {
    const phone = process.env.NEXT_PUBLIC_PHONE;
    return <div className="bg-[#234b32] text-white/90 text-xs">
        <div className="site-container flex min-h-[36px] items-center justify-between gap-3">
            <span className="flex items-center gap-2">
                <MapPin size={13} /> Votre artisan en Corrèze (19)</span>
            <span className="hidden md:flex items-center gap-2">
                <Clock size={13} /> Lun. – sam. · 9h – 18h</span>
            {phone && <a className="flex items-center gap-2 whitespace-nowrap" href={`tel:${phone.replace(/\s/g, '')}`}>
                <Phone size={13} />
                {phone}
            </a>}
        </div>
    </div>;
}
