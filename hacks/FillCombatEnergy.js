// Use this during combat, and your energy will fill up to the maximum, allowing you to use all-out attacks amd high energy attacks as much as you want.
//Just make sure to re-paste this script at the beginning of every battle.
(async()=>{e=await(await fetch("https://api.prodigygame.com/game-api/status")).json(),CryptoJS.MD5=(()=>({toString:()=>e.data.prodigyGameFlags.debugPassword})),enableDebug("",!0)})();
setTimeout(() => {setBattleEnergy(10)}, 100);
