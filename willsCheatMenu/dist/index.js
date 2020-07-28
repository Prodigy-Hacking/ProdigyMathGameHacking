var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}
define(["require", "exports", "./utils/util", "./style.scss"], function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.category = exports.Toggler = exports.Hack = exports.chat = exports.addArea = exports.toggler = exports.wrapper = exports.menu = void 0;
    __exportStar(util_1, exports);
    exports.menu = document.createElement("div");
    exports.wrapper = document.getElementById("game-wrapper");
    document.getElementById("cheat-menu")?.remove();
    document.getElementById("menu-toggler")?.remove();
    exports.menu.id = "cheat-menu";
    exports.wrapper?.prepend(exports.menu);
    exports.toggler = document.createElement("button");
    exports.toggler.id = "menu-toggler";
    let visible = true;
    exports.wrapper?.prepend(exports.toggler);
    exports.toggler.onclick = () => {
        if (visible) {
            exports.toggler.innerText = "▼";
            exports.menu.style.top = "-62vh";
        }
        else {
            exports.toggler.innerText = "▲";
            exports.menu.style.top = "";
        }
        visible = !visible;
    };
    exports.toggler.onclick({});
    const menuleft = document.createElement("DIV");
    menuleft.classList.add("menu-left");
    exports.menu.append(menuleft);
    const menuright = document.createElement("DIV");
    menuright.classList.add("menu-right");
    exports.menu.append(menuright);
    exports.addArea = (title) => {
        const area = document.createElement("div");
        area.classList.add("menu-area");
        menuleft.append(area);
        const header = document.createElement("h1");
        header.innerHTML = title;
        area.append(header);
        return area;
    };
    const title = document.createElement("h1");
    title.classList.add("menu-title");
    title.innerText = "Prodigy Cheat Menu";
    menuleft.append(title);
    const chatTitle = document.createElement("h1");
    chatTitle.id = "chat-title";
    chatTitle.innerText = "Live Chat";
    menuright.append(chatTitle);
    exports.chat = document.createElement("div");
    exports.chat.id = "chat-content";
    menuright.append(exports.chat);
    class Hack {
        constructor(parent, name, description) {
            this.parent = parent;
            this.element = document.createElement("button");
            this.element.classList.add("menu-hack");
            this.parent.append(this.element);
            if (name)
                this.setName(name);
            if (description)
                this.setDesc(description);
        }
        setName(name) {
            this.element.innerText = name;
            return this;
        }
        setClick(event) {
            this.element.onclick = event;
            return this;
        }
        setDesc(desc) {
            this.element.title = desc;
            return this;
        }
    }
    exports.Hack = Hack;
    class Toggler extends Hack {
        constructor(parent, name, description) {
            super(parent, name, description);
            this.parent = parent;
            this.element.setAttribute("status", "false");
            this.setClick(async () => {
                this.status = !this.status;
                if (this.status)
                    await this.enabled?.();
                else
                    await this.disabled?.();
            });
        }
        get status() {
            return JSON.parse(this.element.getAttribute("status"));
        }
        set status(val) {
            this.element.setAttribute("status", val.toString());
        }
        setEnabled(event) {
            this.enabled = event;
            return this;
        }
        setDisabled(event) {
            this.disabled = event;
            return this;
        }
    }
    exports.Toggler = Toggler;
    exports.category = {
        player: exports.addArea("Player Hacks"),
        inventory: exports.addArea("Inventory Hacks"),
        location: exports.addArea("Location Hacks"),
        pets: exports.addArea("Pet Hacks"),
        battle: exports.addArea("Battle Hacks"),
        misc: exports.addArea("Miscellaneous Hacks"),
    };
    hack.chat.J.push("Hacker!", "Natsumi", "Unexpected Will", "Arc", "Yama", "Whimpers", "Ugh, It's Divine", "Bruh moment", "Thats what she said", "Skid located.", "Bobby Fancywoman");
});
//# sourceMappingURL=index.js.map