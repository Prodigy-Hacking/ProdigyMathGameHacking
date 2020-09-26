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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90b2tlbmlmeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsNERBQStCO0FBQy9CLCtFQUFxRDtBQUNyRCxNQUFNLFdBQVcsR0FBNEUsdUJBQVcsQ0FBQyxvQkFBSyxDQUFRLENBQUM7QUFDdkgsNkJBQXNDO0FBOEJ6QixRQUFBLFFBQVEsR0FBRyxLQUFLLEVBQUMsUUFBZ0IsRUFBRSxRQUFnQixFQUFFLEVBQUUsR0FBRyxLQUF3QixFQUFFLEVBQUUsRUFBRTtJQUNwRyxJQUFJLEdBQUc7UUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDaEQsTUFBTSxRQUFRLEdBQWEsTUFBTSxXQUFXLENBQUMsd0NBQXdDLENBQUMsQ0FBQztJQUN2RixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGlFQUFpRSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUN2SCxNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQyxNQUFNLEdBQUcsR0FBRyxJQUFJLGVBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsSUFBSSxHQUFHO1FBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQzlDLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQ2hDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0NBQWdDLENBQUMsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckcsSUFBSSxDQUFDLFlBQVk7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDZEQUE2RCxDQUFDLENBQUM7SUFDbEcsSUFBSSxHQUFHO1FBQUUsT0FBTyxD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