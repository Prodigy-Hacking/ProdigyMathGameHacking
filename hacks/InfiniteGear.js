//Unlocks all equipment.
PIXI.game.prodigy.player.backpack.data.outfit=[]
x = PIXI.game.state.states.Boot._gameData.outfit
for (i in x) {
    PIXI.game.prodigy.player.backpack.data.outfit[i] = {"ID": x[i].ID, "N": 1}
}
PIXI.game.prodigy.player.backpack.data.hat=[]
x = PIXI.game.state.states.Boot._gameData.hat
for (i in x) {
    PIXI.game.prodigy.player.backpack.data.hat[i] = {"ID": x[i].ID, "N": 1}
}
PIXI.game.prodigy.player.backpack.data.boots=[]
x = PIXI.game.state.states.Boot._gameData.boots
for (i in x) {
    PIXI.game.prodigy.player.backpack.data.boots[i] = {"ID": x[i].ID, "N": 1}
}
PIXI.game.prodigy.player.backpack.data.weapon=[]
x = PIXI.game.state.states.Boot._gameData.weapon
for (i in x) {
    PIXI.game.prodigy.player.backpack.data.weapon[i] = {"ID": x[i].ID, "N": 1}
}
