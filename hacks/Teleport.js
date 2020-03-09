// Press any key after using this script for your player to teleport to your mouse pointer.
window.addEventListener('keydown', (event) => {
    PIXI.game.prodigy.user.x=PIXI.game.input.mousePointer.position.x;
PIXI.game.prodigy.user.y=PIXI.game.input.mousePointer.position.y;
});

// Bookmarklet:
javascript:window.addEventListener(%22keydown%22%2Cfunction(a)%7BPIXI.game.prodigy.user.x%3DPIXI.game.input.mousePointer.position.x%3BPIXI.game.prodigy.user.y%3DPIXI.game.input.mousePointer.position.y%7D)%3Bvoid+0
