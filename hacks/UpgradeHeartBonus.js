// Upgrades the bonuses of your gear.
x = PIXI.game.state.states.Boot._gameData.affix
for (i in x) {
    PIXI.game.state.states.Boot._gameData.affix[i].data.value=100000000000000000000000000
PIXI.game.state.states.Boot._gameData.affix[i].data.valuePercent=10000000000000000000000
}
