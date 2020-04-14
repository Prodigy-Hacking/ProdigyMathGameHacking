//Use this script before very battle to DESTROY your enemies.(intended for wizard battles)
/*
Phaser.GAMES[0].state.states.Login._gameObj.debugMisc.setBattleEnergy(10); // Fills your combat energy!
Phaser.GAMES[0].state.states.Login._gameObj.debugMisc.easyMode(); // You dont have to do math problems anymore
*/


temp2.player.modifiers.barrier=true; // This dosent really help, but makes you look cool whenever you get atacked!
temp2.player.modifiers.maxHearts=10000 // Damage modifiers dont work for wizard battles but health does!
temp2.player.heal(Infinity); // Completly heals your player!


// Bookmarklet:
// javascript:(function()%7Btemp2.player.modifiers.barrier%3Dtrue%3B%0Atemp2.player.modifiers.maxHearts%3D10000%3B%0Atemp2.player.heal(Infinity)%3B%7D)()%3B
