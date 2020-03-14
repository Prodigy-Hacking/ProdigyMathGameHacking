// Levels all pets to level 100.
let x = PIXI.game.prodigy.player.kennel.data;
for (let i=0; i<x.length; i++) { 
    x[i].level=100;
};

// Bookmarklet:
javascript:(function()%7Blet%20x%20%3D%20PIXI.game.prodigy.player.kennel.data%3Bfor%20(let%20i%3D0%3B%20i%3Cx.length%3B%20i%2B%2B)%20%7Bx%5Bi%5D.level%3D100%3B%7D%7D)()
