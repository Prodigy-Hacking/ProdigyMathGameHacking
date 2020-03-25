for (i = 0; i < 10000; i++)
	setInterval(() =>
		Phaser.GAMES[0].prodigy.network.emitMessage({
			action: "fx",
			data: {
				type: 3,
				userID: Phaser.GAMES[0].prodigy.player.userID,
				x: Math.floor(Math.random() * 1280),
				y: Math.floor(Math.random() * 720),
			},
		})
	);
// unleashes hell on everyone around you.