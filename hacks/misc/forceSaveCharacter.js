//> Force save character hack
//>> Makes hacks such as get all pets and level 100 save without needing to win a battle
let playerdata = {}
	playerdata.equipment = _.player.equipment
	playerdata.tutorial = _.player.tutorial
	playerdata.pets = _.player.kennel._petData
	playerdata.data = _.player.data
	playerdata.encounters = _.player.encounters._data
	playerdata.house = _.player.house.data
	playerdata.inventory = _.player.backpack.data
	playerdata.quests = _.player.quests.data
	playerdata.state = _.player.state.data
	playerdata.appearance = _.player.appearance
	playerdata.tutorial = _.player.tutorial.data
	fetch(`https://proxy.prodigyhacking.com/https://api.prodigygame.com/game-api/v3/characters/${_.player.userID}`, {
		"headers": {
			"accept": "*/*",
			"accept-language": "en-US,en;q=0.9,az;q=0.8,cs;q=0.7",
			"authorization": localStorage.JWT_TOKEN,
			"content-type": "application/json",
			"sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
			"sec-ch-ua-mobile": "?0",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-site"
		},
		"referrer": "https://play.prodigygame.com/",
		"referrerPolicy": "strict-origin-when-cross-origin",
		"body": JSON.stringify(playerdata),
		"method": "POST",
		"mode": "cors",
		"credentials": "include"
	});
