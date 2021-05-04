const browser = chrome || browser;

// If debug is enabled, the extension will use localhost instead of the Prodigy Hacking Organization CDN.
const debug = false;

// Ignore X-Frame Headers
browser.webRequest.onHeadersReceived.addListener(
	(details) => ({ responseHeaders: details.responseHeaders.filter((header) => !["content-security-policy", "x-frame-options",].includes(header.name.toLowerCase())) }),
	{ urls: ["<all_urls>"] }, ["blocking", "responseHeaders"]
);

// Redirect Requests
browser.webRequest.onBeforeRequest.addListener(details => {
	const redirectorDomain = debug ? "http://localhost:1337" : "https://prodigyhacking.ml"
	if (details.url.startsWith("https://code.prodigygame.com/code/") && details.url.includes("/game.min.js")) {
	// instead of redirecting
		chrome.tabs.executeScript({
			file: "disableIntegrity.js"
		});
		
	fetch('https://raw.githubusercontent.com/Prodigy-Hacking/ProdigyMathGameHacking/master/PHEx/status.json').then(response => response.json()).then(data => {
		if (data.offline == true) {
			chrome.notifications.create({
 			 "type": "basic",
 			 "title": "Hacks are down,
 			 "message": "Our hacks are currently having some issues, and we're working on it."
			});
		}
	});

		// see disableIntegrity.js, we append the new game.min to the document

		// return { redirectUrl: `${redirectorDomain}/game.min.js` };
		return { cancel: true };
	} else if (details.url.startsWith("https://code.prodigygame.com/js/public-game")) {
		return { redirectUrl: `${redirectorDomain}/public-game.min.js?hash=${details.url.split("public-game-")[1].split(".")[0]}&updated=${Date.now()}` };
	} else if (details.url.startsWith("https://api.prodigygame.com/game-api/v1/character/")) {
		return { redirectUrl: "https://api.prodigygame.com/game-api/v1/character/" + details.url.substring(details.url.lastIndexOf("/") + 1, details.url.lastIndexOf("?")) + "?isMember=1&userID=" + details.url.split("&userID=")[1] };
	}
}, {
	urls: [
		"https://code.prodigygame.com/code/*/game.min.js?v=*",
		"https://code.prodigygame.com/js/public-game-*.min.js",
		"https://api.prodigygame.com/game-api/v1/character/*?isMember=0&userID=*"
	],
	types: ["script", "xmlhttprequest"],
}, ["blocking"]);
