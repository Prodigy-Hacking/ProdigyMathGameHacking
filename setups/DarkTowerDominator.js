// Use this right after you get into the Dark Tower!
Phaser.GAMES[0].state.states.Login._gameObj.debugMisc.tpTowerFloor(100);
Phaser.GAMES[0].state.states.Login._gameObj.player.modifiers.damage=1000; // 1000x Damage
Phaser.GAMES[0].state.states.Login._gameObj.player.modifiers.maxHearts=1000; // 1000x HP
Phaser.GAMES[0].state.states.Login._gameObj.player.heal(9999999999999999999999999999999999999999999999);

// Bookmarklet:
// javascript:Phaser.GAMES[0].state.states.Login._gameObj.debugMisc.tpTowerFloor(100)%3BPhaser.GAMES[0].state.states.Login._gameObj.player.modifiers.damage%3D1E3%3BPhaser.GAMES[0].state.states.Login._gameObj.player.modifiers.maxHearts%3D1E3%3BPhaser.GAMES[0].state.states.Login._gameObj.player.heal(1E46)%3Bvoid+0
