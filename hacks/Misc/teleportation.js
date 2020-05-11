//makes your character teleport to where your mouse is after 5 seconds. 
setTimeout(() => {
  hack.instance.prodigy.user.x =
    hack.instance.prodigy.game.input.mousePointer.position.x;
  hack.instance.prodigy.user.y =
    hack.instance.prodigy.game.input.mousePointer.position.y;
}, 5000);
