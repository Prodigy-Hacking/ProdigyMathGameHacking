import { Hack, category } from "../index";
import { Swal, Input, Toast } from "../utils/swal";
import { gameData, VERY_LARGE_NUMBER, savePlayer } from "../utils/util";
import { Item } from "../../../typings/item";
import { BackpackItemType } from "../../../typings/backpack";
import { prodigy, game } from "../utils/util";
const itemify = (item: Item[], amount: number) =>
	item.map(x => ({
		ID: x.ID,
		N:  amount,
	})).filter(v => v !== undefined);

const inventoryHack = (
	name: string,
	id: BackpackItemType,
	amount: number = 1
) => {
	new Hack(category.inventory, `Obtain All ${name}`).setClick(async () => {
		_.player.backpack.data[id] = itemify(gameData[id], amount);
		await Toast.fire(
			`${name} Added!`,
			`All ${name.toLowerCase()} have been added to your inventory!`,
			"success"
		);
		savePlayer();
	});
};
inventoryHack("Boots", "boots");
inventoryHack("Buddies", "follow");
inventoryHack("Fossils", "fossil", VERY_LARGE_NUMBER);
inventoryHack("Hats", "hat");
inventoryHack("Items", "item", VERY_LARGE_NUMBER);
inventoryHack("Key Items", "key", VERY_LARGE_NUMBER);
inventoryHack("Math Town Frames", "mathTownFrame", VERY_LARGE_NUMBER);
inventoryHack("Math Town Interiors", "mathTownInterior", VERY_LARGE_NUMBER);
inventoryHack("Mounts", "mount");
inventoryHack("Outfits", "outfit");
inventoryHack("Relics", "relic");
inventoryHack("Spell Relics", "spellRelic");
inventoryHack("Weapons", "weapon");
inventoryHack("Currency", "currency", VERY_LARGE_NUMBER);

new Hack(category.inventory, "Obtain All Furniture").setClick(async () => {
	gameData.dorm.forEach(x =>
		_.player.house.data.items[x.ID] = {A: [], N: VERY_LARGE_NUMBER}
	)
	await Toast.fire("Furniture Added!", "All furniture have been added to your inventory!", "success");
	savePlayer();
});