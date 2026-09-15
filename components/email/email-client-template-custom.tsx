import * as React from "react";
import { Button, Heading, Link, Section, Text } from "@react-email/components";
import { EmailLayout, emailSiteUrl, emailStyles as styles } from "./email-layout";

export function EmailToClientTemplateCustom({ name }: { name: string }) {
    const phone = process.env.NEXT_PUBLIC_PHONE;
    return <EmailLayout preview="Votre demande est bien reçue. Flavien reviendra vers vous pour parler de votre projet." label="DEMANDE BIEN REÇUE">
        <Heading as="h1" style={styles.heading}>Votre projet commence ici.</Heading>
        <Text style={styles.text}>Bonjour {name},</Text>
        <Text style={styles.text}>Merci de m’avoir contacté et de m’avoir parlé de votre projet. Votre message m’a bien été transmis.</Text>
        <Section style={styles.panel}>
            <Text style={styles.label}>ET MAINTENANT ?</Text>
            <Text style={{ ...styles.text, margin: "8px 0 0" }}>Je vais prendre connaissance de votre demande et revenir vers vous pour préciser vos besoins et échanger sur la suite.</Text>
        </Section>
        <Text style={styles.text}>Un détail à ajouter ou une photo à partager ? Répondez simplement à cet e-mail.</Text>
        {phone && <Text style={styles.text}>Pour une demande urgente, vous pouvez aussi m’appeler au <Link href={`tel:${phone.replace(/\s/g, "")}`} style={styles.link}>{phone}</Link>.</Text>}
        <Section style={{ margin: "28px 0" }}>
            <Button href={`${emailSiteUrl}/services`} style={styles.button}>Découvrir mes services</Button>
        </Section>
        <Text style={{ ...styles.text, marginBottom: "0" }}>À bientôt,<br /><strong style={{ color: "#234b32" }}>Flavien</strong><br />Votre artisan Super Flavio</Text>
    </EmailLayout>;
}
