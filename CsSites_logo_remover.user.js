// ==UserScript==
// @name         CsSites_logo_remover
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Replace runcase.gg, runcase.net and skinhouse.gg logos
// @match        https://runcase.gg/*
// @match        https://runcase.net/*
// @match        https://skinhouse.gg/*
// @icon         https://runcase.gg/img/runcase-logo.svg
// @updateURL    https://raw.githubusercontent.com/Osnova-Osnov/CsSites_logo_remover/main/CsSites_logo_remover.user.js
// @downloadURL  https://raw.githubusercontent.com/Osnova-Osnov/CsSites_logo_remover/main/CsSites_logo_remover.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Новые логотипы
    const newLogoRuncase = "https://raw.githubusercontent.com/Osnova-Osnov/CsSites_logo_remover/refs/heads/main/runcase-logo.svg";
    const newLogoSkinhouse = "https://raw.githubusercontent.com/Osnova-Osnov/CsSites_logo_remover/refs/heads/main/skinhouse.svg";

    // Логотипы, которые нужно заменить
    const originalLogosRuncase = [
        "runcase-logo.svg",
        "https://runcase.gg/img/runcase-logo.svg",
        "https://runcase.net/img/runcase-logo.svg"
    ];

    const originalLogosSkinhouse = [
        "logo-menu.svg",
        "https://skinhouse.gg/images/panel-header/logo-menu.svg"
    ];

    function replaceLogo() {
        const imgs = document.querySelectorAll("img");
        const elements = document.querySelectorAll('*');

        // Runcase
        imgs.forEach(img => {
            if (originalLogosRuncase.some(url => img.src.includes(url))) {
                img.src = newLogoRuncase;
            }
        });

        elements.forEach(el => {
            const bg = getComputedStyle(el).backgroundImage;
            if (originalLogosRuncase.some(url => bg.includes(url))) {
                el.style.backgroundImage = `url("${newLogoRuncase}")`;
            }
        });

        // Skinhouse
        imgs.forEach(img => {
            if (originalLogosSkinhouse.some(url => img.src.includes(url))) {
                img.src = newLogoSkinhouse;
            }
        });

        elements.forEach(el => {
            const bg = getComputedStyle(el).backgroundImage;
            if (originalLogosSkinhouse.some(url => bg.includes(url))) {
                el.style.backgroundImage = `url("${newLogoSkinhouse}")`;
            }
        });
    }

    replaceLogo();
    const observer = new MutationObserver(replaceLogo);
    observer.observe(document.body, { childList: true, subtree: true });
})();
