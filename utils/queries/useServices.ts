import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Service} from ".prisma/client";

const getServices = async () => {
    const {data} = await axios.get(`/api/services`, {
        params: {
            sort: {"order": "desc"},
        },
    })
    return data.sort((a: Service, b: Service) => a.order - b.order)

}
export const useServices = () => {
    return useQuery({
        queryKey: ['services'],
        queryFn: () => getServices(),
        enabled: true

    })
}

