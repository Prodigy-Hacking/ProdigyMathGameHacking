// Closes wills cheat menu
const cheatmenuhide1 = document.querySelector('#cheat-menu');
cheatmenuhide1.style.display = 'none';
const cheatmenuhide2 = document.querySelector('#menu-toggle');
cheatmenuhide2 && (cheatmenuhide2.style.display = 'none');

// Creates menu
const prodigydiv = document.createElement("div");
prodigydiv.style.height = "200px";
prodigydiv.style.background = "black";
prodigydiv.style.color = "green";
document.body.style.align = "top";

// Adds in hacks
function closeit() {
	// Closes menu
	prodigydiv.remove();
	const cheatmenushow1 = document.querySelector('#cheat-menu');
	cheatmenushow1.style.display = 'block';
	const cheatmenushow2 = document.querySelector('#menu-toggle');
    cheatmenushow2 && (cheatmenushow2.style.display = 'block');
}

setTimeout("closeit", 2000);

function teleportplayer() {
	// Teleport on mouse clicker 
	setTimeout(() => {
		_.instance.prodigy.user.x = _.instance.prodigy.game.input.mousePointer.position.x;
		_.instance.prodigy.user.y = _.instance.prodigy.game.input.mousePointer.position.y;
	}, 5000);
}

function lotodamage() {
	// Instakill 
	_.constants.constants["GameConstants.Battle.ATTACK_DAMAGE_OVERRIDE"] = Infinity;
}

function realspeed() {
	// Speed hack 
	_.instance.prodigy.game.state.states.DinoDig.walkSpeed = 100;
	_.instance.prodigy.user.walkSpeed = 10;
}

function setlevel() {
	// Sets level to 100 
	_.player.data.level = 100
}

function getallpets() {
	// Get all pets 
	_._.functions.getAllPets
}

function clearpets() {
	// Clear all pets 
	_.player.kennel.data.length = 0;
}

function escapebattle() {
	// Escape battle 
	_.functions.escapeBattle();
}

function winbattle() {
	// Win battle 
	_.instance.prodigy.game.state.states.Battle.startVictory();
}

function setbattlehp() {
	// Get really high hp 
	_.player.data.hp = 1e153
}

function skipt() {
	// Skip tutorial 
	_.functions.completeTutorial();
}

function bobbify() {
	// Bobbifies player 
	_.player.name.data.nickname = null;
	_.player.name.data.firstName = 44;
	_.player.name.data.middleName = 754;
	_.player.name.data.lastName = 882;
	_.player.data.stars = -1e22;
	_.player.data.level = 69;
	_.player.forceSaveCharacter();
	_.player.appearance.setGender("male");
	_.player.appearance.setEyeColor(1);
	_.player.appearance.setFace(4);
	_.player.appearance.setHair(19, 1);
	_.player.appearance.setSkinColor(1);
	_.player.equipment.setFollow(19);
	_.player.equipment.setHat(19);
	_.player.equipment.setBoots(19);
	_.player.equipment.setOutfit(19);
	_.player.equipment.setWeapon(19);
	_.player.forceSaveCharacter();
}

function snowballcrash() {
	// Enables snowball crasher 
	for (let i = 0; i < 10000; i++) {
		setInterval(() =>
			_.instance.prodigy.gameContainer.get("NetworkManager").emitMessage({
				action: "fx",
				data: {
					type: 3,
					userID: _.player.userID,
					x: Math.floor(Math.random() * 1280),
					y: Math.floor(Math.random() * 720),
				},
			})
		);
	}
}

function setgold() {
	// Get a lot of gold
	_.player.data.gold = 1e153
}

function setbpoints() {
	// Get max bounty points
	_.player.data.bountyScore = 100
}

function instakill() {
	// Instant kill with player 
	_.player.modifiers.damage = Infinity;
}

function pvphp() {
	// Gives a lot of Pvp Hp 
	_.player.modifiers.maxHearts = Infinity;
}

