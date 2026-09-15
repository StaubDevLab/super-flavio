"use client";

import { useState, useEffect } from "react";
import { Cookie } from "lucide-react";
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
        <section
            aria-labelledby="cookie-banner-title"
            aria-describedby="cookie-banner-description"
            className="fixed bottom-4 left-4 right-4 z-50 max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl border border-[#234b32]/10 bg-[#fafbf7] p-6 shadow-xl shadow-[#234b32]/10 sm:bottom-6 sm:left-6 sm:right-auto sm:w-[400px]"
        >
            <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8eee3] text-[#234b32]">
                    <Cookie size={22} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <p className="text-[10px] font-semibold tracking-[.17em] text-[#55704e]">VOTRE CONFORT DE NAVIGATION</p>
            </div>
            <h2 id="cookie-banner-title" className="text-xl font-semibold tracking-tight text-[#234b32]">Une petite place pour les cookies ?</h2>
            <p id="cookie-banner-description" className="mt-3 text-sm leading-relaxed text-[#5e6a60]">
                Les cookies de mesure d’audience m’aident à comprendre les visites et à améliorer le site. Vous pouvez les accepter ou les refuser : le site reste accessible dans les deux cas.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                    type="button"
                    className="rounded-xl border border-[#234b32]/20 px-4 py-3 text-sm font-semibold text-[#234b32] transition-colors hover:bg-[#e8eee3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#234b32]"
                    onClick={() => setCookieConsent(false)}
                >
                    Refuser
                </button>
                <button
                    type="button"
                    className="rounded-xl bg-[#234b32] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#315f40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#234b32]"
                    onClick={() => setCookieConsent(true)}
                >
                    Accepter
                </button>
            </div>
        </section>
    );
}
