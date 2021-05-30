//@ts-nocheck
import { Hack, category } from "../index";
import { Swal, Input, Toast, Confirm, NumberInput } from "../utils/swal";
import { gameData, VERY_LARGE_NUMBER, saveCharacter} from "../utils/util";
import { Item } from "../../../typings/item";
import { BackpackItemType } from "../../../typings/backpack";
import { prodigy, game } from "../utils/util";
const names = ['Boots', 'Buddies', 'Fossils', 'Hats', 'Items', 'Key Items', 'Tower Town Frames', 'Tower Town Interiors', 'Mounts', 'Outfits', 'Relics', 'Weapons', 'Currencies']
const ids = ['boots', 'follow', 'fossil', 'hat', 'item', 'key', 'mathTownFrame', 'mathTownInterior', 'mount', 'outfit','spellRelic', 'weapon', 'currency']
const itemify = (item: Item[], amount: number) =>
	item.map(x => ({
		ID: x.ID,
		N: amount,
	})).filter(v => v !== undefined);

// typescript is picky af

// sorry for spamming ts-ignore
new Hack(category.inventory, "Item stacker").setClick(async () => {
const num = await NumberInput.fire('Amount',`How many of every item would you like?`,'question')
if(!num.value) return
if (!(await Confirm.fire(`Are you sure you want to get all items in the game?`))) return;
let gameData = _.instance.game.state.states.get('Boot').gameData
let ids = ['boots', 'follow', 'fossil', 'hat', 'item', 'key', 'mathTownFrame', 'mathTownInterior', 'mount', 'outfit','spellRelic', 'weapon', 'currency']

let itemify = (item, amount) =>
	item.map(x => ({
		ID: x.ID,
		N: amount,
	})).filter(v => v !== undefined);
ids.forEach(id => {
    _.player.backpack.data[id] = itemify(_.gameData[id], num.value)
});
_.gameData.dorm.forEach(x =>
    _.player.house.data.items[x.ID] = {A: [], N: num.value}
)

// Remove bounty notes (#229)
let bountyIndex = () => _.player.backpack.data.item.findIndex(v => v.ID === 84 || v.ID === 85 || v.ID === 86)
while (bountyIndex() > -1) _.player.backpack.data.item.splice(bountyIndex(), 1)
await Toast.fire('Success!','All items added!','success')
})

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
		let amt = await NumberInput.fire("Amount", `How many each object would you like?`, "question");
		if(!amt.value) return;
		if (!(await Confirm.fire(`Are you sure you want to get all ${name.toLowerCase()}?`)).value) return;
			// @ts-ignore
			_.player.backpack.data[id] = itemify(_.gameData[id], amt.value);
			await Toast.fire(
				`${name} Added!`,
				`All ${name.toLowerCase()} have been added to your inventory!`,
				"success"
			);
			saveCharacter()
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
			let correct = parseInt(spec.value)
			if(!_.gameData[ids[val.value]][correct]) return;
			let amt = await NumberInput.fire("Amount", `How many of the object would you like?`, "question");
			if(!amt.value) return;
				
			// @ts-ignore
			if(_.player.backpack.data[ids[val.value]].findIndex(e => e.ID === _.gameData[ids[val.value]][correct].ID)===-1){
				_.player.backpack.data[ids[val.value]].push({
					ID: _.gameData[ids[val.value]][correct].ID,
					N: amt.value,
				})}else{
					// @ts-ignore
					let num = _.player.backpack.data[ids[val.value]].findIndex(e => e.ID === _.gameData[ids[val.value]][correct].ID)
				}
				
				await Toast.fire(`${names[val.value]} Added!`, `Your selected ${names[val.value].toLowerCase()} have been added.`, "success");
				saveCharacter()
		})
	})
})
new Hack(category.inventory, "Get all runes").setClick(async () => {
	if(!(await Confirm.fire({
		title: 'Hang on!',
		html: 'This feature is in <strong>beta</strong>. Using this could break your account in a specific way. This should be used for experimentation <strong>only</strong>.<br><br>Proceed?',
		icon: "warning"
	})).value){return}

	const runeify = (item: Item[], amount: number) =>
	item.map(x => ({
		ID: x.ID,
		quantity: amount,
	})).filter(v => v !== undefined);
	let val = await NumberInput.fire({
		title:"Amount",
		text: `How many of each would you like?`, 
		icon:"question",
		inputValidator: (res: any) => res ? "" : "Please select which you'd like to get."
});
	if(typeof val.value != "number") return;
	let mod;
Array.from( _.instance.prodigy.gameContainer.inversifyContainer._bindingDictionary._map).forEach(e => {
	// @ts-ignore
try{if( _.instance.prodigy.gameContainer.get(e[0]).battleData){mod= e[0]}
// @ts-ignore
}catch{console.log(`Error for ${e[0]}`)}
})
_.instance.prodigy.gameContainer.get(mod).battleData._secureCharacterState._data.inventory.orb = runeify(_.gameData.orb, val.value)
await Toast.fire("Runes Added!", "Your runes have been added!", "success");
});

