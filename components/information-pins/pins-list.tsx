import { GraduationCap, MapPin, MessagesSquare, Wrench } from "lucide-react";
export default function PinsList({ params }: {
    params: {};
}) {
    return <section className="w-full border-y border-black/5 bg-white">
        <div className="site-container grid sm:grid-cols-2 lg:grid-cols-4 gap-7 py-8">
            {[
                { Icon: Wrench, title: "Plusieurs savoir-faire", text: "Un seul artisan pour vos travaux" },
                { Icon: GraduationCap, title: "Plombier diplômé", text: "Un métier, une vraie expertise" },
                { Icon: MapPin, title: "Artisan de proximité", text: "En Corrèze et aux alentours" },
                { Icon: MessagesSquare, title: "Un échange simple", text: "Des solutions adaptées à votre projet" },
            ].map(({ Icon, title, text }) =>
                <div key={title} className="flex gap-3 items-center">
                    <Icon className="shrink-0 text-primary" size={24} strokeWidth={1.5} />
                    <div>
                        <p className="text-sm font-semibold">
                            {title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {text}
                        </p>
                    </div>
                </div>)}
        </div>
    </section>;
}
