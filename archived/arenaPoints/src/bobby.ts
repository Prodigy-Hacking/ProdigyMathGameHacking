// Phaser.GAMES[0].state.states.Login._gameObj.network.emitMessage
// e = Phaser.GAMES[0].state.states.Login._gameObj.network.emitMessage;Phaser.GAMES[0].state.states.Login._gameObj.network.emitMessage = function(a){console.log(a);return e.bind(Phaser.GAMES[0].state.states.Login._gameObj.network)(a)}
(async () => {
	const fetchJson = async (url: string, opts?: RequestInit | undefined) =>
		await (await fetch(url, opts as any)).json();
	const gameStatus: {
		data: { gameClientVersion: string };
	} = await fetchJson("https://api.prodigygame.com/game-api/status");
	const createAccount = async () => {
		const params = new URLSearchParams(
			"data=%7B%22new%22%3Afalse%7D&equipment=%7B%22follow%22%3A19%2C%22hat%22%3A19%2C%22outfit%22%3A19%2C%22weapon%22%3A19%2C%22spellRelic%22%3Anull%2C%22boots%22%3A19%2C%22mount%22%3Anull%7D&pets=%5B%5D&inventory=%7B%22hat%22%3A%5B%5D%2C%22boots%22%3A%5B%5D%2C%22weapon%22%3A%5B%5D%2C%22outfit%22%3A%5B%5D%2C%22item%22%3A%5B%5D%2C%22fossil%22%3A%5B%5D%2C%22key%22%3A%5B%5D%2C%22relic%22%3A%5B%5D%2C%22currency%22%3A%5B%5D%2C%22follow%22%3A%5B%5D%2C%22mount%22%3A%5B%5D%2C%22spellRelic%22%3A%5B%5D%7D&appearance=%7B%22name%22%3A%7B%22first%22%3A44%2C%22middle%22%3A754%2C%22last%22%3A882%2C%22nick%22%3Anull%7D%2C%22gender%22%3A%22male%22%2C%22hair%22%3A%7B%22color%22%3A1%2C%22style%22%3A19%7D%2C%22skinColor%22%3A1%2C%22eyeColor%22%3A1%2C%22face%22%3A1%7D&grade=8&chosenGrade=8&curriculumTreeID=1&classCode=+&password=rrrr&first_name=penis&last_name=e&clientVersion=2-97-3"
		);
		params.set("first_name", "_bobby_");
		params.set("last_name", "_");
		params.set("password", "bobby4life");
		params.set("chosenGrade", "1");
		params.set("grade", "1");
		params.set("classCode", "CAD2D6");
		const acc = await (
			await fetch("https://api.prodigygame.com/game-auth-api/v1/users", {
				headers: {
					"content-type":
						"application/x-www-form-urlencoded; charset=UTF-8",
					"sec-fetch-mode": "cors",
				},
				referrer: "https://play.prodigygame.com/",
				referrerPolicy: "no-referrer-when-downgrade",
				body: params.toString(),
				method: "POST",
				mode: "cors",
			})
		).json();
		console.log(
			`Created account ${acc.username} with password ${acc.password}`
		);
		const login = await (
			await fetch("https://api.prodigygame.com/game-auth-api/v1/login", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					username: acc.username,
					password: acc.password,
					clientVersion: gameStatus.data.gameClientVersion,
				}),
			})
		).json();
	};
})();
