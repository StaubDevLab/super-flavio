import { ContactForm } from "./contact-form";
import ContactInfos from "./contact-infos";
export default function ContactComponent({ params }: {
    params: {};
}) {
    return <section id="contact" className="site-container w-full py-16 lg:py-20">
        <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-10 lg:gap-20 rounded-3xl border border-black/5 bg-white p-6 sm:p-10 lg:p-14">
            <ContactInfos params="" />
            <div>
                <h3 className="text-xl font-semibold mb-6">Racontez-moi votre projet</h3>
                <ContactForm />
            </div>
        </div>
    </section>;
}
