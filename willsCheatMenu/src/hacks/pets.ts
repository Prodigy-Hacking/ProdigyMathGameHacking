import { Swal, Toast, NumberInput } from "../utils/swal";
import { Hack, category } from "../index";
import { VERY_LARGE_NUMBER, gameData, pickRandom } from "../utils/util";


const randomSpell = () =>
	gameData.spell[Math.floor(Math.random() * gameData.spell.length)].ID;
const toPets = (ID: number) => ({
	ID,
	catchDate: Date.now(),
	foreignSpells: [randomSpell(), randomSpell()],
	level: VERY_LARGE_NUMBER,
	levelCaught: 1,
	stars: VERY_LARGE_NUMBER,
});
new Hack(category.pets, "Get All Pets").setClick(async () => {
	const pets = gameData.pet.map(x => toPets(x.ID));
	Phaser.GAMES[0].prodigy.player.kennel.data.splice(-1, 0, ...pets);
	await Toast.fire("Success!", "All pets have been added!", "success");
});

new Hack(category.pets, "Get All Epics").setClick(async () => {
	const epics = [125, 126, 127, 128, 129, 130, 131, 132, 133];
	Phaser.GAMES[0].prodigy.player.kennel.data.splice(-1, 0, ...epics.map(toPets));
	await Toast.fire("Success!", "All epics have been added!", "success");
});

new Hack(category.pets, "Clear Pets").setClick(async () => {
	Phaser.GAMES[0].prodigy.player.kennel.data.length = 0;
	await Toast.fire("Success!", "Your pets have been cleared!", "success");
});

new Hack(category.pets, "Add Pet", "Adds a pet from a list.").setClick(async () => {
	const pet = await Swal.fire({
		input: "select",
		inputOptions: new Map(gameData.pet.map(x => [x.ID.toString(), `${x.ID}: ${x.data.name}`])),
		title: "Choose Pet",
		text: "Which pet do you want to obtain?"
	});
	if (pet.value === undefined) return;
	Phaser.GAMES[0].prodigy.player.kennel.addPet(pet.value);
	await Toast.fire("Success!", "Your chosen pet has been added to your pets!", "success");
});