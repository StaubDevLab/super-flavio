'use client'
import {useForm, Controller} from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {useState} from "react";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {BadgeCheck, BadgeX} from "lucide-react";
import {Toaster} from "@/components/ui/toaster";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {Textarea} from "@/components/ui/textarea";
import {Separator} from "@/components/ui/separator";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    tel: z.string().min(2).max(50),
    subject: z.string().min(2).max(50),
    message: z.string().min(2).max(50),

})
export function ContactForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            tel: "",
            subject: "",
            message: "",
        },
    })

    const [lengthTextarea, setLengthTextarea] = useState(0)
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <>
        <div className={"flex-1 w-full min-h-full"}>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom Prénom :</FormLabel>
                                <FormControl>
                                    <Input placeholder="NOM et Prénom" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className={'flex flex-col md:flex-row w-full justify-between items-center gap-2'}>
                        <FormField

                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className={"w-full"}>
                                    <FormLabel>Email :</FormLabel>
                                    <FormControl>
                                        <Input  type={"email"} placeholder="E-mail - exemple@email.com" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tel"
                            render={({ field }) => (
                                <FormItem className={"w-full"}>
                                    <FormLabel>Téléphone :</FormLabel>
                                    <FormControl>
                                        <Input type={"tel"} placeholder="Téléphone - 0600000000" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Objet :</FormLabel>
                                <FormControl>
                                    <Input type={"text"} placeholder="Objet de votre demande" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message :</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Votre message (350 caractères)" {...field} onChange={(e) => setLengthTextarea(e.target.value.length)}/>

                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className={'self-start'} type="submit">Envoyer</Button>
                </form>
            </Form>
            <Toaster/>

        </div>

        </>
    );
}