import { Hack, category } from "../index";
import { Swal, Input, Toast, Confirm } from "../utils/swal";
import { gameData, VERY_LARGE_NUMBER } from "../utils/util";
import { Item } from "../../../typings/item";
import { BackpackItemType } from "../../../typings/backpack";
import { prodigy, game } from "../utils/util";

const itemify = (item: Item[], amount: number) =>
	item.map(x => ({
		ID: x.ID,
		N: amount,
	})).filter(v => v !== undefined);

// typescript is picky af

// sorry for spamming ts-ignore

new Hack(category.inventory, "Selector").setClick(async () => {
	const names = ['Boots', 'Buddies', 'Fossils', 'Hats', 'Items', 'Key Items', 'Tower Town Frames', 'Tower Town Interiors', 'Mounts', 'Outfits', 'Relics', 'Spell Relics', 'Weapons', 'Currencies', 'Furniture']
	const ids = ['boots', 'follow', 'fossil', 'hat', 'item', 'key', 'mathTownFrame', 'mathTownInterior', 'mount', 'outfit', 'relic', 'spellRelic', 'weapon', 'currency']
	// @ts-ignore
	let val = await Swal.fire({
		title: "What would you like to obtain?",
		input: "select",
		inputOptions: names,
		inputPlaceholder: "Select...",
		inputValidator: (res: any) => res ? "" : "Please select which you'd like to obtain.",
		showCancelButton: true
	}).then(async val => {
		const num = parseInt(val.value)
		const name = names[num]
		if (!(await Confirm.fire(`Are you sure you want to get all ${name}?`)).value) return;
		if (num === 14) {
			gameData.dorm.forEach(x =>
				_.player.house.data.items[x.ID] = { A: [], N: VERY_LARGE_NUMBER }
			)
			await Toast.fire("Furniture Added!", "All furniture have been added to your inventory!", "success");
		} else {
			// @ts-ignore
			_.player.backpack.data[id] = itemify(gameData[id], VERY_LARGE_NUMBER);
			await Toast.fire(
				`${name} Added!`,
				`All ${name.toLowerCase()} have been added to your inventory!`,
				"success"
			);
		}
	})
});

/*
	const inventoryHack = (name: string, id: BackpackItemType, amount: number = 1) => {
	new Hack(category.inventory, `Obtain All ${name}`).setClick(async () => {
		if (!(await Confirm.fire(`Are you sure you want to get all ${name}?`)).value) return;
		_.player.backpack.data[id] = itemify(gameData[id], amount);
		await Toast.fire(
			`${name} Added!`,
			`All ${name.toLowerCase()} have been added to your inventory!`,
			"success"
		);
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
	if (!(await Confirm.fire("Are you sure you want to get all furniture?")).value) return;
		gameData.dorm.forEach(x =>
			_.player.house.data.items[x.ID] = {A: [], N: VERY_LARGE_NUMBER}
		)
		await Toast.fire("Furniture Added!", "All furniture have been added to your inventory!", "success");

	});
*/