//> Effect Spammer
//>> Spams confetti, snowballs, water balloons, and fireworks.

// NOTE: This hack is archived and no longer works.

setInterval(_ => {
	for (let i of [1, 2, 3, 4]) {
		_.instance.prodigy.gameContainer.get("NetworkManager").emitMessage({
			action: "fx",
			data: {
				type: i,
				userID: _.player.userID,
				x: Math.floor(Math.random() * 1280),
				y: Math.floor(Math.random() * 720)
			}
		});
	}
});
