import { Swal, Toast, NumberInput } from "../utils/swal";
import { Hack, category } from "../index";
import {
	VERY_LARGE_NUMBER,
	gameData,
} from "../utils/util";
new Hack(category.misc, "Skip Tutorial").setClick(async () => {
	PIXI.game.prodigy.debugQuests.completeTutorial();
});