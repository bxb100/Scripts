// ==UserScript==
// @name         ddrk广告屏蔽
// @namespace    com.pers.scripts
// @version      0.1
// @description  临时屏蔽
// @author       Johnbi
// @date         2021-10-14
// @run-at document-start
// @match        https://ddrk.me/*
// @icon         https://ddrk.me/favicon-32x32.png
// @grant        none
// ==/UserScript==

// Library code, licensed under MIT
// https://github.com/jspenguin2017/Snippets/blob/master/onbeforescriptexecute.html

(() => {
    "use strict";

    const Event = class {
        constructor(script, target) {
            this.script = script;
            this.target = target;

            this._cancel = false;
            this._replace = null;
            this._stop = false;
        }

        preventDefault() {
            this._cancel = true;
        }
        stopPropagation() {
            this._stop = true;
        }
        replacePayload(payload) {
            this._replace = payload;
        }
    };

    let callbacks = [];
    window.addBeforeScriptExecuteListener = (f) => {
        if (typeof f !== "function") {
            throw new Error("Event handler must be a function.");
        }
        callbacks.push(f);
    };
    window.removeBeforeScriptExecuteListener = (f) => {
        let i = callbacks.length;
        while (i--) {
            if (callbacks[i] === f) {
                callbacks.splice(i, 1);
            }
        }
    };

    const dispatch = (script, target) => {
        if (script.tagName !== "SCRIPT") {
            return;
        }

        const e = new Event(script, target);

        if (typeof window.onbeforescriptexecute === "function") {
            try {
                window.onbeforescriptexecute(e);
            } catch (err) {
                console.error(err);
            }
        }

        for (const func of callbacks) {
            if (e._stop) {
                break;
            }
            try {
                func(e);
            } catch (err) {
                console.error(err);
            }
        }

        if (e._cancel) {
            script.textContent = "";
            script.remove();
        } else if (typeof e._replace === "string") {
            script.textContent = e._replace;
        }
    };
    const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
            for (const n of m.addedNodes) {
                dispatch(n, m.target);
            }
        }
    });
    observer.observe(document, {
        childList: true,
        subtree: true,
    });
})();

function hideElement(id) {
    try {
        document.getElementById(id).remove()
    } catch (e) { }
}

function append() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://cdn.jsdelivr.net/gh/bxb100/Scripts@main/ddrk/wp-playlist-replace.js";
    document.head.appendChild(s);
}

(function () {
    'use strict';
    window.onbeforescriptexecute = (e) => {
        const src = e.script?.src;
        if (src && src.search(/wp-playlist.min\.js/) != -1) {
            console.log('------------')
            e.preventDefault();
            e.stopPropagation();
            append();
        };
    };

    window.addEventListener('DOMContentLoaded', (event) => {
        hideElement("afc_sidebar_2842");
        hideElement("sajdhfbjwhe");
        hideElement("kasjbgih");
        hideElement("iaujwnefhw");
        hideElement("fkasjgf");

    });
})();