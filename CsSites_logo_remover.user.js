// ==UserScript==
// @name         CsSites_logo_remover
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Replace runcase.gg and runcase.net logos
// @match        https://runcase.gg/*
// @match        https://runcase.net/*
// @icon         https://runcase.gg/img/runcase-logo.svg
// @updateURL    https://raw.githubusercontent.com/Osnova-Osnov/CsSites_logo_remover/main/CsSites_logo_remover.user.js
// @downloadURL  https://raw.githubusercontent.com/Osnova-Osnov/CsSites_logo_remover/main/CsSites_logo_remover.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const newLogo = "https://raw.githubusercontent.com/Osnova-Osnov/CsSites_logo_remover/refs/heads/main/runcase-logo.svg";

    // Логотипы, которые нужно заменить
    const originalLogos = [
        "runcase-logo.svg",                 // общий случай
        "https://runcase.gg/img/runcase-logo.svg",
        "https://runcase.net/img/runcase-logo.svg"
    ];

    function replaceLogo() {
        // Меняем <img>
        const imgs = document.querySelectorAll("img");
        imgs.forEach(img => {
            if (originalLogos.some(url => img.src.includes(url))) {
                img.src = newLogo;
            }
        });

        // Меняем background-image
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            const bg = getComputedStyle(el).backgroundImage;
            if (originalLogos.some(url => bg.includes(url))) {
                el.style.backgroundImage = `url("${newLogo}")`;
            }
        });
    }

    // Запуск сразу и при изменениях DOM
    replaceLogo();
    const observer = new MutationObserver(replaceLogo);
    observer.observe(document.body, { childList: true, subtree: true });
})();
