import express from "express";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
const app = express();
const VERSION = "A-0.0.2"
app.get("/game.min.js", async(req, res) => {
	const status: { status: string, data?: { gameClientVersion?: string } } = await (await fetch("https://api.prodigygame.com/game-api/status")).json();
	const version = status?.data?.gameClientVersion;
	if (status.status !== "success" || !version) return res.sendStatus(503);
	const gameMinJS = await (await fetch(`https://code.prodigygame.com/code/${version}/game.min.js?v=${version}`)).text();
	res.type(".js");
	const replacements = [
		["return this._game", "hack.instance=this;return this._game"],
		["t.constants=Object", "hack.constants=t,t.constants=Object"],
		["window,function(t){var i={};", "window,function(t){var i={};hack.modules=i;"],
		["return t.BAM=", ";(()=>{hack.variables.loc=Ar;hack.variables.menuTxt=Kr})();return hack.variables.menuObj = t.BAM="]
	]
	return res.send(replacements.reduce((l, c) => l.split(c[0]).join(c[1]) ,`window.hack=Object.create(null);hack.variables=Object.create(null);\n${gameMinJS}
	${fs.readFileSync(path.join(__dirname, "./revival.js"), { encoding: "utf8" })}
	console.log("%cWill's Cheat Replacer", "font-size:40px;color:#540052;font-weight:900;font-family:sans-serif;");
	console.log("%cVersion ${VERSION}", "font-size:20px;color:#000025;font-weight:700;font-family:sans-serif;");
	console.log('The variable "hack" contains the hacked variables.')
`))
})
app.get("/", (req, res) => res.redirect("/game.min.js"))
app.get("/public-game.min.js", async(req, res) => {
	const publicGame = await (await fetch("https://play.prodigygame.com/public/js/public-game.min.js")).text();
	res.type(".js");
	return res.send(publicGame.replace(/console\..+?\(.*?\)/g, "(()=>{})()"))
})
app.listen(process.env.PORT ?? 1337, () => console.log("Started!"))