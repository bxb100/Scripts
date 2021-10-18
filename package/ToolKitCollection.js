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

const ToolKitCollection = {
    description: () => {
        console.log(
            "Hello 👋, 42 is an answer for everything.\n %c..",
            "background: url(https://cdn.jsdelivr.net/gh/bxb100/bxb100@master/png2.png) no-repeat left center;font-size: 400px;color: transparent;",
            "\nbusy writing bugs\nsee more in https://github.com/bxb100");
    },
    eventStopByStart: (event, text, bool) => {
        const innerText = event?.script?.innerText
        if (!bool && innerText && innerText.trim().startsWith(text)) {
            bool = true;
            event.preventDefault();
        }
        return bool;
    }
};

// Library code, licensed under MIT
// https://github.com/jspenguin2017/Snippets/blob/master/onbeforescriptexecute.html 

(() => {
    "use strict";

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