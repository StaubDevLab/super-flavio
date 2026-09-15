import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { realisationPhotos, type RealisationItem } from "@/lib/realisations";
export function useRealisations(admin = false, enabled = true, initialData?: RealisationItem[]) {
    return useQuery({
        queryKey: ['realisations', admin ? 'admin' : 'public'],
        initialData,
        queryFn: async () => {
            const { data } = await axios.get<RealisationItem[]>(`/api/realisations${admin ? '?admin=1' : ''}`);
            return data.map(item => ({ ...item, images: realisationPhotos(item.images) }));
        }, enabled, retry: 1,
    });
}
