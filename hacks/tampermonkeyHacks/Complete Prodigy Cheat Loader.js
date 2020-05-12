// ==UserScript==
// @name         Complete Prodigy Cheat Loader
// @namespace    https://play.prodigygame.com/
// @version      0.4
// @description  Runs every important script in Prodigy on page load.
// @author       divinelemon
// @match        https://play.prodigygame.com/*
// @copyright    2020, divinelemon
// ==/UserScript==

(() => {
    hack.instance.prodigy.player.getLevel = () => hack.instance.prodigy.player.data.level = Infinity;
    hack.instance.prodigy.player.modifiers.maxHearts = Infinity;
    hack.constants.constants["GameConstants.Battle.ATTACK_DAMAGE_OVERRIDE"] = Infinity;

    let inBattle = false;
    setInterval(()=>{
        if (hack.instance.prodigy.game.state.current === "Battle" && inBattle == false){
            inBattle = true;
            hack.instance.prodigy.game.state.states.Battle.startVictory(); 
            setTimeout(() => inBattle = false, 30000);
        }
    });
})();
