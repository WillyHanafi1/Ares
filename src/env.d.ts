/// <reference types="astro/client" />

// Extend Astro's Locals interface to include our custom properties
declare namespace App {
    interface Locals {
        /** CSP nonce for inline scripts */
        nonce: string;
    }
}
