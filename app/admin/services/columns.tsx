"use client"
import {ColumnDef} from "@tanstack/table-core";
import {Service} from ".prisma/client";
import {ArrowUpDown, MoreVertical} from "lucide-react"

import { Button } from "@/components/ui/button"

import {UpdateTrigger} from "@/components/admin/services/UpdateTrigger";
import UpdateActive from "@/components/admin/services/UpdateActive";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import DeleteService from "@/components/admin/services/DeleteService";
export const columns: ColumnDef<Service>[] = [
    {
        accessorKey: 'title',
        header: 'Titre',
        cell: info => info.getValue()
    },



    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {

            const service = row.original


            return (
                <Popover>
                    <PopoverTrigger className="cursor-pointer">
                        <MoreVertical />
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-2">
                        <UpdateTrigger service={service}/>
                        <DeleteService id={service.id}/>
                    </PopoverContent>
                </Popover>



            )
        },
    },
    {
        id: "active",
        header: "Visible ?",
        cell: ({ row }) => {

            const service = row.original


            return (

                        <UpdateActive id={service.id} active={service.active}/>


            )
        },
    },
]