// ==UserScript==
// @name         Complete Prodigy Cheat Loader
// @namespace    https://play.prodigygame.com/
// @version      0.4
// @description  Runs every important script in Prodigy on page load.
// @author       https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/
// @match        https://play.prodigygame.com/*
// @copyright    2020, https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/
// ==/UserScript==

(function () {
	setTimeout(() => {
		hack.instance.prodigy.player.getLevel = () => (hack.instance.prodigy.player.data.level = Infinity);
		hack.instance.prodigy.game.state.setEnergy(99);
		hack.instance.prodigy.player.modifiers.maxHearts = 1e69;
		hack.constants.constants["GameConstants.Battle.ATTACK_DAMAGE_OVERRIDE"] = Infinity;
		setInterval(() => {
			if (hack.instance.prodigy.game.state.current === "Battle") {
				hack.instance.prodigy.game.state.states.Battle.startVictory();
			}
		}, 1000);
	});
})();
