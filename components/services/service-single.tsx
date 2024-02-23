import React from 'react';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Service} from "@prisma/client";
type Props = {
    service : Service
}
export default function ServiceSingle({service}: Props) {
    return (
        <Card className="w-[350px] shadow-lg">
            <CardHeader>


            </CardHeader>
            <CardContent>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>  {service.description}</CardDescription>

            </CardContent>
            {/*<CardFooter className="flex justify-between">*/}


            {/*</CardFooter>*/}
        </Card>
    )
};