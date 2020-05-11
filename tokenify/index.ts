import JSDOM from "jsdom";
import fetch from "node-fetch";
import { URLSearchParams } from "url";
const USERNAME = "redacted";
const PASSWORD = "raeacted";
(async () => {
	console.log("Fetching login route...");
	const formSite = await fetch("https://sso.prodigygame.com/game/login");
	const site = await formSite.text();
	
	const dom = new JSDOM.JSDOM(site);
	console.log("Successfully fetched.");
	const { document } = dom.window;
	const authenticity = document.querySelector("input[name=authenticity_token]")?.getAttribute("value");
	if (!authenticity) return console.error("[FATAL] Authenticity token failed.");
	console.log("Authenticity token obtained!");
	const loginParams = new URLSearchParams();
	loginParams.set("utf8", "✓");
	loginParams.set("authenticity_token", authenticity);
	loginParams.set("unauthenticated_game_login_form[username]", USERNAME);
	loginParams.set("unauthenticated_game_login_form[password]", PASSWORD);
	loginParams.set("button", "");
	const login = await fetch("https://sso.prodigygame.com/game/login", {
		headers: {
			accept:
				"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			"accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,en-CA;q=0.6",
			"cache-control": "max-age=0",
			"content-type": "application/x-www-form-urlencoded",
			"sec-fetch-dest": "document",
			"sec-fetch-mode": "navigate",
			"sec-fetch-site": "same-origin",
			"sec-fetch-user": "?1",
			"upgrade-insecure-requests": "1",
			"cookie": formSite.headers.get("set-cookie")!
		},
		body: loginParams.toString(),
		method: "POST",
		redirect: "manual"
	});
	// if (!login.ok) console.error("Failed to login.")
	console.log(`Logged in with status ${login.status}.`);
	console.log(await login.text())
	console.log(Object.fromEntries(login.headers.entries()))
	console.log(login.redirected)
})();
