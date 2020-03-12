// Levels all pets to level 100.
let x = PIXI.game.prodigy.player.kennel.data;
for (let i=0; i<x.length; i++) { 
    x.data[i].level=100;
};

// Bookmarklet:
javascript:for(var%20PetLoopTest%3D0%3BPetLoopTest%3CPIXI.game.prodigy.player.kennel.data.length%3BPetLoopTest%2B%2B)PIXI.game.prodigy.player.kennel.data%5BPetLoopTest%5D.level%3D100%3Bvoid+0
