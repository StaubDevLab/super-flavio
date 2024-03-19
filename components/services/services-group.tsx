'use client'
import React from 'react';
import ServiceSingle from "@/components/services/service-single";
import {useServices} from "@/utils/queries/useServices";
import {Service} from "@prisma/client";
import ServiceCardSkeleton from "@/components/services/ServiceCardSkeleton";
import PageContainer from "@/components/ui/page-container";

type Props = {
    params: {}
}
export default function ServicesGroup({params}: Props) {
    const {data: services, isFetching} = useServices();
    if (isFetching) {
        return (
            <PageContainer>
                <div className={"flex flex-col "}>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mx-auto">
                        <ServiceCardSkeleton/>
                        <ServiceCardSkeleton/>
                    </div>
                </div>
            </PageContainer>
        )
    }

    return (
        <section className={'py-7 flex flex-col gap-5 items-center'}>
            <h2 className={"text-3xl text-primary"}>Mes services</h2>
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mx-auto"}>
                {services && services.map((service: Service) => service.active && <ServiceSingle key={service.id} service={service}/>)}
            </div>
        </section>
    );
};