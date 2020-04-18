// Gives your account everything.
(() => {
	const { instance } = hack;
	const { game, prodigy } = instance;
	const { player } = prodigy;
	const gameData = game.state.states.Boot._gameData;
	player.data.gold = player.data.stars = player.data.bountyScore = player.data.level = 1e69;
	if (confirm("Do you want pets?"))
		player.kennel.data.splice(
			0,
			1e69,
			...gameData.pet.map(x => ({
				ID: x.ID,
				catchDate: Date.now(),
				foreignSpells: [0, 0].map(x => gameData.spell[Math.floor(Math.random() * gameData.spell.length)].ID),
				level: 1e69,
				levelCaught: 1,
				stars: 1e69,
			}))
		);
	player.kennel.data.forEach(x => (x.level = 1e69));
	Object.entries(player.backpack.data).forEach(([x, y]) =>
		// @ts-ignore
		y.splice(0, 1e69, ...gameData[x].map(z => ({ ID: z.ID, N: 1e69 })))
	);
	player.house.data.items = [];
	gameData.dorm.map(x => (player.house.data.items[x.ID] = { A: [], N: 1e69 }));
	player.it = true;
})();
