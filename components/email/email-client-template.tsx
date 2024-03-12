

import * as React from 'react';

interface EmailTemplateProps {
    name: string;

}

export const EmailClientTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
                                                                          name,
                                                                          ...props
                                                                      }) => (
    <div>
        <h1>Bonjour, {name}!</h1>
        <p>Je vais prendre connaissance de votre demande et y apporter une réponse le plus rapidement possible. </p>
        <p>N&apos;hésitez pas à m&apos;envoyer un SMS ou m&apos;appeler au {process.env.NEXT_PUBLIC_PHONE} si votre demande est urgente.</p>
        <p>À très vite.
            Flavien STAUB - Plombier agrée</p>
    </div>
);