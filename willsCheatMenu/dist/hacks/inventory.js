define(["require", "exports", "../index", "../utils/swal", "../utils/util"], function (require, exports, index_1, swal_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const itemify = (item) => item.map(x => ({
        ID: x.ID,
        N: util_1.VERY_LARGE_NUMBER,
    }));
    const inventoryHack = (name, id, lowercase = name.toLowerCase()) => {
        new index_1.Hack(index_1.category.inventory, `Obtain All ${name}`).setClick(async () => {
            hack.player.backpack.data[id] = itemify(util_1.gameData[id]);
            await swal_1.Toast.fire(`${name} Added!`, `All ${lowercase} have been added to your inventory!`, "success");
            util_1.savePlayer();
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
    new index_1.Hack(index_1.category.inventory, "Currency").setClick(async () => {
        util_1.gameData.currency.map(x => (hack.player.backpack.data.currency[x.ID] = {
            ID: x.ID,
            N: util_1.VERY_LARGE_NUMBER,
        }));
        await swal_1.Toast.fire(`Currency Added!`, `All currencies have been added to your inventory!`, "success");
        util_1.savePlayer();
    });
    new index_1.Hack(index_1.category.inventory, `Obtain All Furniture`).setClick(async () => {
        util_1.gameData.dorm.map(x => (hack.player.house.data.items[x.ID] = {
            A: [],
            N: util_1.VERY_LARGE_NUMBER,
        }));
        await swal_1.Toast.fire(`Furniture Added!`, `All furniture have been added to your inventory!`, "success");
        util_1.savePlayer();
    });
});
//# sourceMappingURL=inventory.js.map