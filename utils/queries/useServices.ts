import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Service } from "@prisma/client";
const getServices = async () => {
    const { data } = await axios.get<Service[]>(`/api/services`, {});
    return data.sort((a: Service, b: Service) => a.order - b.order);
};
export const useServices = (initialData?: Service[]) => {
    return useQuery({
        queryKey: ['services'],
        initialData,
        queryFn: () => getServices(),
        enabled: true
    });
};
