import React from 'react';
import ServiceSinglePageComponent from "@/components/services/service-single-page-component";
import Header from "@/components/header/Header";
type Props = {
    params: {
        slug: string;
    };
};
export default function SingleServicePage({ params }: Props) {
    const slug = params.slug;
    return (<div>
        <Header />
        <ServiceSinglePageComponent slug={slug} />
    </div>);
}
