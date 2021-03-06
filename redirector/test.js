const fetch = require("node-fetch");

(async () => {
    const status = await (await fetch("https://api.prodigygame.com/game-api/status")).json();
    const gameMin = await (await fetch(`${status.data.gameCodePath}game.min.js`)).text();
    console.log(gameMin.length);
})();