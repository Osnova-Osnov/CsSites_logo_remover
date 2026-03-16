// ==UserScript==
// @name         Убрать логотип из кс-сайтов
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Убирает логотип из кс-сайтов
// @match        https://runcase.gg/*
// @icon         https://runcase.gg/img/runcase-logo.svg
// @updateURL    https://raw.githubusercontent.com/Osnova-Osnov/CsSites_logo_remover/main/CsSites_logo_remover.user.js
// @downloadURL  https://raw.githubusercontent.com/Osnova-Osnov/CsSites_logo_remover/main/CsSites_logo_remover.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const newLogo = "https://raw.githubusercontent.com/Osnova-Osnov/CsSites_logo_remover/refs/heads/main/runcase-logo.svg";

    function replaceLogo() {
        // Ищем все изображения с оригинальным логотипом
        const imgs = document.querySelectorAll('img[src*="runcase-logo.svg"]');

        imgs.forEach(img => {
            img.src = newLogo;
        });

        // Иногда логотип вставлен как background-image
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            const bg = getComputedStyle(el).backgroundImage;
            if (bg.includes("runcase-logo.svg")) {
                el.style.backgroundImage = `url("${newLogo}")`;
            }
        });
    }

    // Запускаем сразу и при изменениях DOM
    replaceLogo();
    const observer = new MutationObserver(replaceLogo);
    observer.observe(document.body, { childList: true, subtree: true });
})();