new Hack(category.inventory, "Obtain All Furniture").setClick(async () => {
	let amt = await NumberInput.fire("Amount", `How many of each piece of furniture would you like?`, "question");
	if(!amt.value) return;
	if (!(await Confirm.fire("Are you sure you want to get all furniture?")).value) return;
		_.gameData.dorm.forEach(x =>
			_.player.house.data.items[x.ID] = {A: [], N: amt.value}
		)
		await Toast.fire("Furniture Added!", "All furniture has been added to your inventory!", "success");

	});

new Hack(category.inventory, "Obtain All Mounts", "This gives you the Fluffy Cloud and the Rainbow Cloud.").setClick(async() => {
	_.player.backpack.data.mount = itemify(_.gameData.mount, 1);
	await Toast.fire("Mounts Added!", "All mounts have been added to your inventory!");
});

/*
	const inventoryHack = (name: string, id: BackpackItemType, amount: number = 1) => {
	new Hack(category.inventory, `Obtain All ${name}`).setClick(async () => {
		if (!(await Confirm.fire(`Are you sure you want to get all ${name}?`)).value) return;
		_.player.backpack.data[id] = itemify(_.gameData[id], amount);
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
		_.gameData.dorm.forEach(x =>
			_.player.house.data.items[x.ID] = {A: [], N: VERY_LARGE_NUMBER}
		)
		await Toast.fire("Furniture Added!", "All furniture have been added to your inventory!", "success");

	});
*/

new Hack(category.inventory, "Remove item").setClick(async () => {
	const category = await Swal.fire({
		title: "What category would you like to remove an item from?",
		input: "select",
		inputOptions: names,
		inputPlaceholder: "Select...",
		inputValidator: (res: any) => res ? "" : "Please select which you'd like to obtain.",
		showCancelButton: true
	});
	if(!_.gameData[ids[category.value]]) return;
	const objs = _.gameData[ids[category.value]].map(elem => elem.data.name);
	let item = await Swal.fire({
		title: `What specific object categorized as ${names[category.value].toLowerCase()} would you like to remove?`,
		input: "select",
		inputOptions: objs,
		inputPlaceholder: "Select...",
		inputValidator: (res: any) => res ? "" : "Please select which you'd like to get.",
		showCancelButton: true
	});
	item = parseInt(item.value);
	if(!_.gameData[ids[category.value]][item]) return;
	const amt = await NumberInput.fire("Amount", "How many of the object would you like to remove?", "question");
	if(!amt.value) return;
	if (_.player.backpack.data[ids[category.value]].findIndex(e => e.ID === _.gameData[ids[category.value]][item].ID) === -1) {
		await Swal.fire("Item Does Not Exist", `You do not have any ${_.gameData[ids[category.value]][item].name}.`, "error");
		return;
	}

	const num = _.player.backpack.data[ids[category.value]].findIndex(e => e.ID === _.gameData[ids[category.value]][item].ID);
	_.player.backpack.data[ids[category.value]][num].N -= parseInt(amt.value);
	if (_.player.backpack.data[ids[category.value]][num].N <= 0) {
		_.player.backpack.data[ids[category.value]].splice(num, 1); // if the amount is 0 or below then the item should not exist
	}

	await Toast.fire("Removed!", `Successfully removed ${amt.value} ${_.gameData[ids[category.value]][item].name}!`, "success");
	saveCharacter();
})