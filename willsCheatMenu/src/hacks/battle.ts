import { Swal, Toast, NumberInput } from "../utils/swal";
import { Hack, category, Toggler } from "../index";
import { VERY_LARGE_NUMBER, gameData, pickRandom } from "../utils/util";
new Hack(category.misc, "Escape Battle").setClick(async () => {
	const currentState = Phaser.GAMES[0].state.current;
	if (currentState === "PVP") Phaser.GAMES[0].state.states.PVP.endPVP();
	else if (currentState === "CoOp")
		Phaser.GAMES[0].prodigy.world.$(Phaser.GAMES[0].prodigy.player.data.zone);
	else Phaser.GAMES[0].state.callbackContext.runAwayCallback();
	await Toast.fire(
		"Escaped!",
		"You have successfully escaped from the battle.",
		"success"
	);
});

new Hack(category.misc, "Win Battle").setClick(async () => {
	const currentState = Phaser.GAMES[0].state.current;
	if (currentState === "PVP" || currentState === "CoOp")
		return Toast.fire(
			"Invalid State.",
			"PVP is not supported for this hack.",
			"error"
		);
	else if (currentState === "Battle") {
		Phaser.GAMES[0].state.states.Battle.startVictory();
		await Toast.fire(
			"Victory!",
			"You have successfully won the battle.",
			"success"
		);
	} else
		await Toast.fire(
			"Invalid State.",
			"You are currently not in a battle.",
			"success"
		);
});
new Toggler(category.battle, "test");
