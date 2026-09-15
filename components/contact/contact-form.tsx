'use client';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { BadgeCheck, BadgeX } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { z } from "zod";
import { contactSchema as formSchema } from "@/lib/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";

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
    });
    useEffect(() => {
        const selected = new URLSearchParams(window.location.search).get("service");
        if (selected)
            form.setValue("subject", selected.slice(0, 50));
    }, [form]);
    const lengthTextarea = form.watch("message").length;
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await axios.post('/api/send', values);
            toast({
                duration: 7000,
                title: <span className="flex items-center gap-3 text-base tracking-tight"><span className="rounded-xl bg-[#e8eee3] p-2"><BadgeCheck size={22} aria-hidden="true" /></span>Votre demande est envoyée</span>,
                description: "Merci pour votre message ! Flavien reviendra vers vous pour parler de votre projet.",
            });
            return form.reset();
        }
        catch {
            toast({
                variant: 'destructive',
                duration: 9000,
                title: <span className="flex items-center gap-3 text-base tracking-tight"><span className="rounded-xl bg-[#f8e8df] p-2"><BadgeX size={22} aria-hidden="true" /></span>L’envoi n’a pas abouti</span>,
                description: "Réessayez dans un instant ou contactez Flavien par téléphone. Votre message est conservé dans le formulaire.",
            });
        }
    }
    return (<>
        <div className={"flex-1 w-full min-h-full"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <FormField control={form.control} name="name" render={({ field }) => (<FormItem>
                        <FormLabel>Nom Prénom :</FormLabel>
                        <FormControl>
                            <Input placeholder="NOM et Prénom" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>)} />
                    <div className={'flex flex-col md:flex-row w-full justify-between items-center gap-2'}>
                        <FormField control={form.control} name="email" render={({ field }) => (<FormItem className={"w-full"}>
                            <FormLabel>Email :</FormLabel>
                            <FormControl>
                                <Input type={"email"} placeholder="E-mail - exemple@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)} />
                        <FormField control={form.control} name="tel" render={({ field }) => (<FormItem className={"w-full"}>
                            <FormLabel>Téléphone :</FormLabel>
                            <FormControl>
                                <Input type={"tel"} placeholder="Téléphone - 0600000000" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)} />
                    </div>
                    <FormField control={form.control} name="subject" render={({ field }) => (<FormItem>
                        <FormLabel>Objet :</FormLabel>
                        <FormControl>
                            <Input type={"text"} placeholder="Objet de votre demande" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>)} />
                    <FormField control={form.control} name="message" render={({ field }) => (<FormItem>
                        <FormLabel>Message :</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Votre message (1000 caractères)" {...field} />
                        </FormControl>
                        <FormDescription>
                            {`${1000 - lengthTextarea} caractères restants`}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>)} />
                    <Button className={'self-start'} type="submit" disabled={form.formState.isSubmitting}> {form.formState.isSubmitting ? <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-8 border-t-secondary px-2" /> : "Envoyer ma demande"}
                    </Button>
                </form>
            </Form>
            <Toaster />
        </div>
    </>);
}
