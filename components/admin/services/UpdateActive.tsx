'use client';
import { Switch } from "@/components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/providers/query-provider";
import { toast } from "@/components/ui/use-toast";
export default function UpdateActive({ id, active }: {
    id: string;
    active: boolean;
}) {
    const mutation = useMutation({
        mutationFn: (value: boolean) => axios.patch(`/api/services/${id}`, { active: value }), onSuccess: async () => {
            await Promise.all([queryClient.invalidateQueries({ queryKey: ['services'] }), queryClient.invalidateQueries({ queryKey: ['service'] })]);
        }, onError: () => toast({ variant: "destructive", description: "La publication n’a pas pu être modifiée. Réessayez." })
    });
    return <Switch id={`active-${id}`} aria-label="Publier le service" checked={active} disabled={mutation.isPending} onCheckedChange={value => mutation.mutate(value)} />;
}
