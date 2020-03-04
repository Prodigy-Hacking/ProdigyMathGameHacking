//Unlocks all equipment.
a=["outfit", "hat", "boots", "weapon"]
for (u in a) {
    PIXI.game.prodigy.player.backpack.data[u]=[]
    x = PIXI.game.state.states.Boot._gameData[u]
    for (i in x) {
        PIXI.game.prodigy.player.backpack.data[u][i] = {"ID": x[i].ID, "N": 1}
    }
}

// special cases
PIXI.game.prodigy.player.backpack.data.currency=[]
x = PIXI.game.state.states.Boot._gameData.currency
for (i in x) {
    PIXI.game.prodigy.player.backpack.data.currency[i] = {"ID": x[i].ID, "N": 99999999}
}

PIXI.game.prodigy.player.backpack.data.follow=[];
x = PIXI.game.state.states.Boot._gameData.follow;
for (i in x) {
    PIXI.game.prodigy.player.backpack.data.follow[i] = {"ID": x[i].ID}
}

// Gives player all items.
PIXI.game.prodigy.player.backpack.data.item=[]
x = PIXI.game.state.states.Boot._gameData.item
for (i in x) {
    PIXI.game.prodigy.player.backpack.data.item[i] = {"ID": x[i].ID, "N": 99999999}
}
