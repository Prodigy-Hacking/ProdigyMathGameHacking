// Gives you all fossils from Dyno Dig Oasis.
Phaser.GAMES[0].prodigy.player.backpack.data.fossil=[];
x = Phaser.GAMES[0].state.states.Boot._gameData.fossil;
for (i in x) {
    Phaser.GAMES[0].prodigy.player.backpack.data.fossil[i] = {"ID": x[i].ID, "N": 1};
}

// Bookmarklet:
// javascript:Phaser.GAMES[0].prodigy.player.backpack.data.fossil%3D%5B%5D%3Bx%3DPhaser.GAMES[0].state.states.Boot._gameData.fossil%3Bfor(i%20in%20x)Phaser.GAMES[0].prodigy.player.backpack.data.fossil%5Bi%5D%3D%7BID%3Ax%5Bi%5D.ID%2CN%3A1%7D%3Bvoid+0
