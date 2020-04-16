for (i = 0; i < 10000; i++)
	setInterval(() =>
		Phaser.GAMES[0].state.states.Login._gameObj.network.emitMessage({
			action: "fx",
			data: {
				type: 3,
				userID: Phaser.CanvasPool.pool[0].parent.game.state.states.Boot._metricsManager.gameCompleteDataFactory.gameEventDataBuilder.loggedInPlayer._player.userID,
				x: Math.floor(Math.random() * 1280),
				y: Math.floor(Math.random() * 720),
			},
		})
	);
// unleashes hell on everyone around you.