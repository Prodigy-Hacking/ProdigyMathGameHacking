import { Swal, Toast, NumberInput } from "../utils/swal";
import { Hack, category } from "../index";
import { VERY_LARGE_NUMBER, gameData, pickRandom } from "../utils/util";
new Hack(category.misc, "Skip Tutorial").setClick(async () => {
	Phaser.GAMES[0].prodigy.debugQuests.completeTutorial();
});
new Hack(category.misc, "Disable Timeout Dialog").setClick(async () => {
	Phaser.GAMES[0].prodigy.debugMisc.disableTimeoutDialogue();
});

new Hack(category.misc, "Clothing Vibe").setClick(async () => {
	setInterval(() => {
		const rand = <T extends { ID: number }>(arr: T[]) => pickRandom(arr).ID;
		Phaser.GAMES[0].prodigy.player.equipment.setOutfit(rand(gameData.outfit));
		Phaser.GAMES[0].prodigy.player.equipment.setBoots(rand(gameData.boots));
		Phaser.GAMES[0].prodigy.player.equipment.setHat(rand(gameData.hat));
		Phaser.GAMES[0].prodigy.user.reload();
	}, 1000);
});


new Hack(category.misc, "Bobbify").setClick(async () => {

});
