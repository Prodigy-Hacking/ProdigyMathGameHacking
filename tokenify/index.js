"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewToken = exports.tokenify = void 0;
const jsdom_1 = __importDefault(require("jsdom"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const node_fetch_js_1 = __importDefault(require("fetch-cookie/node-fetch.js"));
const cookiefetch = node_fetch_js_1.default(node_fetch_1.default);
const url_1 = require("url");
exports.tokenify = async (username, password, { log } = {}) => {
    if (log)
        console.log("Fetching login route...");
    const formSite = await cookiefetch("https://sso.prodigygame.com/game/login");
    if (!formSite.ok)
        throw new Error(`The form page request was unable to be fetched with a code of ${formSite.status}.`);
    const site = await formSite.text();
    const dom = new jsdom_1.default.JSDOM(site);
    if (log)
        console.log("Successfully fetched.");
    const { document } = dom.window;
    const authenticity = document.querySelector("input[name=authenticity_token]")?.getAttribute("value");
    if (!authenticity)
        throw new Error("Authenticity token failed. No authenticity input was found.");
    if (log)
        console.log("Authenticity token obtained!");
    const loginParams = new url_1.URLSearchParams();
    loginParams.set("utf8", "✓");
    loginParams.set("authenticity_token", authenticity);
    loginParams.set("unauthenticated_game_login_form[username]", username);
    loginParams.set("unauthenticated_game_login_form[password]", password);
    loginParams.set("button", "");
    const login = await cookiefetch(formSite.url, {
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        body: loginParams.toString(),
        method: "POST",
        redirect: "manual",
    });
    if (!login.ok && !login.status.toString().startsWith("3"))
        throw new Error(`Initial login request was unsuccessful with code ${login.status}.`);
    if (log)
        console.log(`Initial login request done with a code of ${login.status}.`);
    const playLogin = await cookiefetch(login.headers.get("location") ?? "", { redirect: "follow" });
    if (!playLogin.ok && !playLogin.status.toString().startsWith("3"))
        throw new Error(`Client ID request failed with a code of ${playLogin.status}`);
    if (log)
        console.log(`Client ID request done with a code of ${playLogin.status}.`);
    const clientId = (await playLogin.text()).match(/var client_id = '([0-9a-f]+)';/)?.[1];
    if (clientId === undefined)
        throw new Error("Client ID was not found on in the request response.");
    const tokenParams = new url_1.URLSearchParams();
    tokenParams.set("client_id", clientId);
    tokenParams.set("redirect_uri", "https://play.prodigygame.com/play");
    tokenParams.set("response_type", "id_token token");
    tokenParams.set("scope", "openid profile email sid identity_provider");
    tokenParams.set("state", "b292a37841634f2eb2c6c283285e0e1a");
    tokenParams.set("nonce", "e651b05312b74195beb22f99a116c630");
    tokenParams.set("prompt", "login");
    tokenParams.set("mobilePlatform", "undefined");
    const tokenLogin = await cookiefetch("https://sso.prodigygame.com/oauth/authorize?" + tokenParams, {
        redirect: "manual"
    });
    if (!tokenLogin.ok && !tokenLogin.status.toString().startsWith("3"))
        throw new Error(`First authentication request failed with a code of ${tokenLogin.status}.`);
    if (log)
        console.log(`First token request done with a code of ${tokenLogin.status}.`);
    const secondTokenLogin = await cookiefetch(tokenLogin.headers.get("location") ?? "", {
        redirect: "manual"
    });
    if (!secondTokenLogin.ok && !secondTokenLogin.status.toString().startsWith("3"))
        throw new Error(`Second authentication request failed with a code of ${secondTokenLogin.status}.`);
    if (log)
        console.log(`Second token request done with a code of ${secondTokenLogin.status}.`);
    const tokenProp = new URL((secondTokenLogin.headers.get("location") ?? "").replace("#", "?")).searchParams;
    const tokenInit = Object.fromEntries(tokenProp.entries());
    const master = await node_fetch_1.default("https://api.prodigygame.com/game-auth-api/v3/user", {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            identityToken: tokenInit.access_token
        }),
        method: "POST"
    });
    if (!master.ok)
        throw new Error(`Master request failed with a code of ${master.status}.`);
    if (log)
        console.log(`Master request done with a code of ${master.status}.`);
    const masterJson = await master.json();
    return {
        ...tokenInit,
        ...masterJson
    };
};
exports.renewToken = async (id, auth) => (await (await node_fetch_1.default(`https://api.prodigygame.com/game-auth-api/jwt/${id}?token=${auth}`)).json()).token;
