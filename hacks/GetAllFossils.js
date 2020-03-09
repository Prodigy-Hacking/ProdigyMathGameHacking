// Gives you all fossils from Dyno Dig Oasis.
PIXI.game.prodigy.player.backpack.data.fossil=[];
x = PIXI.game.state.states.Boot._gameData.fossil;
for (i in x) {
    PIXI.game.prodigy.player.backpack.data.fossil[i] = {"ID": x[i].ID, "N": 1};
}

// Bookmarklet:
javascript:PIXI.game.prodigy.player.backpack.data.fossil%3D%5B%5D%3Bx%3DPIXI.game.state.states.Boot._gameData.fossil%3Bfor(i%20in%20x)PIXI.game.prodigy.player.backpack.data.fossil%5Bi%5D%3D%7BID%3Ax%5Bi%5D.ID%2CN%3A1%7D%3Bvoid+0
