window.addEventListener("keydown", event => {
	return;
	if (event.code === "KeyL") {
		Phaser.GAMES[0].prodigy.user.x = Phaser.GAMES[0].input.mousePointer.position.x;
		Phaser.GAMES[0].prodigy.user.y = Phaser.GAMES[0].input.mousePointer.position.y;
	}
	if (event.code === "Escape") {
		Phaser.GAMES[0].prodigy.open.menus.map(x => x.close());
	}
	if (!Phaser.GAMES[0].prodigy.open.menus.length) {
		if (event.code === "KeyE") {
			Phaser.GAMES[0].prodigy.open.backpack();
		}
		if (event.code === "KeyT") {
			Phaser.GAMES[0].prodigy.open.chat();
		}
	}
});
