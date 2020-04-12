(() => {
    // every time prodigy patches, update these variables to fix the hack.
    const bootData = temp1.object.n.c[0].exports.a.instance.game.state.states.Boot._gameData;
    const backpackData = temp1.object.n.c[0].exports.a.instance.prodigy.player.backpack.data;
    const playerObject = temp1.object.n.c[0].exports.a.instance.prodigy.player;

    // all equipment
    let a = ["outfit", "hat", "boots", "weapon", "spellRelic", "fossil", "follow"];
    for (let u of a) {
        backpackData[u] = [];
        for (let i in bootData[u]) {
            backpackData[u][i] = {"ID": bootData[u][i].ID};
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
    for (i in bootData.dorm) {
        playerObject.house.data.items[bootData.dorm[i]["ID"]] = {A: [], N: 999}
    }
})()