function changebwins() {
	// Set battle wins to 987453
	_.player.data.win = 987453;
}

function resetacc() {
	// Reset account 
	_.player.resetAccount();
}

function changeblosses() {
	// Change battle losses to 0
	_.player.data.loss = 0;
}

function textsize() {
	// Giant text size 
	_.instance.prodigy.user.chatText.FontSize = 100
}

function infinitewspins() {
	// Unlimited wheel spins 
	_.constants.constants["GameConstants.Debug.UNLIMITED_WHEEL_SPINS"] = true;
}

function arenapoints() {
	// Get arena points 
	setInterval(_ => {
		fetch(
			(
				"https://api.prodigygame.com/leaderboard-api/season/" +
				_.instance.prodigy.gameContainer.get("PVPNetworkHandler").seasonID +
				"/user/" +
				_.player.userID +
				"/pvp?userID=" +
				_.player.userID
			),

			{
				headers: {
					"authorization": (
						"Bearer " +
						_.instance.prodigy.gameContainer.get("NetworkManager").jwtAuthProvider.getToken()
					),
					"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
					"sec-fetch-mode": "cors"
				},

				referrer: "https://play.prodigygame.com/",
				referrerPolicy: "no-referrer-when-downgrade",
				body: (
					"seasonID=" +
					_.instance.prodigy.gameContainer.get("PVPNetworkHandler").seasonID +
					"&action=win"
				),
				method: "POST",
				mode: "cors"
			}
		).then(v => console.log(v.text()))
	}, 60100);
}

function unlimitedspins() {
	// Unlimited spins 
	_.constants.constants["GameConstants.Debug.UNLIMITED_WHEEL_SPINS"] = true;
}

function killme() {
	// Makes everything go to hell 
	setInterval(_ => _.instance.prodigy.effects.shake("", 1000, 1000))
	_.instance.prodigy.effects.flashText("REEEEEEEEEEEEEEE");
	setInterval(_ => {
		for (let i of [1, 2, 3, 4]) {
			_.instance.prodigy.gameContainer.get("NetworkManager").emitMessage({
				action: "fx",
				data: {
					type: i,
					userID: _.player.userID,
					x: Math.floor(Math.random() * 1280),
					y: Math.floor(Math.random() * 720),
				},
			});
		}
	});
	for (let i = 0; i < 10000; i++) {
		setInterval(() =>
			_.instance.prodigy.gameContainer.get("NetworkManager").emitMessage({
				action: "fx",
				data: {
					type: 3,
					userID: _.player.userID,
					x: Math.floor(Math.random() * 1280),
					y: Math.floor(Math.random() * 720),
				},
			})
		);
	}
}

function praybitch() {
	// Sets hp to 1 
	_.player.data.hp = 1e153
}

function moonwalk() {
	// Flips player backwards
	_.instance.prodigy.user.width *= -1;
	_.instance.prodigy.user.nameText.gameObject.scale = -1;
}

function grade1() {
	// Set grade to 1
	_.player.grade = 1;
}

function grade2() {
	// Set grade level to 2
	_.player.grade = 2;
}

function grade3() {
	// Set grade level to 3
	_.player.grade = 3;
}

function grade4() {
	// Set grade level to 4
	_.player.grade = 4;
}

function grade5() {
	// Set grade level to 5
	_.player.grade = 5;
}

function grade6() {
	// Set grade level to 6
	_.player.grade = 6;
}

function grade7() {
	// Set grade level to 7
	_.player.grade = 7;
}

function grade8() {
	// Set grade level to 8
	_.player.grade = 8;
}

function randomnick() {
	// Get random nickname
	_.player.name.generateRandomName();
}

function invislol() {
	// Walk past monsters ez
	_.constants.constants["GameConstants.Debug.SCALE_ENCOUNTER_DISTANCE"] = 0;
}

function colorred() {
	// Set text color red
	_.instance.prodigy.user.chatText.Font = "Comic Sans MS";
	_.instance.prodigy.user.chatText.FillColor = "#FF0000";
}

