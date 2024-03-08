import {Card, CardHeader} from "@/components/ui/card";
import * as React from "react";
import {Skeleton} from "@/components/ui/skeleton";

export default function ServiceCardSkeleton() {
    return (
        <Card className=" flex flex-col justify-between ">
            <CardHeader className={"p-0 pb-4 "}>
                <Skeleton className="h-80 w-[400px] rounded-xl"/>

            </CardHeader>
            <div className={"flex flex-col justify-between items-center gap-3 p-4"}>

                <div className="flex flex-row gap-2">
                    <Skeleton className="h-4 w-[70px]"/>
                    <Skeleton className="h-4 w-[70px]"/>
                    <Skeleton className="h-4 w-[70px]"/>

                </div>



                <Skeleton className="h-7 w-full"/>


                <Skeleton className="h-4 w-full"/>
                <Skeleton className="h-4 w-full"/>


                <Skeleton className="h-4 w-[250px]"/>

                <Skeleton className="h-8 w-[100px]"/>

            </div>
        </Card>
    );
}