import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {ContactForm} from "@/components/contact/contact-form";

import {Card} from "@/components/ui/card";

import ContactInfos from "@/components/contact/contact-infos";
import {Separator} from "@/components/ui/separator";
type Props = {
    params:{
    }
}
export default function ContactComponent  ({params} : Props)  {

    return (
        <section className="p-6 w-full h-full">
            <Card className={"flex flex-col lg:flex-row  gap-6 w-full p-10 shadow-lg  "}>
                <ContactInfos params={""}/>
                <ContactForm/>

            </Card>
        </section>
    );
};