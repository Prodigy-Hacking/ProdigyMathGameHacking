import { Hack, category } from "../index";
import { Swal, Input, Toast } from "../utils/swal";
import { getGameData, VERY_LARGE_NUMBER, updateUser } from "../utils/api";
import { Item } from "../../../typings/item";
import { BackpackItemType } from "../../../typings/backpack";
(async () => {
	const gameData = await getGameData();
	const itemify = (item: Item[]) =>
		item.map(x => ({
			ID: x.ID,
			N: VERY_LARGE_NUMBER,
		}));
	const inventoryHack = async (name: string, id: BackpackItemType, lowercase: string = name.toLowerCase()) => {
		new Hack(category.inventory, `Obtain All ${name}`).setClick(async () => {
			await updateUser({ inventory: { [id]: itemify(gameData[id]) } });
			await Toast.fire(`${name} Added!`, `All ${lowercase} have been added to your inventory!`, "success");
		});
	};
	inventoryHack("Boots", "boots");
	inventoryHack("Currency", "currency", "currencies");
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
	new Hack(category.inventory, `Obtain All Furniture`).setClick(async () => {
		for (const x of gameData.dorm) {
			await updateUser({
				house: {
					items: {
						[x.ID]: {
							A: [],
							N: VERY_LARGE_NUMBER,
						},
					},
				},
			});
		}
		await Toast.fire(
			`Furniture Added!`,

			`All furniture have been added to your inventory!`,
			"success"
		);
	});
})();
