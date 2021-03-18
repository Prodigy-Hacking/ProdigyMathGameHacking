// @ts-nocheck
import { Swal, Toast, NumberInput, Confirm } from "../utils/swal";
import { Hack, category, Toggler, dimensions } from "../index";
import { VERY_LARGE_NUMBER, gameData, pickRandom, saveCharacter } from "../utils/util";
import { prodigy, game } from "../utils/util";
import { Player } from "../../../typings/player";

new Hack(category.utility, "Save Character Locally", "Saves your character locally.").setClick(async () => {
    let playerdata = {}
    playerdata.equipment = _.player.equipment
    playerdata.tutorial = _.player.tutorial
    playerdata.pets = _.player.kennel._petData
    playerdata.data = _.player.data
    playerdata.encounters = _.player.encounters._data
    playerdata.house = _.player.house.data
    playerdata.inventory = _.player.backpack.data
    playerdata.quests = _.player.quests.data
    playerdata.state = _.player.state.data
    playerdata.appearance = _.player.appearance
    playerdata.tutorial = _.player.tutorial.data
    localStorage.playerdata = playerdata
    await Toast.fire("Success!", "Note: Load Character will only work on this device.", "success");
});

new Hack(category.utility, "Save Character Locally", "Saves your character locally.").setClick(async () => {
    let playerdata = {}
    playerdata.equipment = _.player.equipment
    playerdata.tutorial = _.player.tutorial
    playerdata.pets = _.player.kennel._petData
    playerdata.data = _.player.data
    playerdata.encounters = _.player.encounters._data
    playerdata.house = _.player.house.data
    playerdata.inventory = _.player.backpack.data
    playerdata.quests = _.player.quests.data
    playerdata.state = _.player.state.data
    playerdata.appearance = _.player.appearance
    playerdata.tutorial = _.player.tutorial.data
    localStorage.playerdata = playerdata
    await Toast.fire("Success!", "Note: Load Character will only work on this device.", "success");
});

new Hack(category.utility, "Load local character", "Loads your character locally.").setClick(async () => {
    if (!localStorage.playerdata) {
        await Toast.fire("Error", "No saved character.", "success");
    } else {
        let playerdata = JSON.parse(localStorage.playerdata)
        _.player.equipment = playerdata.equipment
        _.player.tutorial = playerdata.tutorial
        _.player.kennel._petData = playerdata.pets
        _.player.data = playerdata.data
        _.player.encounters._data = playerdata.encounters
        _.player.house.data = playerdata.house
        _.player.backpack.data = playerdata.inventory
        _.player.quests.data = playerdata.quests
        _.player.state.data = playerdata.state
        _.player.appearance = playerdata.appearance
        _.player.tutorial.data = playerdata.tutorial
        _.player.appearanceChanged = true
        await Toast.fire("Success!", "Character has been successfully loaded.", "success");
    }
});

new Hack(category.utility, "Save Character", "Helps fix bugs where not all hacks save.").setClick(async () => {
    saveCharacter()
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
        eval(await (await fetch(`https://raw.githubusercontent.com/Prodigy-Hacking/ProdigyMathGameHacking/HEAD/willsCheatMenu/dist/bundle.js?updated=${Date.now()}`)).text()) // updated parameter is so browser ignores cached version
    })()
    await Toast.fire("Updated!", "Cheat menu was updated.", "success");
});
new Hack(category.utility, "Disable inactivity kick", "Keeps you from being logged out for inactivity.").setClick(async () => {
    _.constants.constants["GameConstants.Inactivity.LOG_OUT_TIMER_SECONDS"] = 0;
    await Toast.fire("Success!", "You now will never be logged out!", "success");
});

new Toggler(category.utility, "Enable menu resize drag (bottom right corner)", 'Allows you to resize the menu via dragging.').setEnabled(async () => {
    document.getElementById('cheat-menu').style.resize = "both"
}).setDisabled(() => {
    document.getElementById('cheat-menu').style.resize = "none"
    document.getElementById('cheat-menu').style.height = dimensions.height
    document.getElementById('cheat-menu').style.width = dimensions.width
});