// ==UserScript==
// @name         ddrk广告屏蔽
// @namespace    com.pers.scripts
// @version      1.0.5
// @description  临时屏蔽
// @author       Johnbi
// @date         2021-10-14
// @run-at document-start
// @match        https://ddrk.me/*
// @icon         https://ddrk.me/favicon-32x32.png
// @require https://greasyfork.org/scripts/434057-toolkitcollection/code/ToolKitCollection.js?version=980261
// @grant        none
// ==/UserScript==

/*global ToolKitCollection*/
function hideElement(id) {
    try {
        document.getElementById(id).remove()
    } catch (e) { }
}

function append() {
    let s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/gh/bxb100/Scripts@main/ddrk/wp-playlist-replace.js";
    document.head.appendChild(s);
}

function appendCss() {
    let s = document.createElement("style");
    s.innerText = `video {outline: none;}`;
    document.documentElement.appendChild(s);
}

(function () {
    'use strict';

    let cnzzBlock = false;
    let lncldglobal = false;
    window.onbeforescriptexecute = (e) => {
        const src = e.script?.src;
        if (src && src.search(/wp-playlist.min\.js/) != -1) {
            ToolKitCollection.description();
            e.preventDefault();
            e.stopPropagation();
            append();
        };
        cnzzBlock = ToolKitCollection.eventStopByStart(e, 'var cnzz_protocol', cnzzBlock)
        lncldglobal = ToolKitCollection.eventStopByStart(e, 'var ourl', lncldglobal)
    };

    window.addEventListener('DOMContentLoaded', (event) => {
        appendCss();
        hideElement("afc_sidebar_2842");
        hideElement("sajdhfbjwhe");
        hideElement("kasjbgih");
        hideElement("iaujwnefhw");
        hideElement("fkasjgf");
    });

})();
