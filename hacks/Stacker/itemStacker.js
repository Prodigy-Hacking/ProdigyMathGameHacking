// Gives all armor, hats, boots, currencies, etc.
(() => {
    // FMI: every time prodigy patches, update scopeObj.
    const scopeObj = hack.instance;
    const playerObject = hack.player;
    
    // Do not modify.
    const bootData = scopeObj.game.state.states.Boot._gameData;
    const backpackData = playerObject.backpack.data;
    
    playerObject.data.gold = playerObject.data.stars = playerObject.data.bountyScore = playerObject.data.level = 1e69;

    // All equipment
    let categories = ["boots", "follow", "fossil", "hat", "key", "mathTownFrame", "mathTownInterior", "outfit", "relic", "spellRelic", "weapon"];
    for (let category of categories) {
        backpackData[category] = [];

        for (let item in bootData[category]) {
            backpackData[category][item] = {"ID": bootData[category][item].ID};
        }
    }

    // Special cases
    // Currency
    backpackData.currency = [];
    for (let i in bootData.currency) {
        backpackData.currency[i] = {"ID": bootData.currency[i].ID, "N": 99999999};
    }

    // All items
    backpackData.item=[];
    for (let i in bootData.item) {
        backpackData.item[i] = {"ID": bootData.item[i].ID, "N": 99999999};
    }

    // Furniture
    playerObject.house.data.items = []
    for (let i in bootData.dorm) {
        playerObject.house.data.items[bootData.dorm[i]["ID"]] = {A: [], N: 999};
    }
    
    // Remove bounty notes (#229)
    let bountyIndex = _ => hack.player.backpack.data.item.findIndex(v => v.ID === 84 || v.ID === 85 || v.ID === 86)
    while (bountyIndex() > -1) hack.player.backpack.data.item.splice(bountyIndex(), 1)
})();
