// Gives all currencies.
PIXI.game.prodigy.player.backpack.data.currency=[]
x = PIXI.game.state.states.Boot._gameData.currency
for (i in x) {
    PIXI.game.prodigy.player.backpack.data.currency[i] = {"ID": x[i].ID, "N": 999999999}
}
//Sets the amount of all your currencies to 9 million.
x = PIXI.game.prodigy.player.backpack.data.currency
for (i in x) {
    x[i] = {"ID": x[i].ID, "N": 9000000}
}
