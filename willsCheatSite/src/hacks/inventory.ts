import { Hack, category } from "../index";
import { Swal, Input, Toast } from "../utils/swal";
import { getGameData, VERY_LARGE_NUMBER, updateUser, LARGE_NUMBER, getBigData } from "../utils/api";
import { Item } from "../../../typings/item";
import { BackpackItemType } from "../../../typings/backpack";
(async () => {
	const gameData = await getGameData();
	const itemify = (item: Item[], overrideNum = VERY_LARGE_NUMBER) =>
		item.map(x => ({
			ID: x.ID,
			N: overrideNum,
		}));
	const inventoryHack = async (
		name: string,
		id: BackpackItemType,
		lowercase: string = name.toLowerCase(),
		overrideNum = VERY_LARGE_NUMBER
	) => {
		new Hack(category.inventory, `Obtain All ${name}`).setClick(async () => {
			await updateUser({ inventory: { [id]: itemify(gameData[id]) } });
			await Toast.fire(`${name} Added!`, `All ${lowercase} have been added to your inventory!`, "success");
		});
	};
	inventoryHack("Boots", "boots");
	inventoryHack("Currency", "currency", "currencies", LARGE_NUMBER);
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
		const bigData = await getBigData();
		if (!bigData) return;
		for (const x of gameData.dorm) {
			bigData.house.items[x.ID] = {
				A: [],
				N: VERY_LARGE_NUMBER,
			};
		}
		await updateUser({
			house: {
				items: bigData.house.items,
			},
		});
		await Toast.fire(
			`Furniture Added!`,

			`All furniture have been added to your inventory!`,
			"success"
		);
	});
	new Hack(category.inventory, `Clear Furniture`).setClick(async () => {
		await updateUser({
			house: {
				items: {},
			},
		});
		await Toast.fire(
			`Furniture Added!`,

			`All furniture has been removed!`,
			"success"
		);
	});
})();
