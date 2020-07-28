define(["require", "exports", "../index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const sendMessage = (m) => {
        const elem = m instanceof HTMLElement ? m : document.createElement("p");
        if (!(m instanceof HTMLElement))
            elem.innerText = m;
        elem.classList.add("chat-message");
        index_1.chat.append(elem);
    };
    const sendChat = (name, message) => {
        const p = document.createElement("p");
        p.innerText = `: ${message}`;
        const span = document.createElement("span");
        span.classList.add("chat-name");
        span.innerText = name;
        p.prepend(span);
        sendMessage(p);
    };
});
//# sourceMappingURL=chat.js.map