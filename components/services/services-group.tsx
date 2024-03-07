'use client'
import React from 'react';
import PropTypes from 'prop-types';
import ServiceSingle from "@/components/services/service-single";
import {useServices} from "@/utils/queries/useServices";
import {Service} from "@prisma/client";
type Props = {
    params:{
    }
}
export default function ServicesGroup  ({params} : Props)  {
    const {data:services} = useServices();
    return (
        <section className={'py-7 flex flex-col gap-5 items-center'}>
            <h2 className={"text-3xl text-primary"}>Mes services</h2>
            {services && services.map((service : Service) => <ServiceSingle key={service.id} service={service}/>) }
        </section>
    );
};