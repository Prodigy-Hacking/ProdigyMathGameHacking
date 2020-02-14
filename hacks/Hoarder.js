// Gives player all items.
PIXI.game.prodigy.player.backpack.data.item=[]
x = PIXI.game.state.states.Boot._gameData.item
for (i in x) {
    PIXI.game.prodigy.player.backpack.data.item[i] = {"ID": x[i].ID, "N": 1}
}
//Sets the amount of all your items to 9 million.
x = PIXI.game.prodigy.player.backpack.data.item
for (i in x) {
    x[i] = {"ID": x[i].ID, "N": 9000000}
}
