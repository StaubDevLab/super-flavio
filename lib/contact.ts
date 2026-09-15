import { z } from "zod";
export const contactSchema = z.object({
    name: z.string({
        required_error: "Nom requis",
    })
        .min(2, { message: "Doit contenir entre 2 et 50 caractères" })
        .max(50, { message: "Doit contenir entre 2 et 50 caractères" }),
    email: z.string({
        required_error: "Email requis",
    }).email({ message: "Email invalide" }),
    tel: z.string({
        required_error: "Téléphone requis",
    }).min(2, { message: "Doit contenir entre 2 et 50 caractères" })
        .max(50, { message: "Doit contenir entre 2 et 50 caractères" })
        .regex(new RegExp("^(?:(?:\\+|00)33|0)\\s*[1-9](?:\\s*\\d{2}){4}$"), { message: "Téléphone invalide" }),
    subject: z.string({
        required_error: "Sujet requis",
    }).min(2, { message: "Doit contenir entre 2 et 50 caractères" })
        .max(50, { message: "Doit contenir entre 2 et 50 caractères" }),
    message: z.string({
        required_error: "Message requis",
    }).min(2, { message: "Doit contenir entre 2 et 1000 caractères" })
        .max(1000, { message: "Doit contenir entre 2 et 1000 caractères" }),
});
