import { chat } from "../index";
import { pickRandom } from "./util";
const sendMessage = (m: HTMLElement | string) => {
	const elem = m instanceof HTMLElement ? m : document.createElement("p");
	if (!(m instanceof HTMLElement)) elem.innerText = m;
	elem.classList.add("chat-message");
	chat.append(elem);
};
const sendChat = (name: string, message: string) => {
	const p = document.createElement("p");
	p.innerText = `: ${message}`;
	const span = document.createElement("span");
	span.classList.add("chat-name");
	span.innerText = name;
	p.prepend(span);
	sendMessage(p);
};