function colorsilver() {
	// Set text color silver
	_.instance.prodigy.user.chatText.Font = "Comic Sans MS";
	_.instance.prodigy.user.chatText.FillColor = "#C0C0C0";
}

function colorgray() {
	// Set text color gray
	_.instance.prodigy.user.chatText.Font = "Comic Sans MS";
	_.instance.prodigy.user.chatText.FillColor = "#808080";
}

function colorblack() {
	// Set text color black
	_.instance.prodigy.user.chatText.Font = "Comic Sans MS";
	_.instance.prodigy.user.chatText.FillColor = "#000000";
}

function colorgreen() {
	// Set text color green
	_.instance.prodigy.user.chatText.Font = "Comic Sans MS";
	_.instance.prodigy.user.chatText.FillColor = "#008000";
}

function colorbrown() {
	// Set text color brown
	_.instance.prodigy.user.chatText.Font = "Comic Sans MS";
	_.instance.prodigy.user.chatText.FillColor = "#A52A2A";
}

function colorblue() {
	// Set text color blue
	_.instance.prodigy.user.chatText.Font = "Comic Sans MS";
	_.instance.prodigy.user.chatText.FillColor = "#0000FF";
}

function colorpurple() {
	// Set text color purple
	_.instance.prodigy.user.chatText.Font = "Comic Sans MS";
	_.instance.prodigy.user.chatText.FillColor = "#C203F3";
}

function leveluppets() {
	// Level pets up to 100
	_.player.kennel.data.map(x => x.level = 100);
}

function inactivitydisable() {
	// Disable inactivity prompt
	_.constants.constants["GameConstants.Inactivity.LOG_OUT_TIMER_SECONDS"] = 0;
}

function itemstacker() {
	// Stack items
	(() => {
		// FMI: every time prodigy patches, update scopeObj.
		const scopeObj = _.instance;
		const playerObject = _.player;

		// Do not modify.
		const bootData = scopeObj.game.state.states.Boot._gameData;
		const backpackData = playerObject.backpack.data;

		playerObject.data.gold = playerObject.data.stars = playerObject.data.bountyScore = playerObject.data.level = 1e69;

		// All equipment
		let categories = ["boots", "follow", "fossil", "hat", "key", "mathTownFrame", "mathTownInterior", "outfit", "relic", "spellRelic", "weapon"];
		for (let category of categories) {
			backpackData[category] = [];

			for (let item in bootData[category]) {
				backpackData[category][item] = {
					"ID": bootData[category][item].ID
				};
			}
		}

		// Special cases
		// Currency
		backpackData.currency = [];
		for (let i in bootData.currency) {
			backpackData.currency[i] = {
				"ID": bootData.currency[i].ID,
				"N": 99999999
			};
		}

		// All items
		backpackData.item = [];
		for (let i in bootData.item) {
			backpackData.item[i] = {
				"ID": bootData.item[i].ID,
				"N": 99999999
			};
		}

		// Furniture
		playerObject.house.data.items = []
		for (let i in bootData.dorm) {
			playerObject.house.data.items[bootData.dorm[i]["ID"]] = {
				A: [],
				N: 999
			};
		}

		// Remove bounty notes (#229)
		let bountyIndex = _ => _.player.backpack.data.item.findIndex(v => v.ID === 84 || v.ID === 85 || v.ID === 86)
		while (bountyIndex() > -1) _.player.backpack.data.item.splice(bountyIndex(), 1)
	})();
}

function accstacker() {
	// Stacks account
	(() => {
		const {
			instance
		} = hack;
		const {
			game,
			prodigy
		} = instance;
		const {
			player
		} = prodigy;
		const gameData = game.state.states.Boot._gameData;
		player.data.gold = player.data.stars = player.data.bountyScore = player.data.level = 1e69;
		if (confirm("Do you want pets?")) {
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
		}
		player.kennel.data.forEach(x => (x.level = 1e69));
		Object.entries(player.backpack.data).forEach(([x, y]) =>
			// @ts-ignore
			y.splice(0, 1e69, ...gameData[x].map(z => ({
				ID: z.ID,
				N: 1e69
			})))
		);
		player.house.data.items = [];
		gameData.dorm.map(x => (player.house.data.items[x.ID] = {
			A: [],
			N: 1e69
		}));
	})();
}

