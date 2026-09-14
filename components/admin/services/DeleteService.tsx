import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/providers/query-provider";
import { toast } from "@/components/ui/use-toast";
import { BadgeCheck, BadgeX } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
export default function DeleteService({ id }: {
    id: string;
}) {
    const { mutateAsync: deleteService, isPending } = useMutation({
        mutationFn: () => axios.delete(`/api/services/${id}`),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['services'] });
        }
    });
    const deleteServiceTrigger = async () => {
        try {
            const mutation = await deleteService();
            toast({
                className: "bg-green-700 text-white z-20",
                description: (<h2>
                    <BadgeCheck className={'inline mr-1'} /> {mutation?.data?.message}
                </h2>),
            });
        }
        catch (e: any) {
            const messages = e.response?.data?.message || "Impossible de supprimer le service. Réessayez.";
            toast({
                variant: 'destructive',
                description: (<h2>
                    <BadgeX className={'inline mr-1'} /> {messages}
                </h2>),
            });
        }
    };
    return (<AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-destructive" disabled={isPending}>Supprimer</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Supprimer ce service ?</AlertDialogTitle>
                <AlertDialogDescription>
                    Cette action ne peut pas être annulée. Cela supprimera définitivement le service.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction className={"bg-destructive"} onClick={() => deleteServiceTrigger()}>Supprimer</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>);
}
;
