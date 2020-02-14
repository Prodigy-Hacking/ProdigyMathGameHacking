// Gives player all relics.
PIXI.game.prodigy.player.backpack.data.relic=[]
x = PIXI.game.state.states.Boot._gameData.relic
for (i in x) {
    PIXI.game.prodigy.player.backpack.data.relic[i] = {"ID": x[i].ID, "N": 1}
}
