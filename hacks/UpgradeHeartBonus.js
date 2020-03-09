// Upgrades the bonuses of your gear.
x = PIXI.game.state.states.Boot._gameData.affix;
for (i in x) {
PIXI.game.state.states.Boot._gameData.affix[i].data.value=Infinity;
PIXI.game.state.states.Boot._gameData.affix[i].data.valuePercent=Infinity}

// Bookmarklet:
javascript:x%3DPIXI.game.state.states.Boot._gameData.affix%3Bfor(i%20in%20x)PIXI.game.state.states.Boot._gameData.affix%5Bi%5D.data.value%3DInfinity%2CPIXI.game.state.states.Boot._gameData.affix%5Bi%5D.data.valuePercent%3DInfinity%3Bvoid+0
