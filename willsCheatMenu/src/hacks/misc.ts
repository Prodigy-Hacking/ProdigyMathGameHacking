import { Swal, Toast, NumberInput, Confirm } from "../utils/swal";
import { Hack, category, Toggler } from "../index";
import { VERY_LARGE_NUMBER, gameData, pickRandom } from "../utils/util";
import { prodigy, game } from "../utils/util";
new Hack(category.misc, "Skip Tutorial").setClick(async () => {
	hack.functions.completeTutorial();
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
			hack.player.equipment.setOutfit(rand(gameData.outfit));
			hack.player.equipment.setBoots(rand(gameData.boots));
			hack.player.equipment.setHat(rand(gameData.hat));
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
	hack.player.name.data.nickname = null;
	hack.player.name.data.firstName = 44;
	hack.player.name.data.middleName = 754;
	hack.player.name.data.lastName = 882;
	hack.player.data.stars = -1e22;
	hack.player.data.level = 69;
	hack.player.forceSaveCharacter();
	hack.player.appearance.setGender("male");
	hack.player.appearance.setEyeColor(1);
	hack.player.appearance.setFace(4);
	hack.player.appearance.setHair(19, 1);
	hack.player.appearance.setSkinColor(1);
	hack.player.equipment.setFollow(19);
	hack.player.equipment.setHat(19);
	hack.player.equipment.setBoots(19);
	hack.player.equipment.setOutfit(19);
	hack.player.equipment.setWeapon(19);
	hack.player.forceSaveCharacter();
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
					hack.network.emitMessage(
						{
							action: "fx",
							data: {
								type: 3 + i % 2,
								userID:
									hack.player.userID,
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
