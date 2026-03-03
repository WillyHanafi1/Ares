"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import type { ReactNode } from "react";

interface ReCaptchaProviderProps {
    children: ReactNode;
    reCaptchaKey: string | undefined;
}

export function ReCaptchaProvider({ children, reCaptchaKey }: ReCaptchaProviderProps) {
    if (!reCaptchaKey) {
        // Apabila site key reCAPTCHA tidak tersedia di Environment Variable
        console.warn("reCAPTCHA site key is missing. ReCAPTCHA verification will fail.");
        return <>{children}</>;
    }

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={reCaptchaKey}
            scriptProps={{
                async: false,
                defer: false,
                appendTo: "head",
                nonce: undefined,
            }}
        >
            {children}
        </GoogleReCaptchaProvider>
    );
}
