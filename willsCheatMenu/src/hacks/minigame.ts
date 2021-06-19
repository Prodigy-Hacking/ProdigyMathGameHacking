import { Swal, Toast, NumberInput } from "../utils/swal";
import { Hack, category, Toggler } from "../index";
import { VERY_LARGE_NUMBER, gameData, pickRandom } from "../utils/util";
import { BattleState } from "../../../typings/game";
import { prodigy, game } from "../utils/util";

new Toggler(category.minigames, "20x Walk Speed", "Walk really fast!").setEnabled(async () => {
	_.instance.game.state.states.get("DinoDig").walkSpeed = 20;
}).setDisabled(async () => {
	_.instance.game.state.states.get("DinoDig").walkSpeed = 1.5;
});