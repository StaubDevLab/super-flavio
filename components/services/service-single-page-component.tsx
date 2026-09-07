'use client'
import React from 'react';
import Image from "next/image";

import PageContainer from '../ui/page-container';
import {useServiceBySlug} from "@/utils/queries/useServiceBySlug";
import ServiceSkeleton from "@/components/services/ServiceSkeleton";

type Props = {
    slug: string
}

export default function ServiceSinglePageComponent({slug}: Props) {
    const {data: service, isFetching, error, isError} = useServiceBySlug(slug)

    if (isFetching) {
        return (
            <PageContainer>
                <div className={"flex flex-col items-center gap-4"}>
                    <ServiceSkeleton/>
                </div>
            </PageContainer>
        )
    }

    if (error || isError || !service) {
        return (
            <PageContainer>
                <div className={"flex flex-col items-center gap-4 text-center py-10"}>
                    <h1 className={"text-xl font-bold text-destructive"}>Service non trouvé</h1>
                    <p className={"text-muted-foreground"}>{"Le service demandé n'existe pas ou n'est pas disponible."}</p>
                </div>
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            <div className={"flex flex-col items-center gap-4"}>
                <h1 className={"text-2xl text-primary text-center font-bold "}>{service?.title}</h1>

                {service?.image && (
                    <Image width={400} height={400} className={"rounded-lg "} src={service.image}
                           alt={service?.title || "Image de service"}/>
                )}
                <div>
                    <div className="flex flex-col mt-2">
                        <p className="text-muted-foreground quill-content"
                           dangerouslySetInnerHTML={{__html: service?.description || ""}}>
                        </p>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};