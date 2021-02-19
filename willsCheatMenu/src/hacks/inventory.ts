import { Hack, category } from "../index";
import { Swal, Input, Toast, Confirm, NumberInput } from "../utils/swal";
import { gameData, VERY_LARGE_NUMBER } from "../utils/util";
import { Item } from "../../../typings/item";
import { BackpackItemType } from "../../../typings/backpack";
import { prodigy, game } from "../utils/util";
const names = ['Boots', 'Buddies', 'Fossils', 'Hats', 'Items', 'Key Items', 'Tower Town Frames', 'Tower Town Interiors', 'Mounts', 'Outfits', 'Relics', 'Weapons', 'Currencies', 'Furniture', 'Runes']
const ids = ['boots', 'follow', 'fossil', 'hat', 'item', 'key', 'mathTownFrame', 'mathTownInterior', 'mount', 'outfit','spellRelic', 'weapon', 'currency','dorm']
const itemify = (item: Item[], amount: number) =>
	item.map(x => ({
		ID: x.ID,
		N: amount,
	})).filter(v => v !== undefined);

	// runes require a slightly different way

	const orbify = (item: Item[], amount: number) =>
	item.map(x => ({
		ID: x.ID,
		quantity: amount,
	})).filter(v => v !== undefined);

// typescript is picky af

// sorry for spamming ts-ignore

new Hack(category.inventory, "Selector (Basic)").setClick(async () => {
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
		const id = ids[num]
		if(!name) return;
		if (!(await Confirm.fire(`Are you sure you want to get all ${name.toLowerCase()}?`)).value) return;
		if (num === 14) {
			gameData.dorm.forEach(x =>
				_.player.house.data.items[x.ID] = { A: [], N: VERY_LARGE_NUMBER }
			)
			await Toast.fire("Furniture Added!", "All furniture have been added to your inventory!", "success");
			_.player.forceSaveCharacter()
		} else {
			if(val.value === 15){
				// ...

				let mod;
						Array.from( _.instance.prodigy.gameContainer.inversifyContainer._bindingDictionary._map).forEach(e => {
						// @ts-ignore
							try{if( _.instance.prodigy.gameContainer.get(e[0]).battleData){mod = e[0]}
						// @ts-ignore
						}catch{console.log(`Error for ${e[0]}`)}
						})
						_.instance.prodigy.gameContainer.get(mod).battleData._secureCharacterState._data.inventory.orb = orbify(_.gameData.orb,1)
						await Toast.fire("Runes Added!", "All runes have been added to your inventory!", "success");

				// ...
			}else{
			// @ts-ignore
			_.player.backpack.data[id] = itemify(gameData[id], VERY_LARGE_NUMBER);
			await Toast.fire(
				`${name} Added!`,
				`All ${name.toLowerCase()} have been added to your inventory!`,
				"success"
			);
			_.player.forceSaveCharacter()
		}}
	})
});
new Hack(category.inventory, "Selector (Advanced)",'Choose a specific object and quantity to obtain.').setClick(async () => {
	// @ts-ignore
	let val = await Swal.fire({
		title: "What would you like to obtain?",
		input: "select",
		inputOptions: names,
		inputPlaceholder: "Select...",
		inputValidator: (res: any) => res ? "" : "Please select which you'd like to obtain.",
		showCancelButton: true
	}).then(async val => {
		if(!_.gameData[ids[val.value]]) return;
		let objs : [] = []
		// @ts-ignore
		_.gameData[ids[val.value]].forEach(elem => {objs.push(elem.data.name)})
		// @ts-ignore
		let spec = await Swal.fire({
			title: `What specific object categorized as ${names[val.value].toLowerCase()} would you like to get?`,
			input: "select",
			inputOptions: objs,
			inputPlaceholder: "Select...",
			inputValidator: (res: any) => res ? "" : "Please select which you'd like to get.",
			showCancelButton: true
		}).then(async spec => {
			let correct = parseInt(spec.value) + 1
			if(!correct) return;
			let amt = await NumberInput.fire("Amount", `How many of the object would you like?`, "question");
			if(!amt.value) return;
			if (val.value === 14) {
				_.player.house.data.items[correct] = { A: [], N: amt.value}
				await Toast.fire("Furniture Added!", "Your selected furniture has been added.", "success");
				_.player.forceSaveCharacter()
			}else{
				if(val.value === 15){
						// ...

						let mod;
						Array.from( _.instance.prodigy.gameContainer.inversifyContainer._bindingDictionary._map).forEach(e => {
						// @ts-ignore
							try{if( _.instance.prodigy.gameContainer.get(e[0]).battleData){mod = e[0]}
						// @ts-ignore
						}catch{console.log(`Error for ${e[0]}`)}
						})
						_.instance.prodigy.gameContainer.get(mod).battleData._secureCharacterState._data.inventory.orb.push({
							ID: correct,
							quantity: amt.value,
							
						})

						// ...
				}else{
				// @ts-ignore
				_.player.backpack.data[ids[val.value]].push({
					ID: correct,
					N: amt.value,
					
				})
				await Toast.fire(`${names[val.value]} Added!`, `Your selected ${names[val.value].toLowerCase()} have been added.`, "success");
				_.player.forceSaveCharacter()
			}}
		})
	})
})
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