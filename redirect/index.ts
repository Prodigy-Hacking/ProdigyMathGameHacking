import express from "express";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { transpile } from "typescript";
import Discord from "discord.js";
const app = express();
const VERSION = "A-0.0.3";
let lastVersion = "None";
let lastBuild: number = 0
const hook = new Discord.WebhookClient("700774406963724328", "g3X1Kv3vV8uAeNnHBrBnRM-UzCAfsXCbJ-OzP27aqTnW9tkRc3i9tCbGFL8Of5vbRKOV")
setInterval(async () => {
	const status: { status: string; data?: { gameClientVersion?: string, prodigyGameFlags: { gameDataVersion: number } } } = await (
		await fetch("https://api.prodigygame.com/game-api/status")
	).json();
	const version = status?.data?.gameClientVersion;
	if (!version || (version === lastVersion && status.data?.prodigyGameFlags.gameDataVersion)) return;
	await hook.send(`**New Prodigy Version**: Prodigy has updated from \`${lastVersion}\` GDV \`${lastBuild || "N/A"}\` to \`${lastVersion = version}\` GDV \`${lastBuild = status.data!.prodigyGameFlags.gameDataVersion}\` `)

}, 100000);
app.get("/game.min.js", async (req, res) => {
	const status: { status: string; data?: { gameClientVersion?: string } } = await (
		await fetch("https://api.prodigygame.com/game-api/status")
	).json();
	const version = status?.data?.gameClientVersion;
	if (status.status !== "success" || !version) return res.sendStatus(503);
	const gameMinJS = await (
		await fetch(`https://code.prodigygame.com/code/${version}/game.min.js?v=${version}`)
	).text();
	res.type(".js");
	const replacements = [
		["return this._game", "hack.instance=this;return this._game"],
		["t.constants=Object", "hack.constants=t,t.constants=Object"],
		["window,function(t){var i={};", "window,function(t){var i={};hack.modules=i;"],
		["return t.BAM=", ";hack.variables.loc=Ar;hack.variables.menuTxt=Kr;hack.variables.menuObj=t;return t.BAM="],
	];
	return res.send(
		replacements.reduce(
			(l, c) => l.split(c[0]).join(c[1]),
			`
	exports = {};window.hack=Object.create(null);hack.variables=Object.create(null);
	Object.defineProperty(hack, "gameData", { get: () => hack.instance.game.state.states.Boot._gameData });
	\n${gameMinJS}
	${transpile(fs.readFileSync(path.join(__dirname, "./revival.ts"), { encoding: "utf8" }))}
	console.log("%cWill's Redirect Hack", "font-size:40px;color:#540052;font-weight:900;font-family:sans-serif;");
	console.log("%cVersion ${VERSION}", "font-size:20px;color:#000025;font-weight:700;font-family:sans-serif;");
	console.log('The variable "hack" contains the hacked variables.')
`
		)
	);
});
app.get("/", (req, res) => res.redirect("/game.min.js"));
app.get("/public-game.min.js", async (req, res) => {
	const publicGame = await (await fetch("https://play.prodigygame.com/public/js/public-game.min.js")).text();
	res.type(".js");
	return res.send(publicGame.replace(/console\..+?\(.*?\)/g, "(()=>{})()"));
});
app.get("/download", async (req, res) => {
	const file = await (
		await fetch(
			"https://raw.githubusercontent.com/PatheticMustan/ProdigyMathGameHacking/master/redirect/Redirector.json"
		)
	).text();
	res.type(".json");
	res.header("Content-Disposition", 'attachment; filename="Redirector.json"');
	return res.send(file);
});
app.get("/version", async (req, res) => {
	const file = await (
		await fetch(
			"https://raw.githubusercontent.com/PatheticMustan/ProdigyMathGameHacking/master/redirect/Redirector.json"
		)
	).text();
	res.type(".json");
	res.header("Content-Disposition", 'attachment; filename="Redirector.json"');
	return res.send(file);
});
app.listen(process.env.PORT ?? 1337, () => console.log("Started!"));
