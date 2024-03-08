'use client'
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog"
import { Service} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {useDispatch, useSelector} from "react-redux";
import {close as closeDialog, open as openDialog} from "@/stores/dialog-slice";
import {Controller, Form, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {BaseSyntheticEvent, useEffect, useState} from "react";
import {Label} from "@/components/ui/label";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import {toast} from "@/components/ui/use-toast";
import {BadgeCheck, BadgeX} from "lucide-react";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {queryClient} from "@/providers/query-provider";
import UpdateActive from "@/components/admin/services/UpdateActive";
import dynamic from "next/dynamic";
import {Skeleton} from "@/components/ui/skeleton";

import uploadFile from "@/utils/upload-image";
import supabase from "@/lib/storage";

const ReactQuill = dynamic(() => import("react-quill"), {ssr: false})
export default function UpdateService() {
    const dispatch = useDispatch();
    const service = useSelector((state: any) => state.dialog.service)
    // @ts-ignore
    const {open} = useSelector((state) => state.dialog)
    const [imageObjectUrl, setImageObjectUrl] = useState("");
    const [imageLoading, setImageLoading] = useState(false)
    const {
        register,
        watch,
        setValue,
        control,
        formState: {errors},
        clearErrors,

    } = useForm({
        defaultValues: {
            title: "",
            description: "",

            shortDescription: "",

            image: "",

            slug: "",
            id: "",
            imageAlternatif:"",
            order:0
        }
    })

    useEffect(() => {
        clearErrors()
        setImageObjectUrl("")
        if (service) {

            setValue('title', service.title)
            setValue('description', service.description)

            setValue('slug', service.slug)
            setValue('id', service.id)
            setValue('shortDescription', service.shortDescription)

            setValue("image", service.image)

            setValue('imageAlternatif', service.imageAlternatif)
            setValue('order', service.order)
        } else {

            setValue('title', "")
            setValue('description', "")

            setValue('shortDescription', "")


            setValue("image", "")

            setValue('imageAlternatif', '')
            setValue('order', 0)
        }
    }, [service, open, clearErrors, setValue]);
    const {mutateAsync: updateMutate, isPending: updatePending} = useMutation({

        mutationFn: (data: Partial<Service>) => axios.patch(`/api/services/${data.id}`, data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['services']})
            dispatch(closeDialog())
        }
    })
    const {mutateAsync: addMutate} = useMutation({

        mutationFn: (data: Partial<Service>) => axios.post(`/api/services/`, data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['services']})
            dispatch(closeDialog())
        }
    })


    const handleFileChange = async (event: BaseSyntheticEvent) => {
        let file;
        if (event.target.files) {

            file = event.target.files[0]

        }

        if (file) {
            setImageLoading(true)
            try {
                const image = await uploadFile(file)
                const publicUrl = supabase.storage.from('images').getPublicUrl(image.path)

                setImageObjectUrl(publicUrl.data.publicUrl)

                toast({
                    className: "bg-green-700 text-white z-20",
                    description: (
                        <h2>
                            <BadgeCheck className={'inline mr-1'}/> Image chargée avec succès
                        </h2>

                    ),
                })
                setImageLoading(false)
                return image
            } catch (e) {
                toast({

                    variant: 'destructive',
                    description: (<h2>
                            <BadgeX className={'inline mr-1'}/> Echec upload image
                        </h2>

                    ),
                })
            }

        }
    }

    const onSubmit = async ({data}: { data: Partial<Service> }) => {


        try {


            data.image = imageObjectUrl || service?.image
            data.order = Number(data.order)
            const mutation = service ? await updateMutate(data) : await addMutate(data)

            toast({
                className: "bg-green-700 text-white z-20",
                description: (
                    <h2>
                        <BadgeCheck className={'inline mr-1'}/> {mutation?.data?.message}
                    </h2>

                ),
            })
        } catch (e: any) {
            const messages = await e.response.data.message
            toast({

                variant: 'destructive',
                description: (<h2>
                        <BadgeX className={'inline mr-1'}/> {messages}
                    </h2>

                ),
            })
        }

    }


    return (
        <Dialog open={open} onOpenChange={(open) => dispatch(open ? openDialog(service) : closeDialog())}>

            <DialogContent className="lg:max-w-screen-lg overflow-y-auto max-h-[80vh]">

                <Form control={control} onSubmit={(data) => onSubmit({data: data.data})}>

                    <DialogHeader>
                        <DialogTitle>{service ? "Modifier le service" : "Ajouter un service"}</DialogTitle>

                    </DialogHeader>


                    {service && <Input type="hidden" {...register("id")} />}
                    <div className="flex items-center space-x-2 mt-4">
                        <div className="grid flex-1 gap-2">
                            <div className={"px-3"}>
                                <div className="mb-6">
                                    {!imageLoading && service && service.image || imageObjectUrl ?
                                        (
                                            <div className={"relative w-40 h-40 mx-auto mb-4"}>
                                                <Image src={imageObjectUrl || service.image} fill alt={"image"}/>
                                            </div>
                                        ) : <Skeleton className="h-[125px] w-[250px] rounded-xl mx-auto my-4"/>

                                    }
                                    <Input type="file" {...register("image", {
                                        onChange: handleFileChange
                                    })} />

                                </div>
                                <div className={"flex flex-col gap-2 mb-4"}>
                                    <Label htmlFor="title">Nom du service<span
                                        className={"text-red-600"}>*</span>:</Label>
                                    <Input type="text" value={watch('title')}
                                           placeholder="Titre" {...register("title", {required: "Champs requis"})} />
                                    {errors?.title &&
                                        <p className={'text-red-600 font-light text-sm mb-2'}>{errors.title.message}</p>}
                                </div>

                                <div className={"flex flex-col gap-2 mb-4"}>
                                    <Label htmlFor="duration">Texte alternatif de l&apos;image :</Label>
                                    <Input type="text"
                                           placeholder="Texte alternatif de l'image" {...register("imageAlternatif",)} />
                                    {errors?.imageAlternatif &&
                                        <p className={'text-red-600 font-light text-sm mb-2'}>{errors.imageAlternatif.message}</p>}
                                </div>



                                <div className={"flex flex-col gap-2 mb-4"}>
                                    <Label htmlFor="public">Courte description (Affichage page d&apos;accueil)<span
                                        className={"text-red-600"}>*</span>:</Label>
                                    <Controller name={"shortDescription"} control={control}

                                                rules={{validate: value => value !== '<p><br></p>' || 'Champs requis'}}
                                                render={({field: {value, onChange}}) => <ReactQuill theme="snow"
                                                                                                    placeholder={"Courte description"}
                                                                                                    defaultValue={value || ''}
                                                                                                    onChange={onChange}/>}/>
                                    {errors?.shortDescription &&
                                        <p className={'text-red-600 font-light text-sm mb-2'}>{errors.shortDescription.message}</p>}
                                </div>
                                <div className={"flex flex-col gap-2 mb-4"}>
                                    <Label htmlFor="public">Description détaillée<span
                                        className={"text-red-600"}>*</span> :</Label>
                                    <Controller name={"description"} control={control}

                                                rules={{validate: value => value !== '<p><br></p>' || 'Champs requis'}}
                                                render={({field}) => <ReactQuill theme="snow"
                                                                                 placeholder={"Description détaillée"}  {...field} />}/>
                                    {errors?.description &&
                                        <p className={'text-red-600 font-light text-sm mb-2'}>Champs requis</p>}
                                </div>
                                <div className={"flex flex-col gap-2 mb-4"}>
                                    <Label htmlFor="public">Ordre d&apos;affichage :</Label>
                                    <div className="relative mt-2 rounded-md shadow-sm">

                                        <Input type="number"
                                               placeholder="Prix" {...register("order")}
                                               min={0} step={1}
                                               defaultValue={0}
                                        />
          {/*                              <div*/}
          {/*                                  className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">*/}
          {/*<span className="text-gray-500 sm:text-sm" id="price-currency">*/}
          {/*  €*/}
          {/*</span>*/}
          {/*                              </div>*/}
                                    </div>

                                    {errors?.order &&
                                        <p className={'text-red-600 font-light text-sm mb-2'}>{errors.order.message}</p>}
                                </div>
                                <div className={"flex flex-col gap-2 mb-4"}>
                                    {service && <UpdateActive id={service.id} active={service.active}/>}
                                </div>
                            </div>


                        </div>

                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Fermer
                            </Button>
                        </DialogClose>
                        <Button disabled={imageLoading} type="submit">{updatePending ?
                            <div
                                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status">
                            <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >Mise à jour...</span
                            >
                            </div> : "Enregistrer"}</Button>
                    </DialogFooter>
                </Form>
            </DialogContent>

        </Dialog>
    )


}

