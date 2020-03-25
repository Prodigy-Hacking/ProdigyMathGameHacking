// Upgrades the bonuses of your gear.
x = Phaser.GAMES[0].state.states.Boot._gameData.affix;
for (i in x) {
Phaser.GAMES[0].state.states.Boot._gameData.affix[i].data.value=Infinity;
Phaser.GAMES[0].state.states.Boot._gameData.affix[i].data.valuePercent=Infinity}

// Bookmarklet:
// javascript:x%3DPhaser.GAMES[0].state.states.Boot._gameData.affix%3Bfor(i%20in%20x)Phaser.GAMES[0].state.states.Boot._gameData.affix%5Bi%5D.data.value%3DInfinity%2CPhaser.GAMES[0].state.states.Boot._gameData.affix%5Bi%5D.data.valuePercent%3DInfinity%3Bvoid+0
