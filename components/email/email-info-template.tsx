import * as React from "react";
import { Button, Heading, Link, Section, Text } from "@react-email/components";
import { EmailLayout, emailStyles as styles } from "./email-layout";

interface EmailTemplateProps {
    name: string;
    email: string;
    tel: string;
    subject: string;
    message: string;
}

export function EmailInfoTemplate({ name, email, tel, subject, message }: EmailTemplateProps) {
    return <EmailLayout preview={`Nouvelle demande de ${name} : ${subject}`} label="NOUVELLE DEMANDE DU SITE">
        <Heading as="h1" style={styles.heading}>Un nouveau projet pour toi.</Heading>
        <Text style={styles.text}>Bonjour Flavien,<br />{name} t’a envoyé une demande depuis le formulaire de contact.</Text>
        <Section style={styles.panel}>
            <Text style={styles.label}>LE CONTACT</Text>
            <Text style={{ ...styles.text, margin: "10px 0 4px", color: "#234b32", fontWeight: "700", overflowWrap: "anywhere" }}>{name}</Text>
            <Text style={{ ...styles.text, margin: "4px 0" }}><Link href={`mailto:${email}`} style={styles.link}>{email}</Link></Text>
            <Text style={{ ...styles.text, margin: "4px 0 0" }}><Link href={`tel:${tel.replace(/\s/g, "")}`} style={styles.link}>{tel}</Link></Text>
        </Section>
        <Text style={styles.label}>OBJET DE LA DEMANDE</Text>
        <Heading as="h2" style={{ fontSize: "20px", lineHeight: "28px", color: "#263a2d", margin: "8px 0 22px", overflowWrap: "anywhere" }}>{subject}</Heading>
        <Text style={styles.label}>SON MESSAGE</Text>
        <Section style={{ borderLeft: "3px solid #9bb68b", paddingLeft: "18px", margin: "12px 0 26px" }}>
            <Text style={{ ...styles.text, margin: "0", whiteSpace: "pre-wrap", overflowWrap: "anywhere", wordBreak: "break-word" }}>{message}</Text>
        </Section>
        <Button href={`mailto:${email}?subject=${encodeURIComponent(`Re: ${subject}`)}`} style={styles.button}>Répondre à {name}</Button>
        <Text style={{ ...styles.text, fontSize: "13px", lineHeight: "21px", marginBottom: "0" }}>Tu peux aussi utiliser « Répondre » dans ta messagerie : ta réponse sera adressée directement au client.</Text>
    </EmailLayout>;
}