function healteam() {
	// Heals pet team
}

// Makes physical Buttons
prodigydiv.innerHTML = '<button type="button" onclick="{prodigydiv.remove();}">Close</button><button type="button" onclick="{lotodamage();}">Lots Of Damage</button> <button type="button" onclick="{realspeed();}">Run Fast</button> <button type="button" onclick="{healteam();}">Heal Pets</button><button type="button" onclick="{teleportplayer();}">Teleport Player On Mouse Clicker (wait 5 seconds)</button><button type="button" onclick="{accstacker();}">Account Stacker</button><button type="button" onclick="{itemstacker();}">Item Stacker</button><button type="button" onclick="{leveluppets();}">Level Up Pets</button><button type="button" onclick="{colorpurple();}">Set Text Color Purple</button><button type="button" onclick="{colorblue();}">Set Text Color Blue</button><button type="button" onclick="{colorbrown();}">Set Text Color Brown</button><button type="button" onclick="{colorgreen();}">Set Text Color Green</button><button type="button" onclick="{colorblack();}">Set Text Color black</button><button type="button" onclick="{colorgray();}">Set Text Color Gray</button><button type="button" onclick="{colorsilver();}">Set Text Color Silver</button><button type="button" onclick="{colorred();}">Set Text Color Red</button><button type="button" onclick="{invislol();}">Walk Past Monsters</button><button type="button" onclick="{randomnick();}">Random Nickname</button><button type="button" onclick="{grade8();}">Grade level 8</button><button type="button" onclick="{grade7();}">Grade level 7</button><button type="button" onclick="{grade6();}">Grade level 6</button><button type="button" onclick="{grade5();}">Grade level 5</button><button type="button" onclick="{grade4();}">Grade level 4</button><button type="button" onclick="{grade3();}">Grade level 3</button><button type="button" onclick="{grade2();}">Grade level 2</button><button type="button" onclick="{grade1();}">Grade level 1</button><button type="button" onclick="{moonwalk();}">Flip Player Backwards</button><button type="button" onclick="{praybitch();}">Pray Monsters Miss</button><button type="button" onclick="{killme();}">Go To Hell</button><button type="button" onclick="{unlimitedspins();}">Unlimited Spins On Wheel</button><button type="button" onclick="{getallpets();}">Get All Pets</button><button type="button" onclick="{clearpets();}">Clear All Pets</button><button type="button" onclick="{escapebattle();}">Escape Battle</button><button type="button" onclick="{winbattle();}">Win Battle</button><button type="button" onclick="{setbattlehp();}">Lots Of Battle HP</button><button type="button" onclick="{skipt();}">Skip Tutorial</button><button type="button" onclick="{bobbify();}">Bobbify</button><button type="button" onclick="{snowballcrash();}">Snowball Crasher</button><button type="button" onclick="{setgold();}">Unlimited Gold</button><button type="button" onclick="{setbpoints();}">100 Bounty Points</button><button type="button" onclick="{instakill();}">Instant Kill</button><button type="button" onclick="{pvphp();}">Lots Of PVP HP</button><button type="button" onclick="{changeblosses();}">No Battle Losses</button><button type="button" onclick="{setlevel();}">Level 100</button><button type="button" onclick="{changebwins();}">Large Amount Of Battle Wins</button><button type="button" onclick="{arenapoints();}">Get Arena Points</button><button type="button" onclick="{resetacc();}">Reset Account</button><button type="button" onclick="{infinitewspins();}">Infinite Wheel Spins</button><button type="button" onclick="{textsize();}">Giant Text Size</button><p> Made by Yama</p>';
document.body.prepend(prodigydiv);
