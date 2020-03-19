window.addEventListener("keydown", event => {
	if (event.code === "KeyL") {
		PIXI.game.prodigy.user.x = PIXI.game.input.mousePointer.position.x;
		PIXI.game.prodigy.user.y = PIXI.game.input.mousePointer.position.y;
	}
	if (event.code === "Escape") {
		PIXI.game.prodigy.open.menus.map(x => x.close());
	}
	if (!PIXI.game.prodigy.open.menus.length) {
		if (event.code === "KeyE") {
			PIXI.game.prodigy.open.backpack();
		}
		if (event.code === "KeyT") {
			PIXI.game.prodigy.open.chat();
		}
	}
});
