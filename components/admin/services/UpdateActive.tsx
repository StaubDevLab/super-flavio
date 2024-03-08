'use client'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

import {useMutation} from "@tanstack/react-query";

import axios from "axios";
import {queryClient} from "@/providers/query-provider";
export default function UpdateActive({id, active} : {id: string, active: boolean}) {

    const {mutateAsync} = useMutation({

        mutationFn: (data:{id: string, active: boolean}) => axios.patch(`/api/services/${data.id}`, data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['services']})
        }
    })
    return (
        <div className="flex items-center space-x-2">

            <Switch id="active" defaultChecked={active} onCheckedChange={async (value) => {

                await mutateAsync({id, active: value})
            }} />
            <Label htmlFor="airplane-mode">Service visible</Label>

        </div>
    );
}