'use client'
import {Button} from "@/components/ui/button";
import React from "react";
import {useRouter} from "next/navigation";

export default function HeaderButton({content}: { content :string }) {
    const router = useRouter()
    return (
        <>
            <Button className={"text-lg"} onClick={() => router.push("/contact")}>{content}</Button>
        </>
    );
}