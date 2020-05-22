import { Swal, Toast, NumberInput } from "../utils/swal";
import { Hack, category, Toggler } from "../index";
import { VERY_LARGE_NUMBER, gameData, pickRandom } from "../utils/util";
import { BattleState } from "../../../typings/game";
import { prodigy, game } from "../utils/util";
new Hack(category.battle, "Escape Battle", "Escape any battle!").setClick(async () => {
	const currentState = game.state.current;
	if (currentState === "PVP") game.state.states.PVP.endPVP();
	else if (currentState === "CoOp")
		prodigy.world.$(hack.player.data.zone);
	else game.state.callbackContext.runAwayCallback();
	await Toast.fire(
		"Escaped!",
		"You have successfully escaped from the battle.",
		"success"
	);
});

new Hack(category.battle, "Win Battle", "Instantly win a monster battle.").setClick(async () => {
	const currentState = game.state.current;
	if (currentState === "PVP" || currentState === "CoOp")
		return Toast.fire(
			"Invalid State.",
			"PVP is not supported for this hack.",
			"error"
		);
	else if (currentState === "Battle") {
		game.state.states.Battle.startVictory();
		await Toast.fire(
			"Victory!",
			"You have successfully won the battle.",
			"success"
		);
	} else
		await Toast.fire(
			"Invalid State.",
			"You are currently not in a battle.",
			"error"
		);
});
let maxHearts = game
new Hack(category.battle, "Set Battle Hearts", "Sets your hearts in battle. Automatically raises max hearts.")
	.setClick(async() => {
		const hp = await NumberInput.fire("Health Amount", "How much HP do you want?", "question");
		if (hp.value === undefined) return;
		hack.player.getMaxHearts = () => +hp.value;
		hack.player.pvpHP = +hp.value;
		hack.player.data.hp = +hp.value;
		await Toast.fire("Success!", "Your hearts have been set.", "success");
	})
new Hack(category.battle, "Fill Battle Energy", "Fills up your battle energy.")
	.setClick(async() => {
		const state  = game.state.getCurrentState();
		if (!("teams" in state)) return Toast.fire("Error", "You are currently not in a battle.", "error");
		state.teams[0].setEnergy(99);
		await Toast.fire("Success!", "Your battle energy has been filled.", "success");
	})
new Toggler(category.battle, "test", "test")
	.setEnabled(() => console.log(1))
	.setDisabled(() => console.log(0));
