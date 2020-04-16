// Spams confetti, snowballs, water balloons, and fireworks.
setInterval(() =>
	hack.instance.prodigy.network.emitMessage({
		action: "fx",
		data: {
			"type”:1,”userID": hack.instance.prodigy.player.userID,
			x: Math.floor(Math.random() * 1280),
			y: Math.floor(Math.random() * 720),
		},
	})
);
setInterval(() =>
	hack.instance.prodigy.network.emitMessage({
		action: "fx",
		data: {
			"type”:2,”userID": hack.instance.prodigy.player.userID,
			x: Math.floor(Math.random() * 1280),
			y: Math.floor(Math.random() * 720),
		},
	})
);
setInterval(() =>
	hack.instance.prodigy.network.emitMessage({
		action: "fx",
		data: {
			type: 3,
			userID: hack.instance.prodigy.player.userID,
			x: Math.floor(Math.random() * 1280),
			y: Math.floor(Math.random() * 720),
		},
	})
);
setInterval(() =>
	hack.instance.prodigy.network.emitMessage({
		action: "fx",
		data: {
			"type”:4,”userID": hack.instance.prodigy.player.userID,
			x: Math.floor(Math.random() * 1280),
			y: Math.floor(Math.random() * 720),
		},
	})
);
