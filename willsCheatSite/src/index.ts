import "./style.scss";
const hacks = document.getElementById("hacks")!;
export const addArea = (title: string) => {
	const area = document.createElement("div");
	area.classList.add("menu-area");
	hacks.append(area);
	const header = document.createElement("h1");
	header.innerHTML = title;
	area.append(header);
	return area;
};
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