import JSDOM from "jsdom";
import fetch from "node-fetch";
import { URLSearchParams } from "url";

export default async function tokenify(username, password) {
    // TODO: Get _prodigy_identity_service_session cookie in first fetch call.
    console.log("Fetching login route...");
    const site = await (await fetch("https://sso.prodigygame.com/game/login")).text();
    const dom = new JSDOM.JSDOM(site);
    console.log("Successfully fetched.");
    const { document } = dom.window;
    const authenticity = document.querySelector("input[name=authenticity_token]").getAttribute("value");
    if (!authenticity)
        return console.error("[FATAL] Authenticity token failed.");
    console.log("Authenticity token obtained!");
    const loginParams = new URLSearchParams();
    loginParams.set("utf8", "✓");
    loginParams.set("authenticity_token", authenticity);
    loginParams.set("unauthenticated_game_login_form[username]", username);
    loginParams.set("unauthenticated_game_login_form[password]", password);
    loginParams.set("button", "");
    const login = await fetch("http://elobot.ml:2000/https://sso.prodigygame.com/game/login", {
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "origin": "https://sso.prodigygame.com/",
            "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,en-CA;q=0.6",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
        },
        body: loginParams.toString(),
        method: "POST",
    });
    console.log(Object.fromEntries(login.headers.entries()));
    console.log(login.redirected);
}
