import { AtSign, MapPin, Phone, ArrowUpRight } from "lucide-react";
export default function ContactInfos({ params }: {
    params: {};
}) {
    const phone = process.env.NEXT_PUBLIC_PHONE;
    const email = process.env.NEXT_PUBLIC_EMAIL;
    return <div>
        <p className="eyebrow">FAISONS CONNAISSANCE</p>
        <h2 className="section-title">Et si on parlait<br />de votre projet ?</h2>
        <p className="mt-5 text-muted-foreground leading-relaxed">Une réparation, une pièce à rénover ou une idée à concrétiser ? Expliquez-moi votre besoin et trouvons ensemble la solution adaptée.</p>
        <div className="mt-8 space-y-6">
            {phone && <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-4">
                <span className="rounded-full bg-[#eef4e9] p-3 text-primary">
                    <Phone size={20} />
                </span>
                <span>
                    <span className="block text-xs text-muted-foreground mb-1">Appelez-moi</span>
                    <span className="font-semibold">
                        {phone}
                    </span>
                </span>
                <ArrowUpRight size={17} className="ml-auto text-primary" />
            </a>}{email && <a href={`mailto:${email}`} className="flex items-center gap-4">
                <span className="rounded-full bg-[#eef4e9] p-3 text-primary">
                    <AtSign size={20} />
                </span>
                <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground mb-1">Écrivez-moi</span>
                    <span className="text-sm break-all">
                        {email}
                    </span>
                </span>
            </a>}
            <div className="flex items-start gap-4">
                <span className="rounded-full bg-[#eef4e9] p-3 text-primary">
                    <MapPin size={20} />
                </span>
                <div>
                    <p className="font-semibold text-sm">Au plus près de chez vous</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Dépannage : Tulle et Brive-la-Gaillarde.<br />Chantiers : Corrèze et départements limitrophes.</p>
                </div>
            </div>
        </div>
    </div>;
}
