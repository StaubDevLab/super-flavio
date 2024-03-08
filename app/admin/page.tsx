'use client'
import React from "react";
import {useSession} from "next-auth/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import Header from "@/components/header/Header";
export default function AdminPage() {
    const {data: session} = useSession()


    return (
<>
    <Header/>
        <div className={"p-10 flex flex-col gap-2 items-center flex-grow"}>

            <h1 className={'text-3xl'}>Bienvenue {session?.user?.name}</h1>
            <Table>
                <TableCaption>La liste des panneaux admin.</TableCaption>
                <TableHeader>
                    <TableRow>

                        <TableHead  className={"text-center"}>Services</TableHead>


                    </TableRow>
                </TableHeader>
                <TableBody>

                        <TableRow key={"services"}>
                            <TableCell className="font-medium text-center underline text-primary"><Link href={'/admin/services'}>Accès aux services</Link></TableCell>
                        </TableRow>


                </TableBody>

            </Table>
        </div>
</>

    )
}