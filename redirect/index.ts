import express from "express";
import fetch from "node-fetch";
const app = express();
app.get("/", async(req, res) => {
	const status: { status: string, data: { gameClientVersion: string } } = await (await fetch("https://api.prodigygame.com/game-api/status")).json();
	if (status.status !== "success") return res.send(JSON.stringify(status));
	const gameMinJS = await (await fetch(`https://code.prodigygame.com/code/${status.data.gameClientVersion}/game.min.js?v=${status.data.gameClientVersion}`)).text();
	res.type(".js");
	return res.send(`window.hack={};\n${gameMinJS}`
		.split("return this._game")
		.join("hack.instance=this;return this._game")
		.split("t.constants=Object")
		.join("hack.constants=t,t.constants=Object")
		)
})
app.listen(1337, () => console.log("Started!"))