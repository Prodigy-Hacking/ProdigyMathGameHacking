// These collective scripts boost your currencies, gold, items, Conjure Cubes, etc. etc.
PIXI.game.prodigy.debugMisc.getCubes(99)
PIXI.game.prodigy.create.conjureCubeButton()
//Sets the amount of all your currencies to 9 million.
x = PIXI.game.prodigy.player.backpack.data.currency
for (i in x) {
    x[i] = {"ID": x[i].ID, "N": 9000000}
}
PIXI.game.prodigy.debugMisc.getAllPotions(999999999999)
PIXI.game.prodigy.debugMisc.smallLoan(1000000000)
//Sets the amount of all your currencies to 9 million.
x = PIXI.game.prodigy.player.backpack.data.item
for (i in x) {
    x[i] = {"ID": x[i].ID, "N": 9000000}
}
PIXI.game.prodigy.player.tt=true
//Gives you a large amount of assorted items...
for (let i = 0; i < 5000; i++) {
 PIXI.game.prodigy.debugMisc.grabBag(50);
}
