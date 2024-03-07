import ServicesGroup from "@/components/services/services-group";
import Header from "@/components/header/Header";
import {Separator} from "@/components/ui/separator";
import PageContainer from "@/components/ui/page-container";

export default function ServicesPage() {
    return (
        <PageContainer>
            <Header/>
            <Separator className={"border-primary border w-3/4 mx-auto"}/>
            <ServicesGroup params={""}/>
        </PageContainer>
    )
}