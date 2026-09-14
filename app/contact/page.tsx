import ContactComponent from "@/components/contact/contact-component";
import Header from "@/components/header/Header";
export default function ContactPage() {
    return (<>
        <Header />
        <div className="w-full">
            <ContactComponent params={""} />
        </div>
    </>);
}
