import Link from "next/link";
import Image from "next/image";

export default function Footer() {

    return (
        <footer className="flex flex-col p-10 bg-primary text-white justify-center items-center mt-auto gap-3">
            <nav className="flex flex-col md:flex-row gap-4 text-center">
                <Link href={"/"} className="link link-hover">Accueil</Link>
                <Link href={"/services"} className="link link-hover">Services</Link>
                <Link href={"/about"} className="link link-hover">À propos</Link>

            </nav>
            <nav>
                <div className="grid grid-flow-col gap-4">

                    <Link href={"#"}>
                        <Image src={"/assets/instagram-icon.png"} alt={"Logo d'instagram"} width={24} height={24} />
                    </Link>
                    <Link href={"#"} >
                        <Image src={"/assets/facebook-icon.png"} alt={"Logo de facebook"} width={24} height={24} />

                    </Link>
                </div>
            </nav>
            <aside className={"text-center flex flex-col gap-3"}>
                <div className={'flex flex-col items-center'}>
                   <p >Copyright © 2024 - All right reserved by </p>
                    <Image className={"p-0"} src={"/assets/staubdev.png"} width={100} height={100} alt={"Logo du développeur StaubDév"}/></div>
                <p>Icons by <Link href={"https://icons8.com"} className={"underline"}>Icons8</Link></p>

            </aside>
        </footer>
    )
}