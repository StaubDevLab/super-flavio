import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Service} from "@prisma/client";
import {motion} from 'framer-motion';
import Image from "next/image";
import Link from "next/link";

type Props = {
    service: Service
}
export default function ServiceSingle({service}: Props) {
    return (

        <Card className={"w-[350px] shadow-lg p-0 flex flex-col justify-start hover:shadow-md transition duration-300 "}>
            {/*<motion.div whileHover={{scale: 1.05}}*/}
            {/*            whileTap={{scale: 0.95}} className={"cursor-pointer"}>*/}
            {/*    <Link href={"/services/" + service.slug}>*/}
                    <CardHeader className={"p-0"}>

                        <Image src={service?.image || ""}
                               alt={"Test"}
                               width={350}
                               height={200}
                        />
                    </CardHeader>
            <div className={"flex flex-col justify-between flex-1"}>
                    <CardContent
                        className={"mt-3 flex flex-col gap-4"}>
                        <CardTitle>{service.title} </CardTitle>
                        < CardDescription><p className="quill-content"
                                             dangerouslySetInnerHTML={{__html: service.shortDescription || ""}}></p>
                        </CardDescription>

                    </CardContent>
                    <CardFooter
                        className="flex justify-between">
                        <Button> <Link href={"/services/" + service.slug} >
                            En savoir
                            plus</Link> </Button>

                    </CardFooter>
            </div>
            {/*    </Link>*/}
            {/*</motion.div>*/}
        </Card>

)
};