'use client';
import { ColumnDef } from "@tanstack/react-table";
import type { Service } from "@prisma/client";
import { ArrowUpDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpdateTrigger } from "@/components/admin/services/UpdateTrigger";
import UpdateActive from "@/components/admin/services/UpdateActive";
import DeleteService from "@/components/admin/services/DeleteService";
export const columns: ColumnDef<Service>[] = [
    {
        accessorKey: "title", header: ({ column }) =>
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Service <ArrowUpDown size={14} className="ml-2" />
            </Button>, cell: ({ row }) =>
                <div className="min-w-[180px]">
                    <p className="font-semibold">
                        {row.original.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {row.original.priceLabel || "Tarif non renseigné"}
                    </p>
                </div>
    },
    {
        accessorKey: "category", header: "Métier", cell: ({ row }) =>
            <span className="rounded-full bg-[#eef4e9] text-[#234b32] px-3 py-1 text-xs whitespace-nowrap">
                {row.original.category || "Plomberie"}
            </span>
    },
    {
        accessorKey: "order", header: ({ column }) =>
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Ordre <ArrowUpDown size={14} className="ml-2" />
            </Button>
    },
    {
        accessorKey: "featured", header: "Accueil", cell: ({ row }) => row.original.featured ? <span className="inline-flex gap-1 items-center text-xs text-primary whitespace-nowrap">
            <Star size={14} /> Mis en avant</span> : <span className="text-xs text-muted-foreground">Standard</span>
    },
    {
        id: "active", header: "Publication", cell: ({ row }) =>
            <div className="flex items-center gap-2">
                <UpdateActive id={row.original.id} active={row.original.active} />
                <span className="text-xs">
                    {row.original.active ? "Publié" : "Brouillon"}
                </span>
            </div>
    },
    {
        id: "actions", header: "Actions", cell: ({ row }) =>
            <div className="flex items-center gap-2">
                <UpdateTrigger service={row.original} />
                <DeleteService id={row.original.id} />
            </div>
    },
];
