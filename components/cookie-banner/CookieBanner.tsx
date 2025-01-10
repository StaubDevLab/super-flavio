"use client";

import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "@/lib/storage-helper";

export default function CookieBanner() {
    const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedCookieConsent = getLocalStorage("cookie_consent", null);
        setCookieConsent(storedCookieConsent);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (cookieConsent !== null) {
            setLocalStorage("cookie_consent", cookieConsent);
        }

        const newValue = cookieConsent ? "granted" : "denied";

        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("consent", "update", {
                analytics_storage: newValue,
            });
        }
    }, [cookieConsent]);

    if (isLoading || cookieConsent !== null) {
        return null;
    }

    return (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-200 shadow-lg rounded-lg p-6 max-w-md w-11/12 transition-opacity duration-300">
            <div className="flex flex-col items-center text-center">
                <p className="text-sm text-gray-700 mb-4">
                    Nous utilisons des cookies pour améliorer votre expérience. En cliquant sur &quot;Accepter&quot;, vous consentez à l'utilisation de cookies et nous permet de mesurer l'audience de notre site.
                </p>
                <div className="flex space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        onClick={() => setCookieConsent(false)}
                    >
                        Refuser
                    </button>
                    <button
                        className="px-4 py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                        onClick={() => setCookieConsent(true)}
                    >
                        Accepter
                    </button>
                </div>
            </div>
        </div>
    );
}
