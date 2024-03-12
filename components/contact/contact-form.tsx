'use client'
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useState} from "react";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {BadgeCheck, BadgeX} from "lucide-react";
import {Toaster} from "@/components/ui/toaster";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {Textarea} from "@/components/ui/textarea";

const formSchema = z.object({
    name: z.string({
        required_error: "Nom requis",

    })
        .min(2, {message: "Doit contenir entre 2 et 50 caractères"})
        .max(50, {message: "Doit contenir entre 2 et 50 caractères"}),
    email: z.string({
        required_error: "Email requis",

    }).email({message: "Email invalide"}),
    tel: z.string({
        required_error: "Téléphone requis",

    }).min(2,{message: "Doit contenir entre 2 et 50 caractères"})
        .max(50,{message: "Doit contenir entre 2 et 50 caractères"})
        .regex(new RegExp("^(?:(?:\\+|00)33|0)\\s*[1-9](?:\\s*\\d{2}){4}$"), {message: "Téléphone invalide"}),
    subject: z.string({
        required_error: "Sujet requis",

    }).min(2,{message: "Doit contenir entre 2 et 50 caractères"})
        .max(50,{message: "Doit contenir entre 2 et 50 caractères"}),
    message: z.string({
        required_error: "Message requis",

    }).min(2,{message: "Doit contenir entre 2 et 1000 caractères"})
        .max(1000,{message: "Doit contenir entre 2 et 1000 caractères"}),

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

    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {

            const response = await axios.post('/api/send', values);
            toast({
                className: "bg-green-700 text-white z-20",
                description: (
                    <h2>
                        <BadgeCheck className={'inline mr-1'}/> Message bien envoyé !
                    </h2>

                ),
            })
            return form.reset()
        } catch (e: any) {
            toast({

                variant: 'destructive',
                description: (<h2>
                        <BadgeX className={'inline mr-1'}/> Une erreur est survenue !
                    </h2>

                ),
            })
        }
    }

    return (
        <>
            <div className={"flex-1 w-full min-h-full"}>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nom Prénom :</FormLabel>
                                    <FormControl>
                                        <Input placeholder="NOM et Prénom" {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className={'flex flex-col md:flex-row w-full justify-between items-center gap-2'}>
                            <FormField

                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem className={"w-full"}>
                                        <FormLabel>Email :</FormLabel>
                                        <FormControl>
                                            <Input type={"email"} placeholder="E-mail - exemple@email.com" {...field} />
                                        </FormControl>

                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tel"
                                render={({field}) => (
                                    <FormItem className={"w-full"}>
                                        <FormLabel>Téléphone :</FormLabel>
                                        <FormControl>
                                            <Input type={"tel"} placeholder="Téléphone - 0600000000" {...field} />
                                        </FormControl>

                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="subject"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Objet :</FormLabel>
                                    <FormControl>
                                        <Input type={"text"} placeholder="Objet de votre demande" {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Message :</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Votre message (1000 caractères)" {...field}  onKeyUp={(e) => setLengthTextarea(e.currentTarget.value.length)}/>

                                    </FormControl>
                                    <FormDescription>
                                        {`${1000 - lengthTextarea} caractères restantes`}
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button className={'self-start'} type="submit"
                                disabled={form.formState.isSubmitting}> {form.formState.isSubmitting ? <div
                            className="border-gray-300 h-8 w-8 animate-spin rounded-full border-8 border-t-secondary px-2"/> : "Envoyer"}</Button>
                    </form>
                </Form>
                <Toaster/>

            </div>

        </>
    );
}