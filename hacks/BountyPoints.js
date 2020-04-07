// Gives the player the maximum amount of bounty points.
(async()=>{e=await(await fetch("https://api.prodigygame.com/game-api/status")).json(),CryptoJS.MD5=(()=>({toString:()=>e.data.prodigyGameFlags.debugPassword})),enableDebug("",!0)})();
setTimeout(() => {getBounty()}, 100);
