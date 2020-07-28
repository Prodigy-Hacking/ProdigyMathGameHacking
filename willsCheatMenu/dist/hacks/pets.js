define(["require", "exports", "../utils/swal", "../index", "../utils/util"], function (require, exports, swal_1, index_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const randomSpell = () => util_1.gameData.spell.filter(x => +x.ID !== 90)[Math.floor(Math.random() * util_1.gameData.spell.length)].ID;
    const toPets = (ID) => ({
        ID,
        catchDate: Date.now(),
        foreignSpells: [randomSpell(), randomSpell()],
        level: util_1.VERY_LARGE_NUMBER,
        levelCaught: 1,
        stars: util_1.VERY_LARGE_NUMBER,
    });
    new index_1.Hack(index_1.category.pets, "Get All Pets").setClick(async () => {
        const pets = util_1.gameData.pet.map(x => toPets(x.ID));
        hack.player.kennel.data.splice(-1, 0, ...pets);
        await swal_1.Toast.fire("Success!", "All pets have been added!", "success");
    });
    new index_1.Hack(index_1.category.pets, "Get All Epics").setClick(async () => {
        const epics = [125, 126, 127, 128, 129, 130, 131, 132, 133];
        hack.player.kennel.data.splice(-1, 0, ...epics.map(toPets));
        await swal_1.Toast.fire("Success!", "All epics have been added!", "success");
    });
    new index_1.Hack(index_1.category.pets, "Fix Battle Crash").setClick(async () => {
        hack.player.kennel.petTeam.forEach(v => {
            if (v && v.assignRandomSpells)
                v.assignRandomSpells();
        });
        await swal_1.Toast.fire("Success!", "Fixed kennel attack bug!", "success");
    });
    new index_1.Hack(index_1.category.pets, "Clear Pets").setClick(async () => {
        hack.player.kennel.data.length = 0;
        await swal_1.Toast.fire("Success!", "Your pets have been cleared!", "success");
    });
    new index_1.Hack(index_1.category.pets, "Add Pet", "Adds a pet from a list.").setClick(async () => {
        const pet = await swal_1.Swal.fire({
            input: "select",
            inputOptions: new Map(util_1.gameData.pet.map(x => [x.ID.toString(), `${x.ID}: ${x.data.name}`])),
            title: "Choose Pet",
            text: "Which pet do you want to obtain?",
        });
        if (pet.value === undefined)
            return;
        hack.player.kennel.addPet(pet.value);
        await swal_1.Toast.fire("Success!", "Your chosen pet has been added to your pets!", "success");
    });
    const getPet = async (text) => {
        const pet = await swal_1.Swal.fire({
            input: "select",
            inputOptions: new Map(hack.player.kennel.data.map((x, i) => [
                i.toString(),
                `Level ${x.level} - ${x.nickname ?? util_1.gameData.pet.find(y => +y.ID === +x.ID)?.data.name ?? "Unknown"}`,
            ])),
            title: "Choose Pet",
            text: text,
        });
        return pet.value;
    };
    new index_1.Hack(index_1.category.pets, "Edit Pet", "Edit a pet.").setClick(async () => {
        const pet = await getPet("Choose the pet to edit.");
        if (pet === undefined)
            return;
        const selected = hack.player.kennel.data[pet];
        const opt = await swal_1.Swal.fire({
            input: "select",
            inputOptions: { level: "Level", attacks: "Attacks", name: "Name" },
            title: "Edit Property",
            text: "What do you want to edit?",
        });
        if (opt.value === undefined)
            return;
        if (opt.value === "level") {
            const level = await swal_1.NumberInput.fire("Level Number", "What level do you want to set your pet to?", "question");
            if (level.value === undefined)
                return;
            selected.level = +level.value;
            await swal_1.Toast.fire("Success!", "The pet's level has been set.", "success");
        }
        else if (opt.value === "attacks") {
            const attackList = util_1.gameData.spell;
            const div = document.createElement("div");
            const select = document.createElement("select");
            select.classList.add("selectSpell");
            for (const spell of attackList) {
                const spellElement = document.createElement("option");
                spellElement.value = spell.ID.toString();
                spellElement.innerText = `${spell.ID}: ${spell.name} (${spell.data.element}) - Damage: ${spell.data.damage}`;
                select.options.add(spellElement);
            }
            div.append(select);
            div.append(select.cloneNode(true));
            const attacks = await swal_1.Swal.fire({
                title: "Attack List",
                focusConfirm: false,
                showCancelButton: true,
                html: div,
                preConfirm: () => {
                    return Array.prototype.slice
                        .call(document.querySelectorAll(`.selectSpell`))
                        .map((x) => x.options[x.selectedIndex].value);
                },
            });
            if (attacks.value === undefined)
                return;
            selected.foreignSpells.splice(0, 2, ...attacks.value.map((x) => +x));
            await swal_1.Toast.fire("Attacks updated!", `The attack list of the pet you selected has been edited.`, "success");
        }
        else if (opt.value === "name") {
            const name = await swal_1.Input.fire("Input Name", "What do you want to name the pet?", "question");
            if (name.value === undefined)
                return;
            selected.nickname = name.value;
            await swal_1.Swal.fire("Successfully renamed!", "The name of the pet has been changed.", "success");
        }
    });
    new index_1.Hack(index_1.category.pets, "Delete Pet", "Delete a pet.").setClick(async () => {
        const pet = await getPet("Which pet do you wish to delete?");
        if (pet === undefined)
            return;
        hack.player.kennel.data.splice(pet, 1);
        await swal_1.Swal.fire("Successfully deleted!", "The selected pet was deleted successfully.", "success");
    });
});
//# sourceMappingURL=pets.js.map