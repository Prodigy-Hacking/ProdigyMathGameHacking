import { Swal, Toast, NumberInput, Confirm } from "../utils/swal";
import { Hack, category, Toggler } from "../index";
import { VERY_LARGE_NUMBER, gameData, pickRandom } from "../utils/util";
import { prodigy, game } from "../utils/util";
/*
new Hack(category.misc, "Skip Tutorial").setClick(async () => {
	prodigy.debugQuests.completeTutorial();
});
new Hack(category.misc, "Disable Timeout Dialog").setClick(async () => {
	prodigy.debugMisc.disableTimeoutDialogue();
});
*/
let viber: number | null = null;
new Toggler(category.misc, "Clothing Vibe")
	.setEnabled(async () => {
		viber = window.setInterval(() => {
			const rand = <T extends { ID: number }>(arr: T[]) =>
				pickRandom(arr).ID;
			prodigy.player.equipment.setOutfit(rand(gameData.outfit));
			prodigy.player.equipment.setBoots(rand(gameData.boots));
			prodigy.player.equipment.setHat(rand(gameData.hat));
			// prodigy.user.reload();
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
	// prodigy.debugQuests.completeTutorial();
	prodigy.player.name.data.nickname = null;
	prodigy.player.name.data.firstName = 44;
	prodigy.player.name.data.middleName = 754;
	prodigy.player.name.data.lastName = 882;
	prodigy.player.data.stars = -1e22;
	prodigy.player.data.level = 69;
	prodigy.player.forceSaveCharacter();
	prodigy.player.appearance.setGender("male");
	prodigy.player.appearance.setEyeColor(1);
	prodigy.player.appearance.setFace(4);
	prodigy.player.appearance.setHair(19, 1);
	prodigy.player.appearance.setSkinColor(1);
	prodigy.player.equipment.setFollow(19);
	prodigy.player.equipment.setHat(19);
	prodigy.player.equipment.setBoots(19);
	prodigy.player.equipment.setOutfit(19);
	prodigy.player.equipment.setWeapon(19);
	prodigy.player.forceSaveCharacter();
	await Toast.fire("Bobbified!", "You are now Bobby Fancywoman.", "success");
});/*
let snowball: number[] = [];
new Toggler(
	category.misc,
	"Snowball Crasher",
	"Crash everyone's game near you with snowballs."
)
	.setEnabled(async () => {
		for (let i = 0; i < 10000; i++)
			snowball.push(
				setInterval(() =>
					prodigy.network.emitMessage(
						{
							action: "fx",
							data: {
								type: 3 + i % 2,
								userID:
									Phaser.GAMES[0].state.states.Login._gameObj
										.player.userID,
								x: Math.floor(Math.random() * 1280),
								y: Math.floor(Math.random() * 720),
							},
						}
					)
				)
			);
			console.log(snowball)
	})
	.setDisabled(async () => snowball.map(clearInterval));
*/