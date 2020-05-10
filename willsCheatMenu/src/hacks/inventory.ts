import { Hack, category } from "../index";
import { Swal, Input, Toast } from "../utils/swal";
import { gameData, VERY_LARGE_NUMBER, savePlayer } from "../utils/util";
import { Item } from "../../../typings/item";
import { BackpackItemType } from "../../../typings/backpack";
import { prodigy, game } from "../utils/util";
const itemify = (item: Item[]) =>
	item.map(x => ({
		ID: x.ID,
		N:  VERY_LARGE_NUMBER,
	}));

const inventoryHack = (
	name: string,
	id: BackpackItemType,
	lowercase: string = name.toLowerCase()
) => {
	new Hack(category.inventory, `Obtain All ${name}`).setClick(async () => {
		prodigy.player.backpack.data[id] = itemify(gameData[id]);
		await Toast.fire(
			`${name} Added!`,
			`All ${lowercase} have been added to your inventory!`,
			"success"
		);
		savePlayer();
	});
};
inventoryHack("Boots", "boots");
inventoryHack("Buddies", "follow");
inventoryHack("Fossils", "fossil");
inventoryHack("Hats", "hat");
inventoryHack("Items", "item");
inventoryHack("Key Items", "key");
inventoryHack("Math Town Frames", "mathTownFrame");
inventoryHack("Math Town Interiors", "mathTownInterior");
inventoryHack("Mounts", "mount");
inventoryHack("Outfits", "outfit");
inventoryHack("Relics", "relic");
inventoryHack("Spell Relics", "spellRelic");
inventoryHack("Weapons", "weapon");
new Hack(category.inventory, "Currency").setClick(async () => {
	gameData.currency.map(
		x =>
			(prodigy.player.backpack.data.currency[x.ID] = {
				ID: x.ID,
				N: VERY_LARGE_NUMBER,
			})
	);
	await Toast.fire(
		`Currency Added!`,

		`All currencies have been added to your inventory!`,
		"success"
	);
	savePlayer();
})
new Hack(category.inventory, `Obtain All Furniture`).setClick(async () => {
	gameData.dorm.map(
		x =>
			(prodigy.player.house.data.items[x.ID] = {
				A: [],
				N: VERY_LARGE_NUMBER,
			})
	);
	await Toast.fire(
		`Furniture Added!`,

		`All furniture have been added to your inventory!`,
		"success"
	);
	savePlayer();
});
