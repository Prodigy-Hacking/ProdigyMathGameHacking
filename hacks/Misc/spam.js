// Effect Spammer
// Spams confetti, snowballs, water balloons, and fireworks.
setInterval(_ => {
	for (let i of [1, 2, 3, 4]) {
		hack.instance.prodigy.gameContainer.get("NetworkManager").emitMessage({
			action: "fx",
			data: {
				type: i,
				userID: hack.instance.prodigy.player.userID,
				x: Math.floor(Math.random() * 1280),
				y: Math.floor(Math.random() * 720),
			},
		});
	}
});
