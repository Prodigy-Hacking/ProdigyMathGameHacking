// Lists interesting functions/objects we should look into.



// Gives all key items to player, other than Academy Amulet.
Phaser.GAMES[0].state.states.Login._gameObj.debugMisc.getKeyItems()

//Gives 100 Bounty points. For some reason, it doesn't work with more than 100 at a time.
Phaser.GAMES[0].state.states.Login._gameObj.debugMisc.getBounty(100)

// Heals team. (EXPERIMENTAL)
Phaser.GAMES[0].state.states.Login._gameObj.player.healTeam(9999999)

// It seems like there are a lot of debug functions left in here by the developers...
Phaser.GAMES[0].state.states.Login._gameObj.debugMisc.prototype
