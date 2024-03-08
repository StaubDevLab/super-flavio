import {Badge} from "@/app/_components/ui/badge";
import {BadgeEuro, Timer, Users} from "lucide-react";
import {Skeleton} from "@/app/_components/ui/skeleton";
import PageContainer from "@/app/_components/ui/page-container";
import * as React from "react";

export default function ServiceSkeleton() {
    return(
        <PageContainer>
            <div className={"flex flex-col items-center gap-4"}>
                <Skeleton className="h-4 w-[250px]" />

                <div className={"mb-4 flex flex-wrap sm:flex-row gap-3"}>
                    <Skeleton className="h-4 w-[40px]" />
                    <Skeleton className="h-4 w-[40px]" />
                    <Skeleton className="h-4 w-[40px]" />


                </div>
                <Skeleton className="h-[400px] w-[400px] rounded-xl" />
                <div>
                    <div className="flex flex-col mt-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}