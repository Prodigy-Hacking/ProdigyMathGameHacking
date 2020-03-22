import { Swal, Toast, NumberInput } from "../utils/swal";
import { Hack, category } from "../index";
import { VERY_LARGE_NUMBER, gameData, pickRandom } from "../utils/util";
new Hack(category.misc, "Skip Tutorial").setClick(async () => {
	PIXI.game.prodigy.debugQuests.completeTutorial();
});
new Hack(category.misc, "Disable Timeout Dialog").setClick(async () => {
	PIXI.game.prodigy.debugMisc.disableTimeoutDialogue();
});

new Hack(category.misc, "Clothing Vibe").setClick(async () => {
	setInterval(() => {
		const rand = <T extends { ID: number }>(arr: T[]) => pickRandom(arr).ID;
		PIXI.game.prodigy.player.equipment.setOutfit(rand(gameData.outfit));
		PIXI.game.prodigy.player.equipment.setBoots(rand(gameData.boots));
		PIXI.game.prodigy.player.equipment.setHat(rand(gameData.hat));
		PIXI.game.prodigy.user.reload();
	}, 1000);
});
