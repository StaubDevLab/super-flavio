import * as React from 'react';

interface EmailTemplateProps {
    name: string;
    email: string;
    tel: string;
    subject: string;
    message: string;

}

export const EmailInfoTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
                                                                                name,
                                                                                ...props
                                                                            }) => (
    <div>
        <h1>Bonjour, Flavien!</h1>
        <p>
            Tu as une nouvelle demande depuis ton site:

        </p>
        <ul>
            <li>Nom : {name}</li>
            <li>Email : {props.email}</li>
            <li>Téléphone : {props.tel}</li>
            <li>Sujet : {props.subject}</li>
            <li>Message : {props.message}</li>
        </ul>
    </div>
);