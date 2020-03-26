// These collective scripts boost your currencies, gold, items, Conjure Cubes, etc. etc.
Phaser.GAMES[0].state.states.Login._gameObj.debugMisc.getCubes(99);
Phaser.GAMES[0].state.states.Login._gameObj.create.conjureCubeButton();
//Sets the amount of all your currencies to 9 million.
x = Phaser.GAMES[0].state.states.Login._gameObj.player.backpack.data.currency;
for (i in x) {
    x[i] = {"ID": x[i].ID, "N": 9000000};
}
Phaser.GAMES[0].state.states.Login._gameObj.debugMisc.getAllPotions(999999999999);
Phaser.GAMES[0].state.states.Login._gameObj.debugMisc.smallLoan(1000000000);
//Sets the amount of all your currencies to 9 million.
x = Phaser.GAMES[0].state.states.Login._gameObj.player.backpack.data.item;
for (i in x) {
    x[i] = {"ID": x[i].ID, "N": 9000000};
}
Phaser.GAMES[0].state.states.Login._gameObj.player.tt=true;
//Gives you a large amount of assorted gear...
for (let i = 0; i < 5000; i++) {
 Phaser.GAMES[0].state.states.Login._gameObj.debugMisc.grabBag(50);
}

// Bookmarklet:
// javascript:Phaser.GAMES[0].state.states.Login._gameObj.debugMisc.getCubes(99)%3BPhaser.GAMES[0].state.states.Login._gameObj.create.conjureCubeButton()%3Bx%3DPhaser.GAMES[0].state.states.Login._gameObj.player.backpack.data.currency%3Bfor(i%20in%20x)x%5Bi%5D%3D%7BID%3Ax%5Bi%5D.ID%2CN%3A9E6%7D%3BPhaser.GAMES[0].state.states.Login._gameObj.debugMisc.getAllPotions(999999999999)%3BPhaser.GAMES[0].state.states.Login._gameObj.debugMisc.smallLoan(1E9)%3Bx%3DPhaser.GAMES[0].state.states.Login._gameObj.player.backpack.data.item%3Bfor(i%20in%20x)x%5Bi%5D%3D%7BID%3Ax%5Bi%5D.ID%2CN%3A9E6%7D%3BPhaser.GAMES[0].state.states.Login._gameObj.player.tt%3D!0%3Bfor(var%20i%240%3D0%3B5E3%3Ei%240%3Bi%240%2B%2B)Phaser.GAMES[0].state.states.Login._gameObj.debugMisc.grabBag(50)%3Bvoid+0
