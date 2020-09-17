import { Swal, Toast, NumberInput, Confirm } from "../utils/swal";
import { Hack, category, Toggler } from "../index";
import { VERY_LARGE_NUMBER, gameData, pickRandom } from "../utils/util";
import { prodigy, game } from "../utils/util";
new Hack(category.misc, "Skip Tutorial").setClick(async () => {
	_.functions.completeTutorial();
});
/*
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
			_.player.equipment.setOutfit(rand(gameData.outfit));
			_.player.equipment.setBoots(rand(gameData.boots));
			_.player.equipment.setHat(rand(gameData.hat));
			prodigy.user.reload();
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
	_.player.name.data.nickname = null;
	_.player.name.data.firstName = 44;
	_.player.name.data.middleName = 754;
	_.player.name.data.lastName = 882;
	_.player.data.stars = -1e22;
	_.player.data.level = 69;
	_.player.forceSaveCharacter();
	_.player.appearance.setGender("male");
	_.player.appearance.setEyeColor(1);
	_.player.appearance.setFace(4);
	_.player.appearance.setHair(19, 1);
	_.player.appearance.setSkinColor(1);
	_.player.equipment.setFollow(19);
	_.player.equipment.setHat(19);
	_.player.equipment.setBoots(19);
	_.player.equipment.setOutfit(19);
	_.player.equipment.setWeapon(19);
	_.player.forceSaveCharacter();
	await Toast.fire("Bobbified!", "You are now Bobby Fancywoman.", "success");
});
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
					_.network.emitMessage(
						{
							action: "fx",
							data: {
								type: 3 + i % 2,
								userID:
									_.player.userID,
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
