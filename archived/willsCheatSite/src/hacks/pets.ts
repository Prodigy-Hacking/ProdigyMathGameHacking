import { Swal, Toast, NumberInput } from "../utils/swal";
import { Hack, category } from "../index";
import { TODO } from "../../../../typings/util";
import { getGameData, VERY_LARGE_NUMBER, getBigData, updateUser } from "../utils/api";
import { Pet } from "../../../../typings/pet";
import _ from "lodash";
(async () => {
	const gameData = await getGameData();
	const randomSpell = () => gameData.spell[Math.floor(Math.random() * gameData.spell.length)].ID;
	const toPets = (ID: number): Pet => ({
		ID,
		catchDate: Date.now(),
		foreignSpells: [randomSpell(), randomSpell()],
		level: VERY_LARGE_NUMBER,
		levelCaught: 1,
		stars: VERY_LARGE_NUMBER,
	});
	const toLegitPet = (ID: number) => {
		const pet = toPets(ID);
		pet.foreignSpells = _.sampleSize(
			(gameData.pet.find(x => x.ID === ID)?.data.foreignSpellPools || []).flat(),
			2
		) as [number, number];
		return pet;
	};
	new Hack(category.pets, "Get All Pets").setClick(async () => {
		const bigData = await getBigData();
		if (!bigData) return;
		const pets = gameData.pet.map(x => toPets(x.ID));
		await updateUser({ pets: bigData.pets.concat(pets) });
		await Toast.fire("Success!", "All pets have been added!", "success");
	});

	new Hack(category.pets, "Get All Epics").setClick(async () => {
		const bigData = await getBigData();
		if (!bigData) return;
		const epics = [125, 126, 127, 128, 129, 130, 131, 132, 133];
		await updateUser({ pets: bigData.pets.concat(epics.map(toPets)) });
		await Toast.fire("Success!", "All epics have been added!", "success");
	});

	new Hack(category.pets, "Clear Pets").setClick(async () => {
		await updateUser({ pets: [] });
		await Toast.fire("Success!", "Your pets have been cleared!", "success");
	});

	new Hack(category.pets, "Add Pet", "Adds a pet from a list.").setClick(async () => {
		const bigData = await getBigData();
		if (!bigData) return;
		const pet = await Swal.fire({
			input: "select",
			inputOptions: new Map(gameData.pet.map(x => [x.ID.toString(), `${x.ID}: ${x.data.name}`])),
			title: "Choose Pet",
			text: "Which pet do you want to obtain?",
		});
		if (pet.value === undefined) return;
		await updateUser({ pets: bigData.pets.concat(toLegitPet(+pet.value)) });
		await Toast.fire("Success!", "Your chosen pet has been added to your pets!", "success");
	});

	new Hack(category.pets, "Edit Pet", "Edit a pet.").setClick(async () => {
		const bigData = await getBigData();
		if (!bigData) return;
		const pet = await Swal.fire({
			input: "select",
			inputOptions: new Map(
				bigData.pets.map((x: TODO, i: number) => [
					i.toString(),
					`Level ${x.level} - ${gameData.pet.find(y => +y.ID === +x.ID)?.data.name ?? "Unknown"}`,
				]) as [string, string][]
			),
			title: "Choose Pet",
			text: "Which pet do you want to edit?",
		});
		if (pet.value === undefined) return;
		const selected = bigData.pets[pet.value];
		const opt = await Swal.fire({
			input: "select",
			inputOptions: { level: "Level", attacks: "Attacks" },
			title: "Edit Property",
			text: "What do you want to edit?",
		});
		if (opt.value === undefined) return;
		if (opt.value === "level") {
			const level = await NumberInput.fire(
				"Level Number",
				"What level do you want to set your pet to?",
				"question"
			);
			if (level.value === undefined) return;
			selected.level = +level.value;
			await Toast.fire("Success!", "The pet's level has been set.", "success");
		} else if (opt.value === "attacks") {
			const attackList = gameData.spell;
			const div = document.createElement("div");
			const select = document.createElement("select");
			select.classList.add("selectSpell");
			select.classList.add("swal2-select");
			for (const spell of attackList) {
				const spellElement = document.createElement("option");
				spellElement.value = spell.ID.toString();
				spellElement.innerText = `${spell.ID}: ${spell.name} (${spell.data.element}) - Damage: ${spell.data.damage}`;
				select.options.add(spellElement);
			}
			div.append(select);
			div.append(select.cloneNode(true));
			const attacks = await Swal.fire({
				title: "Attack List",
				focusConfirm: false,
				showCancelButton: true,
				html: div,
				preConfirm: () => {
					return Array.prototype.slice
						.call(document.querySelectorAll(`.selectSpell`))
						.map((x: HTMLSelectElement) => x.options[x.selectedIndex].value);
				},
			});
			if (attacks.value === undefined) return;
			(selected.foreignSpells as number[]).splice(0, 2, ...attacks.value.map((x: string) => +x));
			await Toast.fire(
				"Attacks updated!",
				`The attack list of the pet you selected has been edited.`,
				"success"
			);
		}
		await updateUser({ pets: bigData.pets });
	});
})();
