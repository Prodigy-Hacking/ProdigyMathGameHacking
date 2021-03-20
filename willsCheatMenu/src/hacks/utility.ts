// @ts-nocheck
import { Swal, Toast, NumberInput, Confirm } from "../utils/swal";
import { Hack, category, Toggler, dimensions } from "../index";
import { VERY_LARGE_NUMBER, gameData, pickRandom, saveCharacter } from "../utils/util";
import { prodigy, game } from "../utils/util";
import { Player } from "../../../typings/player";

new Hack(category.utility, "Save Character Locally", "Saves your character locally.").setClick(async () => {
	const playerData = {};
	playerData.equipment = _.player.equipment;
	playerData.tutorial = _.player.tutorial;
	playerData.pets = _.player.kennel._petData;
	playerData.data = _.player.data;
	playerData.encounters = _.player.encounters._data;
	playerData.house = _.player.house.data;
	playerData.inventory = _.player.backpack.data;
	playerData.quests = _.player.quests.data;
	playerData.state = _.player.state.data;
	playerData.appearance = _.player.appearance;
	playerData.tutorial = _.player.tutorial.data;
	playerData.name = _.player.name.data;

	localStorage.setItem("playerData", JSON.stringify(playerData));
	await Toast.fire("Success!", "Note: Load Character will only work on this device.", "success");
});

new Hack(category.utility, "Load local character", "Loads your character locally.").setClick(async () => {
	if (!localStorage.getItem("playerData")) {
		await Toast.fire("Error", "No saved character.", "success");
	} else {
		const playerData = JSON.parse(localStorage.getItem("playerData"));
		// we don't want to overwrite any getters/setters the prodigy objects may have, so only overwrite what we've stringified
		const loadObj = (toObj, fromObj) => Object.keys(fromObj).map(k => {
			if (typeof k == "object") return;
			toObj[k] = fromObj[k];
		});

		loadObj(_.player.equipment,        playerData.equipment);
		loadObj(_.player.tutorial,         playerData.tutorial);
		loadObj(_.player.kennel._petData,  playerData.pets);
		loadObj(_.player.data,             playerData.data);
		loadObj(_.player.encounters._data, playerData.encounters);
		loadObj(_.player.house.data,       playerData.house);
		loadObj(_.player.backpack.data,    playerData.inventory);
		loadObj(_.player.quests.data,      playerData.quests);
		loadObj(_.player.state.data,       playerData.state);
		loadObj(_.player.appearance,       playerData.appearance);
		loadObj(_.player.tutorial.data,    playerData.tutorial);
		loadObj(_.player.name.data,        playerData.name);
		_.player.appearanceChanged = true;
		await Toast.fire("Success!", "Character has been successfully loaded.", "success");
	}
});

new Hack(category.utility, "Save Character", "Helps fix bugs where not all hacks save.").setClick(async () => {
	saveCharacter();
	await Toast.fire("Success!", "Your character has been saved!", "success");
});
new Hack(category.utility, "Close all popups", "Closes all popups in Prodigy.").setClick(async () => {
	_.instance.prodigy.open.menuCloseAll();
	await Toast.fire("Closed!", "All open popups were closed.", "success");
});
new Hack(category.utility, "Update menu", "Updates menu to the latest version without needing to reload.").setClick(async () => {
	document.getElementById("cheat-menu")?.remove();
	document.getElementById("menu-toggler")?.remove();
	(async () => {
		eval(await (await fetch(`https://raw.githubusercontent.com/Prodigy-Hacking/ProdigyMathGameHacking/HEAD/willsCheatMenu/dist/bundle.js?updated=${Date.now()}`)).text()); // updated parameter is so browser ignores cached version
	})();
	await Toast.fire("Updated!", "Cheat menu was updated.", "success");
});
new Hack(category.utility, "Disable inactivity kick", "Keeps you from being logged out for inactivity.").setClick(async () => {
	_.constants.constants["GameConstants.Inactivity.LOG_OUT_TIMER_SECONDS"] = 0;
	await Toast.fire("Success!", "You now will never be logged out!", "success");
});

new Toggler(category.utility, "Enable menu resize drag (bottom right corner)", "Allows you to resize the menu via dragging.").setEnabled(async () => {
	document.getElementById("cheat-menu").style.resize = "both";
}).setDisabled(() => {
	document.getElementById("cheat-menu").style.resize = "none";
	document.getElementById("cheat-menu").style.height = dimensions.height;
	document.getElementById("cheat-menu").style.width = dimensions.width;
});