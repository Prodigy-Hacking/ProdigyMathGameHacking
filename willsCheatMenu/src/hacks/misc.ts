import { Swal, Toast, NumberInput, Confirm } from "../utils/swal";
import { Hack, category, Toggler } from "../index";
import { VERY_LARGE_NUMBER, gameData, pickRandom } from "../utils/util";
new Hack(category.misc, "Skip Tutorial").setClick(async () => {
	Phaser.GAMES[0].state.states.Login._gameObj.debugQuests.completeTutorial();
});
new Hack(category.misc, "Disable Timeout Dialog").setClick(async () => {
	Phaser.GAMES[0].state.states.Login._gameObj.debugMisc.disableTimeoutDialogue();
});
let viber: number | null = null;
new Toggler(category.misc, "Clothing Vibe")
	.setEnabled(async () => {
		viber = window.setInterval(() => {
			const rand = <T extends { ID: number }>(arr: T[]) =>
				pickRandom(arr).ID;
			Phaser.GAMES[0].state.states.Login._gameObj.player.equipment.setOutfit(
				rand(gameData.outfit)
			);
			Phaser.GAMES[0].state.states.Login._gameObj.player.equipment.setBoots(
				rand(gameData.boots)
			);
			Phaser.GAMES[0].state.states.Login._gameObj.player.equipment.setHat(rand(gameData.hat));
			Phaser.GAMES[0].state.states.Login._gameObj.user.reload();
		}, 1000);
	})
	.setDisabled(() => {
		if (viber) clearInterval(viber);
	});

new Hack(
	category.misc,
	"Bobbify",
	"Converts your account into Bobby Fancywoman."
).setClick(async () => {
	if (
		!(
			await Confirm.fire(
				"Are you sure you want your account to be turned into Bobby Fancywoman?",
				"This action is not reversable."
			)
		).value
	)
		return;
	Phaser.GAMES[0].state.states.Login._gameObj.debugQuests.completeTutorial();
	Phaser.GAMES[0].state.states.Login._gameObj.player.name.data.nickname = null;
	Phaser.GAMES[0].state.states.Login._gameObj.player.name.data.firstName = 44;
	Phaser.GAMES[0].state.states.Login._gameObj.player.name.data.middleName = 754;
	Phaser.GAMES[0].state.states.Login._gameObj.player.name.data.lastName = 882;
	Phaser.GAMES[0].state.states.Login._gameObj.player.data.stars = -1e22;
	Phaser.GAMES[0].state.states.Login._gameObj.player.data.level = 69;
	Phaser.GAMES[0].state.states.Login._gameObj.player.forceSaveCharacter();
	Phaser.GAMES[0].state.states.Login._gameObj.player.appearance.setGender("male");
	Phaser.GAMES[0].state.states.Login._gameObj.player.appearance.setEyeColor(1);
	Phaser.GAMES[0].state.states.Login._gameObj.player.appearance.setFace(4);
	Phaser.GAMES[0].state.states.Login._gameObj.player.appearance.setHair(19, 1);
	Phaser.GAMES[0].state.states.Login._gameObj.player.appearance.setSkinColor(1);
	Phaser.GAMES[0].state.states.Login._gameObj.player.equipment.setFollow(19);
	Phaser.GAMES[0].state.states.Login._gameObj.player.equipment.setHat(19);
	Phaser.GAMES[0].state.states.Login._gameObj.player.equipment.setBoots(19);
	Phaser.GAMES[0].state.states.Login._gameObj.player.equipment.setOutfit(19);
	Phaser.GAMES[0].state.states.Login._gameObj.player.equipment.setWeapon(19);
	Phaser.GAMES[0].state.states.Login._gameObj.player.forceSaveCharacter();
	await Toast.fire("Bobbified!", "You are now Bobby Fancywoman.", "success");
});
let snowball: number[] = [];
new Toggler(category.misc, "Snowball Crasher", "Crash everyone's game near you with snowballs.").setEnabled(
	async() => {
		
	}
)