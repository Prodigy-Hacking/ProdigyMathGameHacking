// These collective scripts boost your currencies, gold, items, Conjure Cubes, etc. etc.
PIXI.game.prodigy.debugMisc.getCubes(99);
PIXI.game.prodigy.create.conjureCubeButton();
//Sets the amount of all your currencies to 9 million.
x = PIXI.game.prodigy.player.backpack.data.currency;
for (i in x) {
    x[i] = {"ID": x[i].ID, "N": 9000000};
}
PIXI.game.prodigy.debugMisc.getAllPotions(999999999999);
PIXI.game.prodigy.debugMisc.smallLoan(1000000000);
//Sets the amount of all your currencies to 9 million.
x = PIXI.game.prodigy.player.backpack.data.item;
for (i in x) {
    x[i] = {"ID": x[i].ID, "N": 9000000};
}
PIXI.game.prodigy.player.tt=true;
//Gives you a large amount of assorted gear...
for (let i = 0; i < 5000; i++) {
 PIXI.game.prodigy.debugMisc.grabBag(50);
}

// Bookmarklet:
javascript:PIXI.game.prodigy.debugMisc.getCubes(99)%3BPIXI.game.prodigy.create.conjureCubeButton()%3Bx%3DPIXI.game.prodigy.player.backpack.data.currency%3Bfor(i%20in%20x)x%5Bi%5D%3D%7BID%3Ax%5Bi%5D.ID%2CN%3A9E6%7D%3BPIXI.game.prodigy.debugMisc.getAllPotions(999999999999)%3BPIXI.game.prodigy.debugMisc.smallLoan(1E9)%3Bx%3DPIXI.game.prodigy.player.backpack.data.item%3Bfor(i%20in%20x)x%5Bi%5D%3D%7BID%3Ax%5Bi%5D.ID%2CN%3A9E6%7D%3BPIXI.game.prodigy.player.tt%3D!0%3Bfor(var%20i%240%3D0%3B5E3%3Ei%240%3Bi%240%2B%2B)PIXI.game.prodigy.debugMisc.grabBag(50)%3Bvoid+0
