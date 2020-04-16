import express from "express";
import fetch from "node-fetch";
const app = express();
app.get("/game.min.js", async(req, res) => {
	const status: { status: string, data?: { gameClientVersion?: string } } = await (await fetch("https://api.prodigygame.com/game-api/status")).json();
	const version = status?.data?.gameClientVersion;
	if (status.status !== "success" || !version) return res.sendStatus(503);
	const gameMinJS = await (await fetch(`https://code.prodigygame.com/code/${version}/game.min.js?v=${version}`)).text();
	res.type(".js");
	return res.send(`window.hack={};\n${gameMinJS}`
		.split("return this._game")
		.join("hack.instance=this;return this._game")
		.split("t.constants=Object")
		.join("hack.constants=t,t.constants=Object")
		.split("var i={};")
		.join("var i={};console.log(i);")
		)
})
app.get("/", (req, res) => res.redirect("/game.min.js"))
app.get("/public-game.min.js", async(req, res) => {
	const publicGame = await (await fetch("https://play.prodigygame.com/public/js/public-game.min.js")).text();
	res.type(".js");
	return res.send(publicGame.replace(/console\..+?\(.*?\)/g, "(()=>{})()"))
})
app.listen(process.env.PORT ?? 1337, () => console.log("Started!"))