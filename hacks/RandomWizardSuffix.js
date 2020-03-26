// Gives you a new wizard suffix (i.e. Nightcatcher, Quakecaller, Angelbreath, etc.)
Phaser.GAMES[0].state.states.Login._gameObj.player.appearance._name.lastName=(Math.round(Math.random() * 1000));
Phaser.GAMES[0].state.states.Login._gameObj.player.appearance._name.middleName=(Math.round(Math.random() * 1000));

// Bookmarklet:
// javascript:Phaser.GAMES[0].state.states.Login._gameObj.player.appearance._name.lastName%3DMath.round(1E3*Math.random())%3BPhaser.GAMES[0].state.states.Login._gameObj.player.appearance._name.middleName%3DMath.round(1E3*Math.random())%3Bvoid+0
