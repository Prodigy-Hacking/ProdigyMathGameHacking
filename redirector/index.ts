import express from "express";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { transpile } from "typescript";
import Discord from "discord.js";
import cors from "cors";

const app = express();
// should match https://github.com/Prodigy-Hacking/PHEx/blob/master/src/manifest.json
const SupportPHEXVersion = "2.0.0";
let lastVersion = "None";
interface GameStatus {
	status: string;
	data?: { gameClientVersion?: string; prodigyGameFlags: { gameDataVersion: number } };
}

setInterval(async () => {
	//try {
		const status: GameStatus = await (await fetch("https://api.prodigygame.com/game-api/status")).json();
		console.log(status);
		const version = status?.data?.gameClientVersion;
		if (lastVersion === "None") return (lastVersion = version!);

		// write modified gamefile to disk, in case there's a crash
	//} catch (e) {}
}, 1000);

app.use(cors());

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
		["i.prototype.hasMembership=", "i.prototype.hasMembership=_=>true,i.prototype.originalHasMembership="] // membership override
		// ["this._localizer=null,this.et=[]", "_.chat=this;this._localizer=null,this.et=[]"],
		// ["return t.BAM=", ";_.variables.loc=Ar;_.variables.menuTxt=Kr;_.variables.menuObj=t;return t.BAM="],
	];
	return res.send(
		replacements.reduce(
			(code, replacement) => code.split(replacement[0]).join(replacement[1]),
			`nootmeat = func => {
				let elephant = 2
			}
			exports = {};_.variables=Object.create(null);
	
			${gameMinJS}

			${transpile(fs.readFileSync(path.join(__dirname, "./revival.ts"), { encoding: "utf8" }))}

			console.log("%cWill's Redirect Hack", "font-size:40px;color:#540052;font-weight:900;font-family:sans-serif;");
			console.log("%cVersion ${SupportPHEXVersion}", "font-size:20px;color:#000025;font-weight:700;font-family:sans-serif;");
			console.log('The variable "_" contains the hacked variables.');
			SW.Load.onGameLoad();
			setTimeout(() => {
				${await (await fetch("https://raw.githubusercontent.com/Prodigy-Hacking/ProdigyMathGameHacking/master/willsCheatMenu/loader.js")).text()}
			}, 10000);
		`)
	);
});
app.get("/", (req, res) => res.redirect("/game.min.js"));
app.get("/public-game.min.js", async (req, res) => {
	if (!req.query.hash) return res.send("alert('OUTDATED REDIRECTOR CONFIG')")
	const publicGame = await (await fetch(`https://code.prodigygame.com/js/public-game-${req.query.hash}.min.js`)).text();
	res.type(".js");
	return res.send(`
		${publicGame.replace(/console\..+?\(.*?\)/g, "(()=>{})()")}

		// overwrite Array.some to patch Prodigy's anti-cheat.
		// The Anti-Anti-Cheat
		l=Array.prototype.some;
		setInterval(()=>{Array.prototype.some = function some(...args) {
			if (this[0] === "hack") this.splice(0, 100);
			return l.call(this, ...args);
		}});
		
		// Prodigy's new hack var anti-cheat overwrote setInterval, to patch this, we get a fresh new setInterval from an iFrame,
		// then patch their patch.
		let fffffff = document.createElement("iframe");
		document.head.append(fffffff);
		fffffff.contentWindow.setInterval(() => {
			let l = fffffff.contentWindow.setInterval;
			window.setInterval = function(func, ...args) {
				if (func.toString().includes('["hack"]')) return;
				return l.call(window, func, ...args);
			}
		});
	`);
});
app.get("/download", async (req, res) => {
	return res.redirect("https://github.com/Prodigy-Hacking/PHEx/raw/master/build/extension.zip");
});
app.get("/version", async (req, res) => {
	return res.send(SupportPHEXVersion);
});
app.get("/status", async (req, res) => {
	res.type(".json");
	return res.sendFile(__dirname + "/status.json");
});

const port = process.env.PORT ?? 1337;
app.listen(port, () => console.log(`The old machine hums along on port :${port}`));
