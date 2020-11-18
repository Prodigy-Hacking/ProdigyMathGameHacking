const browser = chrome || browser;
// debug will switch to redirector on localhost instead of prodigyhacking
const debug = false;

// Ignore X-Frame Headers
chrome.webRequest.onHeadersReceived.addListener(
	(details) => ({ responseHeaders: details.responseHeaders.filter((header) => !["content-security-policy", "x-frame-options",].includes(header.name.toLowerCase())), }),
	{ urls: ["<all_urls>"] }, ["blocking", "responseHeaders"]
);
// Redirect Requests
chrome.webRequest.onBeforeRequest.addListener(details => {
	const redirectorDomain = debug? "localhost:1337" : "prodigyhacking.ml"

	if (details.url.startsWith("https://code.prodigygame.com/code/")) {
		return { redirectUrl: `${redirectorDomain}/game.min.js` }; // game.min.js
	}
	if (details.url.startsWith("https://code.prodigygame.com/js/public-game")) {
		return { redirectUrl: (`${redirectorDomain}/public-game.min.js?hash=`) + details.url.split("public-game-")[1].split(".")[0]}; // public-game.min.js
	}
	if (details.url.startsWith("https://api.prodigygame.com/game-api/v1/character/")) {
		return { redirectUrl: "https://api.prodigygame.com/game-api/v1/character/" + details.url.substring(details.url.lastIndexOf("/") + 1, details.url.lastIndexOf("?")) + "?isMember=1&userID=" + details.url.split("&userID=")[1]}; // Member Hack
	}
}, {
	urls: [
		"https://code.prodigygame.com/code/*/game.min.js?v=*",
		"https://code.prodigygame.com/js/public-game-*.min.js",
		"https://api.prodigygame.com/game-api/v1/character/*?isMember=0&userID=*"
	],
	types: ["script", "xmlhttprequest"],
}, ["blocking"]);