/**
 * Contact Form Script
 * Handles form submission, validation, and CSRF token management
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
    const csrfInput = document.getElementById("csrf-token");

    // Get config from data attributes
    const recaptchaSiteKey = section?.dataset.recaptcha || "";

    // === SECURITY: Rate Limiting ===
    let lastSubmitTime = 0;
    const RATE_LIMIT_MS = 30000; // 30 seconds between submissions

    // === CSRF Token Management ===
    let csrfToken = "";

    async function fetchCSRFToken() {
        try {
            const response = await fetch("/api/csrf-token");
            const data = await response.json();
            if (data.success && data.token) {
                csrfToken = data.token;
                if (csrfInput) {
                    csrfInput.value = csrfToken;
                }
            }
        } catch (error) {
            console.error("Failed to fetch CSRF token:", error);
        }
    }

    // Fetch CSRF token on page load
    fetchCSRFToken();

    // === SECURITY: Input Sanitization (XSS Protection) ===
    function sanitizeInput(str) {
        return str
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;")
            .replace(/\//g, "&#x2F;")
            .trim()
            .substring(0, 500); // Max length safety
    }

    // === SECURITY: Phone Validation ===
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

        // === SECURITY: Rate Limiting Check ===
        const now = Date.now();
        if (now - lastSubmitTime < RATE_LIMIT_MS) {
            const waitSeconds = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
            alert("Mohon tunggu " + waitSeconds + " detik sebelum mengirim lagi.");
            return;
        }

        const formData = new FormData(form);
        const phoneNumber = formData.get("whatsapp") || "";

        // === SECURITY: Phone Validation ===
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

        // === SECURITY: Sanitize all inputs ===
        const name = sanitizeInput(formData.get("name") || "");
        const business = sanitizeInput(formData.get("business") || "");
        const countryCode = formData.get("country_code") || "62";
        const challenge = formData.get("challenge") || "";

        // Format phone number: remove leading 0 if exists, then prepend country code
        let cleanedPhone = phoneNumber.replace(/\D/g, ""); // Remove non-digits
        if (cleanedPhone.startsWith("0")) {
            cleanedPhone = cleanedPhone.substring(1);
        }
        const whatsapp = countryCode + cleanedPhone;

        // Get challenge label
        const challengeSelect = document.getElementById("challenge");
        const challengeLabel = challengeSelect?.options[challengeSelect.selectedIndex]?.text || challenge;

        // Get country display text (from selected display)
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

        // Prepare data for webhook (all sanitized)
        const leadData = {
            name: name,
            business: business,
            whatsapp: whatsapp,
            country: countryText,
            challenge: challenge,
            challenge_label: challengeLabel,
            source: "website",
            submitted_at: new Date().toISOString(),
            recaptcha_token: recaptchaToken,
        };

        try {
            // Send data to internal API (The Guard)
            const response = await fetch("/api/submit-lead", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken, // CSRF protection
                },
                body: JSON.stringify({
                    ...leadData,
                    token: recaptchaToken, // Pass raw token for server-side verification
                    csrf_token: csrfToken, // Also in body for redundancy
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Gagal mengirim data");
            }

            // === SECURITY: Update rate limit timestamp on success ===
            lastSubmitTime = Date.now();

            // Refresh CSRF token for next submission
            await fetchCSRFToken();

            // Show success message
            form.classList.add("hidden");
            successMessage?.classList.remove("hidden");
        } catch (error) {
            console.error("Webhook error:", error);
            // Show error to user instead of fake success
            alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");

            // Refresh CSRF token on error too
            await fetchCSRFToken();
        }

        // Reset button state for next time
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

        // Refresh CSRF token
        fetchCSRFToken();
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

            // Update display
            if (selectedDisplay && iso && code) {
                selectedDisplay.innerHTML = '<img src="https://flagcdn.com/w40/' + iso + '.png" width="20" height="15" alt="' + iso.toUpperCase() + '" class="rounded-sm"> <span>+' + code + '</span>';
            }

            // Update hidden input
            if (hiddenInput && code) {
                hiddenInput.value = code;
            }

            // Close menu
            optionsMenu?.classList.add("hidden");

            // Clear search
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
