'use client'
import React from 'react';
import PropTypes from 'prop-types';
import Image from "next/image";

import PageContainer from '../ui/page-container';
import {useServiceBySlug} from "@/utils/queries/useServiceBySlug";
import {notFound} from "next/navigation";
type Props = {
    slug: string
}
export default function ServiceSinglePageComponent  ({slug} : Props)  {
    const {data: service, isFetching, error, isError} = useServiceBySlug(slug)

    if (error || isError) {
        notFound()
    }
    if (isFetching) {
        return (
            <PageContainer>
                <div className={"flex flex-col items-center gap-4"}>
                    {/*<ServiceSkeleton/>*/}
                </div>
            </PageContainer>
        )
    }
    return (
        <>
            <PageContainer>
                <div className={"flex flex-col items-center gap-4"}>
                    <h1 className={"text-2xl text-primary text-center font-bold "}>{service?.title}</h1>

                    <Image width={400} height={400} className={"rounded-lg "} src={service?.image || ""}
                           alt={"Image d'un cheval"}/>
                    <div>
                        <div className="flex flex-col mt-2">
                            <p className="text-muted-foreground quill-content"
                               dangerouslySetInnerHTML={{__html: service?.description || ""}}>
                            </p>
                        </div>
                    </div>
                </div>
            </PageContainer>
        </>
    );
};