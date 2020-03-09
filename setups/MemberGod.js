PIXI.game.prodigy.player.it = true; // Set Membership
PIXI.game.prodigy.player.modifiers.damage=100; // 100x Damage
PIXI.game.prodigy.player.modifiers.maxHearts=100; // 100x HP
PIXI.game.prodigy.debugMisc.setGameSpeed(10); // 10x walking speed, 100x is annoying to look at

// TODO: Investigate why easy mode breaks battles
PIXI.game.prodigy.debugMisc.easyMode(1, 100); // Easy mode, 100% correct

// Bookmarklet:
javascript:PIXI.game.prodigy.player.it%3D!0%3BPIXI.game.prodigy.player.modifiers.damage%3D100%3BPIXI.game.prodigy.player.modifiers.maxHearts%3D100%3BPIXI.game.prodigy.debugMisc.setGameSpeed(10)%3BPIXI.game.prodigy.debugMisc.easyMode(1%2C100)%3Bvoid+0
