import {EmailInfoTemplate} from "@/components/email/email-info-template";
import {EmailToClientTemplateCustom} from "@/components/email/email-client-template-custom";
import { render } from '@react-email/render';
import sendgrid from '@sendgrid/mail';
sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY ||"");
export async function POST(req:Request, res:Request) {
    const body = req ? await req.json() : null
    const { name, email, tel,subject,message } = body
    // @ts-ignore
    const emailHtml = render(EmailToClientTemplateCustom({name}));
    const optionsToClient = {
        from: "contact@superflavioplomberie.fr",
        to: email,
        subject: 'Flavien STAUB Plombier - Prise en compte de votre demande',
        html: emailHtml,
    };
    const emailHtmlToInfos = render(EmailInfoTemplate({ name, email, tel, subject, message }));
    const optionsToInfos = {
        from:  "contact@superflavioplomberie.fr",
        to:  process.env.NEXT_PUBLIC_EMAIL || "flavien.staub@gmail.com",
        subject: 'SuperFlavio - Nouvelle demande',
        html: emailHtmlToInfos,
    };
    try {
        await sendgrid.send(optionsToInfos).then(res => console.log(res)).catch(err => console.log(err));

        await sendgrid.send(optionsToClient).then(res => console.log(res)).catch(err => console.log(err));

        return Response.json({ }, { status: 200 });
    } catch (error) {
        return Response.json({ error });
    }
}