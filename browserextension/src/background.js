let browser = chrome || browser

// Ignore X-Frame Headers
chrome.webRequest.onHeadersReceived.addListener(
  (details) => ({ responseHeaders: details.responseHeaders.filter((header) => !["content-security-policy", "x-frame-options",].includes(header.name.toLowerCase())), }),
  { urls: ["<all_urls>"] }, ["blocking", "responseHeaders"]
);
// Redirect Requests
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (details.url.startsWith("https://code.prodigygame.com/code/")) return { redirectUrl: "https://prodigyhacking.ml/game.min.js" }; // game.min.js
    if (details.url.startsWith("https://code.prodigygame.com/js/public-game")) return { redirectUrl: "https://prodigyhacking.ml/public-game.min.js?hash=" + details.url.replace(/\D/g, "")}; // public-game.min.js
    if (details.url.startsWith("https://api.prodigygame.com/game-api/v1/character/")) return { redirectUrl: "https://api.prodigygame.com/game-api/v1/character/" + details.url.substring(details.url.lastIndexOf("/") + 1, details.url.lastIndexOf("?")) + "?isMember=1&userID=" + details.url.split("&userID=")[1]}; // Member Hack
  },
  { urls: ["https://code.prodigygame.com/code/*/game.min.js?v=*", "https://code.prodigygame.com/js/public-game-*.min.js", "https://api.prodigygame.com/game-api/v1/character/*?isMember=0&userID=*", ], types: ["script", "xmlhttprequest"], }, ["blocking"]
);