
import ContactComponent from "@/components/contact/contact-component";
import Header from "@/components/header/Header";


export default function ContactPage() {

    return (
        <>
            <Header/>
            <div className=" flex flex-col justify-center items-center py-10 px-4">


                <ContactComponent params={""}/>

            </div>
        </>
    );
}