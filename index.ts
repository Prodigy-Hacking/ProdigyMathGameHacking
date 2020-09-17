import express from "express";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { transpile } from "typescript";
import Discord from "discord.js";
const app = express();
const VERSION = "A-0.0.3";
let lastVersion = "None";
let lastBuild: number = 0;
const hook = new Discord.WebhookClient(
	"700774406963724328",
	"g3X1Kv3vV8uAeNnHBrBnRM-UzCAfsXCbJ-OzP27aqTnW9tkRc3i9tCbGFL8Of5vbRKOV"
);
interface GameStatus {
	status: string;
	data?: { gameClientVersion?: string; prodigyGameFlags: { gameDataVersion: number } };
}

setInterval(async () => {
	const status: GameStatus = await (await fetch("https://api.prodigygame.com/game-api/status")).json();
	const version = status?.data?.gameClientVersion;
	if (lastVersion === "None")
		return (lastVersion = version!), (lastBuild = status.data!.prodigyGameFlags.gameDataVersion);
	if (!version || (version === lastVersion && status.data?.prodigyGameFlags.gameDataVersion)) return;
	await hook.send(
		`**New Prodigy Version**: Prodigy has updated from \`${lastVersion}\` GDV \`${
			lastBuild || "N/A"
		}\` to \`${(lastVersion = version)}\` GDV \`${(lastBuild = status.data!.prodigyGameFlags.gameDataVersion)}\` `
	);
}, 100000);
app.get("/game.min.js", async (req, res) => {
	const status: GameStatus = await (await fetch("https://api.prodigygame.com/game-api/status")).json();
	const version = status?.data?.gameClientVersion;
	if (status.status !== "success" || !version) return res.sendStatus(503);
	const gameMinJS = await (
		await fetch(`https://code.prodigygame.com/code/${version}/game.min.js?v=${version}`)
	).text();
	res.type(".js");
	const replacements = [
		["s),this._game=i}", `s),this._game=i};jQuery.temp22=_;let nahhh=setInterval(()=>{if (jQuery.temp22 !== _) {_ = jQuery.temp22; delete jQuery.temp22;clearInterval(nahhh)}});Object.defineProperty(_, "instance", { get: () => t.instance });`],
		["t.constants=Object", "_.constants=t,t.constants=Object"],
		["window,function(t){var i={};", "window,function(t){var i={};_.modules=i;"],
		["this._player=t", "this._player=_.player=t"],
		// ["this._localizer=null,this.et=[]", "_.chat=this;this._localizer=null,this.et=[]"],
		// ["return t.BAM=", ";_.variables.loc=Ar;_.variables.menuTxt=Kr;_.variables.menuObj=t;return t.BAM="],
	];
	return res.send(
		replacements.reduce(
			(l, c) => l.split(c[0]).join(c[1]),
			`nootmeat = func => {
				let elephant = 2
			}
			exports = {};_.variables=Object.create(null);
	\n${gameMinJS}
	${transpile(fs.readFileSync(path.join(__dirname, "./revival.ts"), { encoding: "utf8" }))}
	console.log("%cWill's Redirect Hack", "font-size:40px;color:#540052;font-weight:900;font-family:sans-serif;");
	console.log("%cVersion ${VERSION}", "font-size:20px;color:#000025;font-weight:700;font-family:sans-serif;");
	console.log('The variable "_" contains the hacked variables.');
	setTimeout(() => {
		${await (await fetch("https://raw.githubusercontent.com/Prodigy-Hacking/ProdigyMathGameHacking/master/willsCheatMenu/loader.js")).text()}

	}, 10000)
`
		)
	);
});
app.get("/", (req, res) => res.redirect("/game.min.js"));
app.get("/public-game.min.js", async (req, res) => {
	if (!req.query.hash) return res.send("alert('OUTDATED REDIRECTOR CONFIG')")
	const publicGame = await (await fetch(`https://code.prodigygame.com/js/public-game-${req.query.hash}.min.js`)).text();
	res.type(".js");
	return res.send(`${publicGame.replace(/console\..+?\(.*?\)/g, "(()=>{})()")}
	l=Array.prototype.some;setInterval(()=>{Array.prototype.some = function some(...args) {
		if (this[0] === "hack") this.splice(0, 100);
    return l.call(this, ...args);
}});
let fffffff = document.createElement("iframe");
document.head.append(fffffff);
fffffff.contentWindow.setInterval(() => {
	let l = fffffff.contentWindow.setInterval;
	window.setInterval = function(func, ...args) {
		if (func.toString().includes('["hack"]')) return;
		return l.call(window, func, ...args)
	} 
})
	`);
});
app.get("/download", async (req, res) => {
	const file = await (
		await fetch(
			"https://raw.githubusercontent.com/Prodigy-Hacking/Redirector/master/Redirector.json"
		)
	).text();
	res.type(".json");
	res.header("Content-Disposition", 'attachment; filename="Redirector.json"');
	return res.send(file);
});
app.get("/version", async (req, res) => {
	const file = await (
		await fetch(
			"https://raw.githubusercontent.com/Prodigy-Hacking/Redirector/master/Redirector.json"
		)
	).text();
	res.type(".json");
	res.header("Content-Disposition", 'attachment; filename="Redirector.json"');
	return res.send(file);
});
app.listen(process.env.PORT ?? 1337, () => console.log("Started!"));
