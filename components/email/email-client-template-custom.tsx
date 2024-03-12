import {Body, Container, Head, Heading, Html, Img, Preview, Row, Section, Text,} from "@react-email/components";
import {Tailwind} from "@react-email/tailwind";
import * as React from "react";

interface EmailToClientTemplateProps {
    name: string
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_URL_DOMAIN}`
    : "";


export const EmailToClientTemplate = ({
                                        name
                                    }: EmailToClientTemplateProps) => {
    return (
        <Html>
            <Head/>
            <Preview>SuperFlavio - Plomberie</Preview>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                brand: "#519e65",
                                offwhite: "#fafbfb",
                            },
                            spacing: {
                                0: "0px",
                                20: "20px",
                                45: "45px",
                            },
                        },
                    },
                }}
            >
                <Body className="bg-offwhite text-base font-sans">
                    <Img

                        src={`${baseUrl}/assets/logo.png`}
                        width="184"
                        height="184"
                        alt="Logo SuperFlavio Plomberie"
                        className="mx-auto my-20"
                    />
                    <Container className="bg-white p-45">
                        <Heading className="text-center my-0 leading-8">
                            Vous avez fait le bon choix !
                        </Heading>

                        <Section>
                            <Row>
                                <Text className="text-lg">
                                    Bonjour, {name}
                                </Text>
                                <Text className="text-base">
                                    Je vais prendre connaissance de votre demande et y apporter une réponse le plus
                                    rapidement possible.
                                </Text>

                                <Text className="text-base">N&apos;hésitez pas à m&apos;envoyer un SMS ou m&apos;appeler
                                    au {process.env.NEXT_PUBLIC_PHONE} si votre demande est urgente.</Text>
                            </Row>
                        </Section>


                        <Section className="text-center">
                            <a href={`${baseUrl}/services`}
                               className="bg-brand text-white no-underline rounded-lg py-3 px-[18px]">
                                Retrouvez mes services
                            </a>
                        </Section>


                    </Container>

                    <Container className="mt-20">

                        <Text className="text-center text-gray-400 mb-45">
                            SuperFlavio - Votre plombier sur la Corrèze !
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default EmailToClientTemplate;
