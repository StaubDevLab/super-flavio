'use client'
import React from "react";

import {open} from "@/stores/dialog-slice";
import {columns} from "@/app/admin/services/columns";
import {DataTable} from "@/app/admin/services/data-table";
import {useServices} from "@/utils/queries/useServices";
import {useSession} from "next-auth/react";
import UpdateService from "@/components/admin/services/UpdateService";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {toast} from "@/components/ui/use-toast";
import {Toaster} from "@/components/ui/toaster";
import {Button} from "@/components/ui/button";
import Header from "@/components/header/Header";


export default function AdminPage() {

    const dispatch = useDispatch();

    const router = useRouter()

    const session = useSession({
        required: true, onUnauthenticated: () =>
            router.push("/api/auth/signin")
    })

    const {data: services, isFetching, error} = useServices();

    if (isFetching) {

        toast({
            description: (
                <div className={"flex justify-start gap-2 items-center"}>

                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 rounded-full animate-pulse dark:bg-white"></div>
                        <div className="w-3 h-3 rounded-full animate-pulse dark:bg-white"></div>
                        <div className="w-3 h-3 rounded-full animate-pulse dark:bg-white"></div>
                    </div>
                    <p className={"inline"}>Les services sont en cours de chargement...</p>
                </div>
            ),

        })
    }


    return (
        <>
            <Header/>
            <div className={"p-10 flex flex-col gap-2 items-center flex-grow"}>

                {session.status === "authenticated" && services && (<>
                    <h1 className={"text-4xl"}>Gestion des Services</h1>
                    <Button onClick={() => dispatch(open(undefined))}>Ajouter un service</Button>
                    <div className={"w-full px-4"}>
                        <DataTable columns={columns} data={services as any}/>
                    </div>
                </>)
                }
                {session.status === "authenticated" && services && <UpdateService/>}

                <Toaster/>
            </div>
        </>

    )
}