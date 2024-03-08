import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Service} from ".prisma/client";
import {notFound} from "next/navigation";

const getServiceBySlug = async (slug: string) => {

    const {data, status} = await axios.get(`/api/services/slug/${slug}`)
    if (status !== 200) {
        throw new Error("Failed to fetch service")
    }
    return data


}
export const useServiceBySlug = (slug: string) => {
    return useQuery({
        queryKey: ['service', slug],
        queryFn: () => getServiceBySlug(slug),
        enabled: !!slug,
        retry: false,


    })
}

