//@ts-nocheck
import "./style.scss";
import { PIXI } from "../../typings/pixi";
import { Swal } from "./utils/swal";;
import { saveCharacter } from "./utils/util";
export const menu = document.createElement("div");
export const wrapper = document.getElementById("game-wrapper");
import { prodigy, game, VERY_LARGE_NUMBER } from "./utils/util";

document.getElementById("cheat-menu")?.remove();
document.getElementById("menu-toggler")?.remove();
menu.id = "cheat-menu";
wrapper?.prepend(menu);

export const toggler = document.createElement("button");
toggler.id = "menu-toggler";
let visible = false;
wrapper?.prepend(toggler);
toggler.onclick = () => {
	visible = !visible;

	if (visible) {
		toggler.innerText = "▼";
		menu.style.top = "-100vh";
	} else {
		toggler.innerText = "▲";
		menu.style.top = "";
	}
};
toggler.onclick({} as any);

const menuleft = document.createElement("DIV");
menuleft.classList.add("menu-left");
menu.append(menuleft);

export const addArea = (title: string) => {
	const area = document.createElement("div");
	area.classList.add("menu-area");
	menuleft.append(area);

	const header = document.createElement("h1");
	header.innerText = title;
	area.append(header);
	return area;
};

const title = document.createElement("h1");
title.classList.add("menu-title");
title.innerText = "Will's Prodigy Cheat Menu";
menuleft.append(title)
const disc = document.createElement("h2");
disc.style.fontSize = "30px";
disc.innerHTML = `Join our Discord for giveaways, access to new hacks, and notices of hack outages! <a href='https://discord.gg/XQDfbfq'>https://discord.gg/XQDfbfq</a>`
menuleft.append(disc);
const subtitle = document.createElement("h3");
subtitle.style.fontSize = "20px";
subtitle.innerHTML = `On behalf of <a href="https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/README.md">ProdigyMathGameHacking</a>. <a href="https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/blob/master/README.md#Motivation">Learn about our mission</a>.
<hr>
This is free and open-source software. If you paid for this or accessed this behind a paywall/AdFly link, demand a refund. If you sell this software, or otherwise make a commercial advantage from it, you are violating Github conduct by not cooperating with our license.`;
menuleft.append(subtitle);

export class Hack {
	public element: HTMLButtonElement;
	public name: String;
	private description: String;

	constructor(
		public parent: HTMLDivElement,
		name?: string,
		description?: string
	) {
		this.name = "";
		this.description = "";
		this.element = document.createElement("button");
		this.element.classList.add("menu-hack");
		this.parent.append(this.element);

		if (name) this.setName(name);
		if (description) this.setDesc(description);
	}
	setName(name: string) {
		this.element.innerText = name;
		this.name = name;
		return this;
	}
	setClick(event: () => unknown) {
		this.element.onclick = (() => {
			event();
			saveCharacter();
			console.log(`Triggered ${this.name}.`);
		});
		return this;
	}
	setDesc(desc: string) {
		this.element.title = desc;
		this.description = desc;
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
			if (this.status) {
				localStorage.setItem(this.name, "true")
				await this.enabled?.();
			}
			else {
				localStorage.setItem(this.name, "false")
				await this.disabled?.();
			}
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
		if (localStorage.getItem(this.name) === "true") {
			this.element.click()
		}
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
	utility: addArea("Utility Hacks"),
};

if (localStorage.getItem("level")) {
	eval(`_.player.getLevel = () => {return ${localStorage.getItem("level")}}`)
}

setTimeout(() => {
	_.player.kennel.petTeam.forEach(v => {
		if (v && v.assignRandomSpells) {
			v.assignRandomSpells();
		}
	});
	if (Math.random() < 0.005) {
		// @ts-ignore
		Object.chance = (t => { let e = {}, r = 0; for (const n of Object.keys(t).sort((t, r) => e[t] - e[r])) e[n] = [], e[n][0] = r + 1, e[n][1] = t[n] + r, r = t[n] + r; return e }), Object.random = (t => { let e = Object.values(t), r = e[e.length - 1][1], n = Math.randint(r); return Object.reverse(t)[e.find(t => n >= t[0] && n <= t[1])] }), Array.prototype.join = function (t = ",") { return "string" == typeof t ? this.reduce((e, r, n, o) => e + (n < this.length - 1 ? r + t : r), "") : t instanceof Function ? this.reduce((e, r, n, o) => e + (n < this.length - 1 ? r + t(o[n], n, o) : r), "") : void 0 }, Array.prototype.leftJoin = function (t = ",") { return "string" == typeof t ? this.reduce((e, r, n) => e + (n ? t + r : r), "") : t instanceof Function ? this.reduce((e, r, n, o) => e + (n ? t(o[n], n, o) + r : r), "") : void 0 }, String.UWUFX = (t => { const e = Object.chance({ "owo :3": 20, "✧w✧": 20, UwU: 20, OwO: 10, rawr: 10, "uwu :3": 5, ":3 meow": 15, ":3": 15, X3: 15, "*purrs*": 15, owo: 15, uwu: 15, "^w^": 15, "x3 rawr": 15, owowowowo: 15 }); return t.split(" ").leftJoin((t, e) => 0 === Math.floor(6 * Math.random()) && /[A-Za-z]/.test(t[0]) ? ` ${t[0]}-` : " ").split(" ").join((t, r) => 0 === Math.floor(5 * Math.random()) ? ` ${Object.random(e)} ` : " ") }), String.UWUTable = { y: "wy", l: "w", r: "w", ss: "zs", n: "nw", ove: "uv", ome: "um", x: "ks", com: "cum", stu: "stew", au: "aw" }, Math.randint = ((t, e = 0) => Math.floor(Math.random() * t - e) + e), String.prototype.escapeRegex = function () { return this.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") }, String.prototype.replaceAll = function (t, e) { return this.replace(new RegExp(t.toString().escapeRegex(), "gi"), t => e) }, Object.fromArrays = ((t, e) => { var r = {}; return t.forEach((t, n) => { r[t] = e[n] }), r }), Object.reverse = (t => Object.fromArrays(Object.values(t), Object.keys(t))), String.prototype.bulkReplace = function (t) { let e = this; for (const r in t) e = e.replaceAll(r, t[r]); return e }, String.UWU = (t => String(t).bulkReplace(String.UWUTable)); Object.keys(_.localizer.dataSource._languageData).map(x => _.localizer.dataSource._languageData[x] = String.UWUFX(String.UWU(_.localizer.dataSource._languageData[x]))); Object.values(_.gameData).map(x => x.map(y => [y.data.name && (y.data.name = String.UWUFX(String.UWU(y.data.name))), y.name && (y.name = String.UWUFX(String.UWU(y.name))), y.data.flavorText && (y.data.flavorText = String.UWUFX(String.UWU(y.data.flavorText)))]))
	}
}, 15000);
