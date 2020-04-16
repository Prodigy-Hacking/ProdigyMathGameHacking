import "./style.scss";
import { PIXI } from "../../typings/pixi";
export * from "./utils/util";
export const menu = document.createElement("div");
export const wrapper = document.getElementById("game-wrapper");
import { prodigy, game } from "./utils/util";
document.getElementById("cheat-menu")?.remove();
document.getElementById("menu-toggler")?.remove();
menu.id = "cheat-menu";
wrapper?.prepend(menu);
export const toggler = document.createElement("button");
toggler.id = "menu-toggler";
toggler.innerText = "▲";
let visible = true;
wrapper?.prepend(toggler);
toggler.onclick = () => {
	if (visible) {
		toggler.innerText = "▼";
		menu.style.top = "-62vh";
	} else {
		toggler.innerText = "▲";
		menu.style.top = "";
	}
	visible = !visible;
};
const menuleft = document.createElement("DIV");
menuleft.classList.add("menu-left");
menu.append(menuleft);
const menuright = document.createElement("DIV");
menuright.classList.add("menu-right");
menu.append(menuright);
export const addArea = (title: string) => {
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
export const chat = document.createElement("div");
chat.id = "chat-content";
menuright.append(chat);
export class Hack {
	public element: HTMLButtonElement;
	constructor(
		public parent: HTMLDivElement,
		name?: string,
		description?: string
	) {
		this.element = document.createElement("button");
		this.element.classList.add("menu-hack");
		this.parent.append(this.element);
		if (name) this.setName(name);
		if (description) this.setDesc(description);
	}
	setName(name: string) {
		this.element.innerText = name;
		return this;
	}
	setClick(event: () => unknown) {
		this.element.onclick = event;
		return this;
	}
	setDesc(desc: string) {
		this.element.title = desc;
		return this;
	}
}
export class Toggler extends Hack {
	enabled?: () => unknown;
	disabled?: () => unknown;
	constructor(
		public parent: HTMLDivElement,
		name?: string,
		description?: string
	) {
		super(parent, name, description);
		this.element.setAttribute("status", "false");
		this.setClick(async () => {
			this.status = !this.status;
			if (this.status) await this.enabled?.();
			else await this.disabled?.();
		});
	}
	get status() {
		return JSON.parse(this.element.getAttribute("status")!) as boolean;
	}
	set status(val) {
		this.element.setAttribute("status", val.toString());
	}
	setEnabled(event: () => unknown) {
		this.enabled = event;
		return this;
	}
	setDisabled(event: () => unknown) {
		this.disabled = event;
		return this;
	}
}
export const category = {
	player: addArea("Player Hacks"),
	inventory: addArea("Inventory Hacks"),
	location: addArea("Location Hacks"),
	pets: addArea("Pet Hacks"),
	battle: addArea("Battle Hacks"),
	misc: addArea("Miscellaneous Hacks"),
};
