import React from 'react';
import ServiceSinglePageComponent from "@/components/services/service-single-page-component";
import Header from "@/components/header/Header";

type Props = {
    params: {
        slug: string;
    }
}

export default function SingleServicePage({params}: Props) {
    const slug = params.slug;

    return (
        <div className="flex flex-col justify-center items-center py-3 px-4">
            <Header/>
            <ServiceSinglePageComponent slug={slug}/>
        </div>
    );
}