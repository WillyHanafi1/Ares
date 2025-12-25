/**
 * Navbar Script
 * Handles mobile menu toggle
 */

(function () {
    'use strict';

    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");

    btn?.addEventListener("click", function () {
        menu?.classList.toggle("hidden");
    });

    // Close menu when clicking on a link
    menu?.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            menu?.classList.add("hidden");
        });
    });
})();
