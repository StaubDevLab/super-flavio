import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Service} from "@prisma/client";
import {motion} from 'framer-motion';
import Image from "next/image";

type Props = {
    service: Service
}
export default function ServiceSingle({service}: Props) {
    return (
        <motion.div whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}} className={"cursor-pointer"}>
            <Card className={"w-[350px] shadow-lg p-0"}>
                <CardHeader className={"p-0"}>

                    <Image src={"/services/service-plomberie.jpeg"}
                           alt={"Test"}
                           width={350}
                           height={200}
                    />
                </CardHeader>
                <CardContent
                    className={"mt-3 flex flex-col gap-4"}>
                    <CardTitle>{service.title} </CardTitle>
                    < CardDescription> {service.description} </CardDescription>

                </CardContent>
                <CardFooter
                    className="flex justify-between">
                    <Button>En
                        savoir
                        plus </Button>

                </CardFooter>
            </Card>
        </motion.div>
    )
};