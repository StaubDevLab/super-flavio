import { EmailInfoTemplate } from "@/components/email/email-info-template";
import { EmailToClientTemplateCustom } from "@/components/email/email-client-template-custom";
import { contactSchema } from "@/lib/contact";
import { Resend } from "resend";

export async function POST(req: Request) {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return Response.json({ error: "Requête invalide." }, { status: 400 });
    }
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
        return Response.json({ error: "Vérifiez les champs du formulaire." }, { status: 400 });
    }
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return Response.json({ error: "L’envoi de messages est indisponible." }, { status: 503 });
    }
    const from = process.env.RESEND_FROM_EMAIL || "contact@superflavioplomberie.fr";
    const to = process.env.CONTACT_EMAIL || process.env.NEXT_PUBLIC_EMAIL || "flavien.staub@gmail.com";
    const values = parsed.data;
    try {
        const resend = new Resend(apiKey);
        const notification = await resend.emails.send({
            from,
            to,
            reply_to: values.email,
            subject: "Super Flavio - Nouvelle demande",
            react: EmailInfoTemplate(values),
        });
        if (notification.error || !notification.data) {
            console.error("Contact: échec de la notification Resend.");
            return Response.json({ error: "Votre demande n’a pas pu être envoyée." }, { status: 502 });
        }
        // La demande est déjà transmise : un échec de l’accusé ne doit pas
        // inviter le visiteur à renvoyer la même demande à l’artisan.
        let confirmationSent = false;
        try {
            const confirmation = await resend.emails.send({
                from,
                to: values.email,
                reply_to: to,
                subject: "Super Flavio - Prise en compte de votre demande",
                react: EmailToClientTemplateCustom({ name: values.name }),
            });
            confirmationSent = Boolean(confirmation.data && !confirmation.error);
        } catch {
            confirmationSent = false;
        }
        if (!confirmationSent) console.error("Contact: échec de l’accusé de réception Resend.");
        return Response.json({ success: true, confirmationSent });
    } catch {
        console.error("Contact: service Resend indisponible.");
        return Response.json({ error: "Votre demande n’a pas pu être envoyée." }, { status: 502 });
    }
}
