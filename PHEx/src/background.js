const browser = chrome || browser;

// If debug is enabled, the extension will use localhost instead of the Prodigy Hacking Organization CDN.
const debug = false;

// Ignore X-Frame Headers
const HEADERS_TO_STRIP_LOWERCASE = [
	'content-security-policy',
	'x-frame-options',
  ];
  
  chrome.webRequest.onHeadersReceived.addListener(
	details => ({
	  responseHeaders: details.responseHeaders.filter(header =>
		  !HEADERS_TO_STRIP_LOWERCASE.includes(header.name.toLowerCase()))
	}),
	{
	  urls: ['<all_urls>']
	},
	['blocking', 'responseHeaders', 'extraHeaders']);
  

// Redirect Requests
browser.webRequest.onBeforeRequest.addListener(details => {
	const redirectorDomain = debug ? "http://localhost:1337" : "https://prodigyhacking.ml"
	if (details.url.startsWith("https://code.prodigygame.com/code/") && details.url.includes("/game.min.js")) {
	// instead of redirecting
		chrome.tabs.executeScript({
			file: "disableIntegrity.js"
		});
		
	fetch('https://raw.githubusercontent.com/Prodigy-Hacking/ProdigyMathGameHacking/master/PHEx/status.json').then(response => response.json()).then(async data => {
		if (data.offline == true) {
			eval(await(await fetch('https://unpkg.com/sweetalert2')).text())
			if(swal){swal.fire({
				title: "Oh no!",
				html: `Our hacks are currently having some issues, and we're working on it.`,
				icon: "error"
			})}else{
			const res = confirm(`Uh Oh! Hacks look to be down. Hit OK to go to our discord to get updates on when they'll go back up!`);

			if (res) location = "https://discord.gg/XQDfbfq";
		}
		}
	});

	// Blocking gamemin

	chrome.webRequest.onBeforeRequest.addListener(
		function() {
			return {cancel: true};
		},
		{
			urls: ["*://code.prodigygame.com/code/*"]
		},
		["blocking"]
	);

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
