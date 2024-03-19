import * as React from 'react';

interface EmailTemplateProps {
    name: string;
    email: string;
    tel: string;
    subject: string;
    message: string;

}

export const EmailInfoTemplate = ({
                                      name, email, tel, subject, message
                                  }: EmailTemplateProps) => (
    <div>
        <h1>Bonjour, Flavien!</h1>
        <p>
            Tu as une nouvelle demande depuis ton site:

        </p>
        <ul>
            <li>Nom : {name}</li>
            <li>Email : {email}</li>
            <li>Téléphone : {tel}</li>
            <li>Sujet : {subject}</li>
            <li>Message : {message}</li>
        </ul>
    </div>
);