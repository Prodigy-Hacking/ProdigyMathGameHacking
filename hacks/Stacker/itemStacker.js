// Gives all armor, hats, boots, currencies, etc.
(() => {
    // FMI: every time prodigy patches, update scopeObj.
    const scopeObj = hack.instance;
    const playerObject = hack.player;
    
    // do not modify.
    const bootData = scopeObj.game.state.states.Boot._gameData;
    const backpackData = playerObject.backpack.data;
    

    hack.player.data.gold = 1e69;

    // all equipment
    let categories = ["boots", "follow", "fossil", "hat", "key", "mathTownFrame", "mathTownInterior", "outfit", "relic", "spellRelic", "weapon"];
    for (let category of categories) {
        backpackData[category] = [];

        for (let item in bootData[category]) {
            backpackData[category][item] = {"ID": bootData[category][item].ID};
        }
    }

    // special cases
    // currency
    backpackData.currency = [];
    for (let i in bootData.currency) {
        backpackData.currency[i] = {"ID": bootData.currency[i].ID, "N": 99999999};
    }

    // all items
    backpackData.item=[];
    for (let i in bootData.item) {
        backpackData.item[i] = {"ID": bootData.item[i].ID, "N": 99999999};
    }

    // furniture
    playerObject.house.data.items = []
    for (let i in bootData.dorm) {
        playerObject.house.data.items[bootData.dorm[i]["ID"]] = {A: [], N: 999};
    }
})();
