'use client'
import {useDispatch} from "react-redux";
import {Button} from "@/components/ui/button";
import {open } from "@/stores/dialog-slice";
import {Service} from ".prisma/client";

export function UpdateTrigger({service} : {service: Service|undefined}) {
    const dispatch = useDispatch();

    return (
        <>
        <Button className="cursor-pointer" onClick={() => dispatch(open(service))}>Modifier Service</Button>
        </>
    );
}