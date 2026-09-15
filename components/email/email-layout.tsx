import * as React from "react";
import { Body, Container, Head, Html, Img, Preview, Section, Text } from "@react-email/components";

const domain = process.env.SITE_URL || process.env.NEXT_PUBLIC_URL_DOMAIN || "https://superflavioplomberie.fr";
export const emailSiteUrl = new URL(domain.includes("://") ? domain : `https://${domain}`).origin;
export const emailStyles = {
    heading: { margin: "12px 0 24px", fontSize: "30px", lineHeight: "38px", letterSpacing: "-1px", color: "#234b32", fontWeight: "700" },
    text: { fontSize: "16px", lineHeight: "26px", color: "#465149", margin: "16px 0" },
    label: { fontSize: "11px", lineHeight: "18px", letterSpacing: "1.5px", fontWeight: "700", color: "#55704e", margin: "0" },
    panel: { backgroundColor: "#eef4e9", borderRadius: "12px", padding: "22px", margin: "24px 0" },
    button: { backgroundColor: "#234b32", color: "#ffffff", borderRadius: "8px", fontSize: "14px", fontWeight: "600", textDecoration: "none", padding: "15px 22px", textAlign: "center" as const },
    link: { color: "#234b32", textDecoration: "underline", overflowWrap: "anywhere" as const, wordBreak: "break-word" as const },
};

export function EmailLayout({ preview, label, children }: { preview: string; label: string; children: React.ReactNode }) {
    return <Html lang="fr">
        <Head />
        <Preview>{preview}</Preview>
        <Body style={{ backgroundColor: "#f3f5ef", fontFamily: "Arial, Helvetica, sans-serif", margin: "0", padding: "24px 12px", color: "#263a2d" }}>
            <Container style={{ width: "100%", maxWidth: "580px", margin: "0 auto" }}>
                <Section style={{ backgroundColor: "#234b32", borderRadius: "16px 16px 0 0", padding: "26px 28px" }}>
                    <Img src={`${emailSiteUrl}/assets/logo.png`} width="72" height="72" alt="Super Flavio" style={{ display: "block", backgroundColor: "#ffffff", borderRadius: "12px", marginBottom: "16px" }} />
                    <Text style={{ color: "#ffffff", fontSize: "23px", fontWeight: "700", margin: "0", lineHeight: "30px" }}>Super Flavio</Text>
                    <Text style={{ color: "#dce8d5", fontSize: "13px", lineHeight: "21px", margin: "4px 0 0" }}>Un artisan, plusieurs savoir-faire.</Text>
                </Section>
                <Section style={{ backgroundColor: "#ffffff", borderRadius: "0 0 16px 16px", padding: "30px 28px", border: "1px solid #e3e8de", borderTop: "0" }}>
                    <Text style={emailStyles.label}>{label}</Text>
                    {children}
                </Section>
                <Text style={{ color: "#64715f", fontSize: "12px", lineHeight: "20px", textAlign: "center", margin: "22px 12px" }}>Super Flavio · Artisan multi-services en Corrèze<br />Tulle, Brive-la-Gaillarde et alentours</Text>
            </Container>
        </Body>
    </Html>;
}
