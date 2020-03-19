window.addEventListener("keydown", event => {
	switch (event.code) {
		case "KeyL": {
			PIXI.game.prodigy.user.x = PIXI.game.input.mousePointer.position.x;
			PIXI.game.prodigy.user.y = PIXI.game.input.mousePointer.position.y;
			break;
		}
		case "KeyE": {
			PIXI.game.prodigy.open.backpack();
			break;
		}
		case "KeyT": {
			PIXI.game.prodigy.open.chat();
			break;
		}
		case "Escape": {
			PIXI.game.prodigy.open.menus.map(x => x.close());
			break;
		}
	}
});