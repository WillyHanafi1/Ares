/**
 * Contact Form Script
 * Handles form submission, validation, reCAPTCHA, and country dropdown
 */

(function () {
    'use strict';

    const section = document.getElementById("kontak");
    const form = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");
    const successMessage = document.getElementById("success-message");
    const resetFormBtn = document.getElementById("reset-form-btn");
    const phoneError = document.getElementById("phone-error");
    const originalBtnText = submitBtn?.innerHTML || "";

    // Get config from data attributes
    const recaptchaSiteKey = section?.dataset.recaptcha || "";

    // === Client-side Rate Limiting ===
    let lastSubmitTime = 0;
    const RATE_LIMIT_MS = 30000; // 30 seconds between submissions

    // === Input Sanitization (XSS Protection) ===
    function sanitizeInput(str) {
        return str
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;")
            .replace(/\//g, "&#x2F;")
            .trim()
            .substring(0, 500);
    }

    // === Phone Validation ===
    function isValidPhone(phone) {
        const cleaned = phone.replace(/\D/g, "");
        return cleaned.length >= 8 && cleaned.length <= 15;
    }

    // Real-time phone validation
    const whatsappInput = document.getElementById("whatsapp");
    whatsappInput?.addEventListener("input", function () {
        const value = this.value.replace(/\D/g, "");
        this.value = value; // Only allow digits

        if (value.length > 0 && !isValidPhone(value)) {
            phoneError?.classList.remove("hidden");
            this.classList.add("border-red-500");
        } else {
            phoneError?.classList.add("hidden");
            this.classList.remove("border-red-500");
        }
    });

    form?.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Client-side rate limiting check
        const now = Date.now();
        if (now - lastSubmitTime < RATE_LIMIT_MS) {
            const waitSeconds = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
            alert("Mohon tunggu " + waitSeconds + " detik sebelum mengirim lagi.");
            return;
        }

        const formData = new FormData(form);
        const phoneNumber = formData.get("whatsapp") || "";

        // Phone Validation
        if (!isValidPhone(phoneNumber)) {
            phoneError?.classList.remove("hidden");
            whatsappInput?.classList.add("border-red-500");
            whatsappInput?.focus();
            return;
        }

        // Show loading state
        if (submitBtn) {
            submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">progress_activity</span> Mengirim...';
            submitBtn.setAttribute("disabled", "true");
        }

        // Sanitize all inputs
        const name = sanitizeInput(formData.get("name") || "");
        const business = sanitizeInput(formData.get("business") || "");
        const countryCode = formData.get("country_code") || "62";
        const challenge = formData.get("challenge") || "";

        // Format phone: strip leading 0, prepend country code
        let cleanedPhone = phoneNumber.replace(/\D/g, "");
        if (cleanedPhone.startsWith("0")) {
            cleanedPhone = cleanedPhone.substring(1);
        }
        const whatsapp = countryCode + cleanedPhone;

        // Get challenge label
        const challengeSelect = document.getElementById("challenge");
        const challengeLabel = challengeSelect?.options[challengeSelect.selectedIndex]?.text || challenge;

        // Get country display text
        const countryDisplayEl = document.getElementById("selected-display");
        const countryText = countryDisplayEl?.textContent?.trim() || ("+" + countryCode);

        // Get reCAPTCHA token
        let recaptchaToken = "";
        if (recaptchaSiteKey && recaptchaSiteKey !== "your_site_key_here" && window.grecaptcha) {
            try {
                recaptchaToken = await window.grecaptcha.execute(recaptchaSiteKey, { action: "submit_lead" });
            } catch (error) {
                console.error("reCAPTCHA error:", error);
            }
        }

        // Prepare payload
        const payload = {
            name,
            business,
            whatsapp,
            country: countryText,
            challenge,
            challenge_label: challengeLabel,
            submitted_at: new Date().toISOString(),
            token: recaptchaToken,
        };

        try {
            const response = await fetch("/api/submit-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Gagal mengirim data");
            }

            // Update client-side rate limit timestamp
            lastSubmitTime = Date.now();

            // Show success message
            form.classList.add("hidden");
            successMessage?.classList.remove("hidden");
        } catch (error) {
            console.error("Submit error:", error);
            alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
        }

        // Reset button state
        if (submitBtn) {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.removeAttribute("disabled");
        }
    });

    // === Custom Country Dropdown Logic ===
    const dropdown = document.getElementById("custom-country-dropdown");
    const trigger = document.getElementById("dropdown-trigger");
    const optionsMenu = document.getElementById("dropdown-options");
    const hiddenInput = document.getElementById("hidden-country-code");
    const selectedDisplay = document.getElementById("selected-display");
    const searchInput = document.getElementById("country-search");
    const optionItems = document.querySelectorAll(".country-option");

    // Reset form button
    resetFormBtn?.addEventListener("click", function () {
        form?.reset();
        form?.classList.remove("hidden");
        successMessage?.classList.add("hidden");

        // Reset country dropdown to Indonesia
        if (selectedDisplay) {
            selectedDisplay.innerHTML = '<img src="https://flagcdn.com/w40/id.png" width="20" height="15" alt="ID" class="rounded-sm"> <span>+62</span>';
        }
        if (hiddenInput) {
            hiddenInput.value = "62";
        }
    });

    // Toggle Menu
    trigger?.addEventListener("click", function (e) {
        e.stopPropagation();
        optionsMenu?.classList.toggle("hidden");
        if (!optionsMenu?.classList.contains("hidden")) {
            searchInput?.focus();
        }
    });

    // Select Option
    optionItems.forEach(function (item) {
        item.addEventListener("click", function () {
            const code = item.getAttribute("data-code");
            const iso = item.getAttribute("data-iso");

            if (selectedDisplay && iso && code) {
                selectedDisplay.innerHTML = '<img src="https://flagcdn.com/w40/' + iso + '.png" width="20" height="15" alt="' + iso.toUpperCase() + '" class="rounded-sm"> <span>+' + code + '</span>';
            }

            if (hiddenInput && code) {
                hiddenInput.value = code;
            }

            optionsMenu?.classList.add("hidden");

            if (searchInput) {
                searchInput.value = "";
                optionItems.forEach(function (opt) {
                    opt.style.display = "flex";
                });
            }
        });
    });

    // Search functionality
    searchInput?.addEventListener("input", function (e) {
        const filter = e.target.value.toLowerCase();
        optionItems.forEach(function (item) {
            const text = item.textContent?.toLowerCase() || "";
            item.style.display = text.includes(filter) ? "flex" : "none";
        });
    });

    // Close on click outside
    document.addEventListener("click", function (e) {
        if (dropdown && !dropdown.contains(e.target)) {
            optionsMenu?.classList.add("hidden");
        }
    });
})();
