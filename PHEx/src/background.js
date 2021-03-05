const browser = chrome || browser;
// debug will switch to redirector on localhost instead of prodigyhacking
const debug = false;

// Ignore X-Frame Headers
chrome.webRequest.onHeadersReceived.addListener(
	(details) => ({ responseHeaders: details.responseHeaders.filter((header) => !["content-security-policy", "x-frame-options",].includes(header.name.toLowerCase())) }),
	{ urls: ["<all_urls>"] }, ["blocking", "responseHeaders"]
);
// Redirect Requests
chrome.webRequest.onBeforeRequest.addListener(details => {
	const redirectorDomain = debug ? "http://localhost:1337" : "https://prodigyhacking.ml"

	if (details.url.startsWith("https://code.prodigygame.com/code/") && details.url.includes("/game.min.js")) {
		// if anybody curses my name, you might as well curse at me on twitter lol, I'm @PatheticMustan
		// instead of redirecting
		chrome.tabs.executeScript({
			file: "disableIntegrity.js"
		});

		// see disableIntegrity.js, we append the new game.min to the document

		// return { redirectUrl: `${redirectorDomain}/game.min.js` };
		return { cancel: true };
	} else if (details.url.startsWith("https://code.prodigygame.com/js/public-game")) {
		return { redirectUrl: `${redirectorDomain}/public-game.min.js?hash=${details.url.split("public-game-")[1].split(".")[0]}` };
	} else if (details.url.startsWith("https://api.prodigygame.com/game-api/v1/character/")) {
		return { redirectUrl: "https://api.prodigygame.com/game-api/v1/character/" + details.url.substring(details.url.lastIndexOf("/") + 1, details.url.lastIndexOf("?")) + "?isMember=1&userID=" + details.url.split("&userID=")[1] };
	} /*else if (details.url.startsWith("https://api.prodigygame.com/game-api/status")) {
		alert(1);
		return { redirectUrl: `${redirectorDomain}/status` };
	}*/
}, {
	urls: [
		"https://code.prodigygame.com/code/*/game.min.js?v=*",
		"https://code.prodigygame.com/js/public-game-*.min.js",
		"https://api.prodigygame.com/game-api/v1/character/*?isMember=0&userID=*",
		//"https://api.prodigygame.com/game-api/status"
	],
	types: ["script", "xmlhttprequest"],
}, ["blocking"]);