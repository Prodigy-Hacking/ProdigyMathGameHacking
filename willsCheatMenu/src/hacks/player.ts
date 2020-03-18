import { Swal, Toast, NumberInput } from "../utils/swal";
import { Hack, category } from "../index";
new Hack(category.player, "Set Gold").setClick(async () => {
	const gold = await NumberInput.fire(
		"Gold Amount",
		"What number do you want to set your gold to?",
		"question"
	);
	if (gold.value === undefined) return;
	PIXI.game.prodigy.player.data.gold = +gold.value;
	PIXI.game.prodigy.player.updated = true;
	await Toast.fire("Success!", "The gold amount has been set.", "success")
});
