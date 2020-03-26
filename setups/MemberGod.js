Phaser.GAMES[0].state.states.Login._gameObj.player.it = true; // Set Membership
Phaser.GAMES[0].state.states.Login._gameObj.player.modifiers.damage=100; // 100x Damage
Phaser.GAMES[0].state.states.Login._gameObj.player.modifiers.maxHearts=100; // 100x HP
Phaser.GAMES[0].state.states.Login._gameObj.debugMisc.setGameSpeed(10); // 10x walking speed, 100x is annoying to look at

// TODO: Investigate why easy mode breaks battles
Phaser.GAMES[0].state.states.Login._gameObj.debugMisc.easyMode(1, 100); // Easy mode, 100% correct

// Bookmarklet:
// javascript:Phaser.GAMES[0].state.states.Login._gameObj.player.it%3D!0%3BPhaser.GAMES[0].state.states.Login._gameObj.player.modifiers.damage%3D100%3BPhaser.GAMES[0].state.states.Login._gameObj.player.modifiers.maxHearts%3D100%3BPhaser.GAMES[0].state.states.Login._gameObj.debugMisc.setGameSpeed(10)%3BPhaser.GAMES[0].state.states.Login._gameObj.debugMisc.easyMode(1%2C100)%3Bvoid+0
