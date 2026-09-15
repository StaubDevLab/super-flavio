import ContactComponent from "@/components/contact/contact-component";
import Header from "@/components/header/Header";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Contactez votre artisan à Tulle et Brive", "Un projet de rénovation ou un dépannage en Corrèze ? Contactez Super Flavio par téléphone, e-mail ou formulaire pour discuter de vos travaux.", "/contact");
export default function ContactPage() {
    return (<>
        <Header />
        <main className="w-full">
            <h1 className="site-container section-title pt-12">Contactez votre artisan en Corrèze</h1>
            <ContactComponent params={""} />
        </main>
    </>);
}
