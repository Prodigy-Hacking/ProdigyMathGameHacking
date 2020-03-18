import { Swal, Toast, NumberInput } from "../utils/swal";
import { Hack, category } from "../index";
import { getItem } from "../utils/util";
new Hack(category.player, "Set Gold").setClick(async () => {
	const gold = await NumberInput.fire(
		"Gold Amount",
		"What number do you want to set your gold to?",
		"question"
	);
	if (gold.value === undefined) return;
	PIXI.game.prodigy.player.data.gold = +gold.value;
	PIXI.game.prodigy.player.updated = true;
	await Toast.fire("Success!", "The gold amount has been set.", "success");
});
new Hack(category.player, "Set Level").setClick(async () => {
	const level = await NumberInput.fire(
		"Level",
		"What number do you want to set your level to?",
		"question"
	);
	if (level.value === undefined) return;
	PIXI.game.prodigy.player.data.level = +level.value;
	PIXI.game.prodigy.player.updated = true;
	await Toast.fire(
		"Success!",
		"The level of your player has been set.",
		"success"
	);
});

new Hack(category.player, "Set Bounty Points").setClick(async () => {
	const points = await NumberInput.fire(
		"Bounty Points",
		"What number do you want to set your bounty points to?",
		"question"
	);
	if (points.value === undefined) return;
	PIXI.game.prodigy.player.data.bountyScore = +points.value;
	PIXI.game.prodigy.player.updated = true;
	await Toast.fire("Success!", "The bounty points has been set.", "success");
});

new Hack(category.player, "Obtain Conjure Cubes").setClick(async () => {
	const cubes = await NumberInput.fire(
		"Conjure Cubes",
		"How many conjure cubes do you want to get?",
		"question"
	);
	if (cubes.value === undefined) return;
	for (let i = 0; i < Math.min(99, +cubes.value); i++)
		PIXI.game.prodigy.giftBoxController.receiveGiftBox(
			null,
			getItem("giftBox", 1)
		);
	PIXI.game.prodigy.player.updated = true;
	await Toast.fire("Success!", "You have obtained the requested conjure cubes.", "success");
});
new Hack(category.player, "Membership").setClick(async() => {
	PIXI.game.prodigy.player.it = true;
	PIXI.game.prodigy.player.updated = true;
	await Toast.fire("Success!", "Membership is now enabled!", "success");
})