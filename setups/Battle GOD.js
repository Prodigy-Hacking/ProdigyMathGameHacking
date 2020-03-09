//Use this script before very battle to DESTROY your enemies.(intended for wizard battles)
PIXI.game.prodigy.debugMisc.setBattleEnergy(10); // Fills your combat energy!
PIXI.game.prodigy.debugMisc.easyMode(); // You dont have to do math problems anymore!
PIXI.game.prodigy.player.modifiers.barrier=true; // This dosent really help, but makes you look cool whenever you get atacked!
PIXI.game.prodigy.player.modifiers.maxHearts=1000; // Damage modifiers dont work for wizard battles but health does!
PIXI.game.prodigy.player.heal(Infinity); // Completly heals your player!

// Bookmarklet:
javascript:PIXI.game.prodigy.debugMisc.setBattleEnergy(10)%3BPIXI.game.prodigy.debugMisc.easyMode()%3BPIXI.game.prodigy.player.modifiers.barrier%3D!0%3BPIXI.game.prodigy.player.modifiers.maxHearts%3D1E3%3BPIXI.game.prodigy.player.heal(Infinity)%3Bvoid+0
