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
        <section className={'py-10'}>
            {services && services.map((service : Service) => <ServiceSingle key={service.id} service={service}/>) }
        </section>
    );
};