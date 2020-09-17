//> Teleportation hack
//>> makes your character teleport to where your mouse is after 5 seconds. 
setTimeout(() => {
    _.instance.prodigy.user.x = _.instance.prodigy.game.input.mousePointer.position.x;
    _.instance.prodigy.user.y = _.instance.prodigy.game.input.mousePointer.position.y;
}, 5000);
