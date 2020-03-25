// Press any key after using this script for your player to teleport to your mouse pointer.
window.addEventListener('keydown', (event) => {
    Phaser.GAMES[0].prodigy.user.x=Phaser.GAMES[0].input.mousePointer.position.x;
Phaser.GAMES[0].prodigy.user.y=Phaser.GAMES[0].input.mousePointer.position.y;
});

// Bookmarklet:
// javascript:window.addEventListener(%22keydown%22%2Cfunction(a)%7BPhaser.GAMES[0].prodigy.user.x%3DPhaser.GAMES[0].input.mousePointer.position.x%3BPhaser.GAMES[0].prodigy.user.y%3DPhaser.GAMES[0].input.mousePointer.position.y%7D)%3Bvoid+0
