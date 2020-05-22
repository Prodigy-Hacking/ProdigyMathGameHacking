// Snowball Spammer
// Spams your surroundings with snowballs.
for (let i = 0; i < 10000; i++) {
	setInterval(() =>
		hack.instance.prodigy.gameContainer.get("NetworkManager").emitMessage({
			action: "fx",
			data: {
				type: 3,
				userID: hack.player.userID,
				x: Math.floor(Math.random() * 1280),
				y: Math.floor(Math.random() * 720),
			},
		})
	);
}
