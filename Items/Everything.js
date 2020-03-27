//Unlocks all equipment.
a=["outfit", "hat", "boots", "weapon", "spellRelic", "fossil"];
for (u of a) {
   Phaser.GAMES[0].state.states.Boot._metricsManager.gameCompleteDataFactory.gameEventDataBuilder.loggedInPlayer._player.backpack.data[u]=[];
    x = Phaser.GAMES[0].state.states.Boot._gameData[u];
    for (i in x) {
Phaser.GAMES[0].state.states.Boot._metricsManager.gameCompleteDataFactory.gameEventDataBuilder.loggedInPlayer._player.backpack.data[u][i] = {"ID": x[i].ID, "N": 1};
    }
}

// special cases
Phaser.GAMES[0].state.states.Boot._metricsManager.gameCompleteDataFactory.gameEventDataBuilder.loggedInPlayer._player.backpack.data.currency=[];
x = Phaser.GAMES[0].state.states.Boot._gameData.currency;
for (i in x) {
    Phaser.GAMES[0].state.states.Boot._metricsManager.gameCompleteDataFactory.gameEventDataBuilder.loggedInPlayer._player.backpack.data.currency[i] = {"ID": x[i].ID, "N": 99999999};
}

// furniture
Phaser.GAMES[0].state.states.Boot._metricsManager.gameCompleteDataFactory.gameEventDataBuilder.loggedInPlayer._player.house.data.items = []
x = Phaser.GAMES[0].state.states.Boot._gameData.dorm
for (i in x) {
    Phaser.GAMES[0].state.states.Boot._metricsManager.gameCompleteDataFactory.gameEventDataBuilder.loggedInPlayer._player.house.data.items[x[i]["ID"]] = {A: [], N: 999}
}

Phaser.GAMES[0].state.states.Boot._metricsManager.gameCompleteDataFactory.gameEventDataBuilder.loggedInPlayer._player.backpack.data.follow=[];
x = Phaser.GAMES[0].state.states.Boot._gameData.follow;
for (i in x) {
    Phaser.GAMES[0].state.states.Boot._metricsManager.gameCompleteDataFactory.gameEventDataBuilder.loggedInPlayer._player.backpack.data.follow[i] = {"ID": x[i].ID};
}

// Gives player all items.
Phaser.GAMES[0].state.states.Boot._metricsManager.gameCompleteDataFactory.gameEventDataBuilder.loggedInPlayer._player.backpack.data.item=[];
x = Phaser.GAMES[0].state.states.Boot._gameData.item;
for (i in x) {
    Phaser.GAMES[0].state.states.Boot._metricsManager.gameCompleteDataFactory.gameEventDataBuilder.loggedInPlayer._player.backpack.data.item[i] = {"ID": x[i].ID, "N": 99999999};
}
