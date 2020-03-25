//Unlocks all equipment.
a=["outfit", "hat", "boots", "weapon", "spellRelic", "fossil"];
for (u of a) {
    Phaser.GAMES[0].prodigy.player.backpack.data[u]=[];
    x = Phaser.GAMES[0].state.states.Boot._gameData[u];
    for (i in x) {
        Phaser.GAMES[0].prodigy.player.backpack.data[u][i] = {"ID": x[i].ID, "N": 1};
    }
}

// special cases
Phaser.GAMES[0].prodigy.player.backpack.data.currency=[];
x = Phaser.GAMES[0].state.states.Boot._gameData.currency;
for (i in x) {
    Phaser.GAMES[0].prodigy.player.backpack.data.currency[i] = {"ID": x[i].ID, "N": 99999999};
}

// furniture
Phaser.GAMES[0].prodigy.player.house.data.items = []
x = Phaser.GAMES[0].state.states.Boot._gameData.dorm
for (i in x) {
    Phaser.GAMES[0].prodigy.player.house.data.items[x[i]["ID"]] = {A: [], N: 999}
}

Phaser.GAMES[0].prodigy.player.backpack.data.follow=[];
x = Phaser.GAMES[0].state.states.Boot._gameData.follow;
for (i in x) {
    Phaser.GAMES[0].prodigy.player.backpack.data.follow[i] = {"ID": x[i].ID};
}

// Gives player all items.
Phaser.GAMES[0].prodigy.player.backpack.data.item=[];
x = Phaser.GAMES[0].state.states.Boot._gameData.item;
for (i in x) {
    Phaser.GAMES[0].prodigy.player.backpack.data.item[i] = {"ID": x[i].ID, "N": 99999999};
}

// Bookmarklet:
// javascript:a%3D%5B%22outfit%22%2C%22hat%22%2C%22boots%22%2C%22weapon%22%5D%3Bfor(u%20in%20a)for(i%20in%20Phaser.GAMES[0].prodigy.player.backpack.data%5Bu%5D%3D%5B%5D%2Cx%3DPhaser.GAMES[0].state.states.Boot._gameData%5Bu%5D%2Cx)Phaser.GAMES[0].prodigy.player.backpack.data%5Bu%5D%5Bi%5D%3D%7BID%3Ax%5Bi%5D.ID%2CN%3A1%7D%3BPhaser.GAMES[0].prodigy.player.backpack.data.currency%3D%5B%5D%3Bx%3DPhaser.GAMES[0].state.states.Boot._gameData.currency%3Bfor(i%20in%20x)Phaser.GAMES[0].prodigy.player.backpack.data.currency%5Bi%5D%3D%7BID%3Ax%5Bi%5D.ID%2CN%3A99999999%7D%3BPhaser.GAMES[0].prodigy.player.backpack.data.follow%3D%5B%5D%3Bx%3DPhaser.GAMES[0].state.states.Boot._gameData.follow%3Bfor(i%20in%20x)Phaser.GAMES[0].prodigy.player.backpack.data.follow%5Bi%5D%3D%7BID%3Ax%5Bi%5D.ID%7D%3BPhaser.GAMES[0].prodigy.player.backpack.data.item%3D%5B%5D%3Bx%3DPhaser.GAMES[0].state.states.Boot._gameData.item%3Bfor(i%20in%20x)Phaser.GAMES[0].prodigy.player.backpack.data.item%5Bi%5D%3D%7BID%3Ax%5Bi%5D.ID%2CN%3A99999999%7D%3Bvoid+0
