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
        <div className="fixed bottom-5 left-5 z-50 bg-white border border-gray-200 shadow-xl rounded-2xl p-5 max-w-sm w-[calc(100%-2.5rem)] transition-opacity duration-300">
            <div className="flex flex-col items-center text-center">
                <p className="text-sm text-gray-700 mb-4">
                    Ce site utilise des cookies pour mesurer son audience. Vous pouvez les accepter ou les refuser.
                </p>
                <div className="flex space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        onClick={() => setCookieConsent(false)}
                    >
                        Refuser
                    </button>
                    <button
                        className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-[#3c784b] focus:outline-none focus:ring-2 focus:ring-primary"
                        onClick={() => setCookieConsent(true)}
                    >
                        Accepter
                    </button>
                </div>
            </div>
        </div>
    );
}
