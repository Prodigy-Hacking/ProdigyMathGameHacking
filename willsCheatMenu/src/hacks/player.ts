// @ts-nocheck
import { Swal, Toast, NumberInput, Input } from "../utils/swal";
import { Hack, category, Toggler } from "../index";
import { getItem, VERY_LARGE_NUMBER, gameData } from "../utils/util";
import { prodigy, game } from "../utils/util";

new Hack(category.player, "Set Gold").setClick(async () => {
	const gold = await NumberInput.fire("Gold Amount", "What number do you want to set your gold to?", "question");
	if (gold.value === undefined) return;
	_.player.data.gold = +gold.value;
	await Toast.fire("Success!", `You now have ${gold.value} gold.`, "success");
});
new Hack(category.player, "Set Level").setClick(async () => {
	const level = await NumberInput.fire("Level", "What number do you want to set your level to?", "question");
	if (level.value === undefined) return;

	// fixes #394
	// calculate how many stars the level *should* have
	// from 3-16-1.js:8382
	if (level.value === 1) return 0;
	const i = level.value - 2;
	// xpConstant from 3-16-1.js:8528
	const xpConstant = 1.042;
	_.player.data.stars = Math.round((1 - Math.pow(xpConstant, i)) / (1 - xpConstant) * 20 + 10);
	_.player.data.level = +level.value;
	_.player.getLevel = () => {return _.player.data.level}

	await Toast.fire("Success!", `You are now level ${level.value}.`, "success");
});

new Hack(category.player, "Set Bounty Points").setClick(async () => {
	const points = await NumberInput.fire(
		"Bounty Points",
		"What number do you want to set your bounty points to? (Max is 100)",
		"question"
	);
	if (points.value === undefined) return;
	_.player.data.bountyScore = Math.min(+points.value, 100);
	await Toast.fire("Success!", `You now have ${_.player.data.bountyScore} bounty point${_.player.data.bountyScore != 1 ? "s":""}.`, "success");
});

new Hack(category.player, "Obtain Conjure Cubes").setClick(async () => {
	const cubes = await NumberInput.fire("Conjure Cubes", "How many conjure cubes do you want to get?", "question");
	if (cubes.value === undefined) return;
	for (let i = 0; i < Math.min(99, +cubes.value); i++)
		prodigy.giftBoxController.receiveGiftBox(null, getItem("giftBox", 1));
	await Toast.fire("Success!", `You have gained ${cubes.value} conjure cube${cubes.value != 1 ? "s":""}.`, "success");
});

new Hack(category.player, "Set Wins").setClick(async () => {
	const amount = await NumberInput.fire("Wins", "What number do you want to set your wins to?", "question");
	if (amount.value === undefined) return;
	_.player.data.win = +amount.value;
	await Toast.fire("Success!", `You have set your win${amount.value != 1 ? "s":""} to ${amount.value}.`, "success");
});

new Hack(category.player, "Set Losses").setClick(async () => {
	const amount = await NumberInput.fire("Losses", "What number do you want to set your losses to?", "question");
	if (amount.value === undefined) return;
	_.player.data.loss = +amount.value;
	await Toast.fire("Success!", `You have set your loss${amount.value != 1 ? "es":""} to ${amount.value}.`, "success");
});

new Hack(category.player, "Instant Kill").setClick(async () => {
	_.player.modifiers.damage = VERY_LARGE_NUMBER;
	await Toast.fire("Success!", "Instant kill is now enabled!", "success");
});

new Hack(category.player, "PVP Health").setClick(async () => {
	_.player.pvpHP = VERY_LARGE_NUMBER;
	_.player.getMaxHearts = () => VERY_LARGE_NUMBER;
	await Toast.fire("Success!", "You now have lots of health!", "success");
});

new Toggler(category.player, "Toggle membership").setEnabled(async () => {
	_.player.hasMembership = () => {return true}
}).setDisabled(() => {
	_.player.hasMembership = () => {return false}
});

new Hack(category.player, "Set name (Client side only)").setClick(async () => {
	const name = await Input.fire("What would you like to set your name to?")
	if(!name.value) return;
	_.player.getName = () => {return name.value}
	await Toast.fire("Changed!","Your name was changed.")
});
/*

let interval: unknown | null = null;

new Hack(category.player, "Arena Point Increaser").setClick(async () => {
	if (interval)
		return Swal.fire(
			"Already Enabled",
			"Arena Point Increaser is already enabled.",
			"error"
		);
	interval = setInterval(async () => {
		const data = await (
			await fetch(
				`https://api.prodigygame.com/leaderboard-api/season/${prodigy.pvpNetworkHandler.seasonID}/user/${_.player.userID}/pvp?userID=${_.player.userID}`,
				{
					headers: {
						authorization: `Bearer ${prodigy.network.jwtAuthProvider.getToken()}`,
						"content-type":
							"application/x-www-form-urlencoded; charset=UTF-8",
					},
					body: `seasonID=${prodigy.pvpNetworkHandler.seasonID}&action=win`,
					method: "POST",
					mode: "cors",
				}
			)
		).text();
		if (data !== "") {
			const jsoned: {
				points: number;
				weeklyPoints: number;
				modifiedDate: string;
				seasonID: number;
				numMatches: number;
			} = JSON.parse(data);
			console.log(`[API] ${jsoned.points} Points (+100)`);
		} else console.log(`[API] Failed to add points.`);
	}, 60500);
	await Swal.fire("Enabled", "Arena Point Increaser has been enabled.", "success");
});
*/
new Hack(category.player, "Change Name", "Change the name of your wizard.").setClick(async () => {
	const names = gameData.name;
	const div = document.createElement("div");
	const createSelect = (arr: Map<string, string>, equalityFunc: (str: string) => boolean) => {
		const select = document.createElement("select");
		select.classList.add("selectName");
		for (const opt of arr.entries()) {
			const optt = document.createElement("option");
			[optt.value, optt.innerText] = opt;

			if (equalityFunc(optt.value)) optt.selected = true;
			select.options.add(optt);
		}
		return select;
	};
	const nameSelect = (type: number, equalityFunc: (num: number) => boolean) =>
		createSelect(new Map(
			names.filter(x => x.data.type === type).map(x => [x.ID.toString(), x.name])),
			val => equalityFunc(+val)
		);
	div.append(nameSelect(0, x => x === _.player.name.data.firstName));
	div.append(nameSelect(1, x => x === _.player.name.data.middleName));
	div.append(nameSelect(2, x => x === _.player.name.data.lastName));
	div.append(
		createSelect(
			new Map(
				[["null", "[none]"]].concat(gameData.nickname.map(x => [x.ID.toString(), x.name])) as [
					string,
					string
				][]
			),
			x => +x === _.player.name.data.nickname || String(_.player.name.data.nickname) === x
		)
	);
	const name = await Swal.fire({
		title: "Set Player Name",
		focusConfirm: false,
		showCancelButton: true,
		html: div,
		preConfirm: () => {
			return Array.prototype.slice
				.call(document.querySelectorAll(".selectName"))
				.map((x: HTMLSelectElement) => x.options[x.selectedIndex].value);
		},
	});
	if (name.value === undefined) return;
	if (name.value[3] === "null") name.value[3] = null;
	[
		_.player.name.data.firstName,
		_.player.name.data.middleName,
		_.player.name.data.lastName,
		_.player.name.data.nickname,
	] = (name.value as string[]).map(x => ((x as unknown) as number) && +x);
	await Toast.fire("Name Changed!", "Your name was successfully changed.", "success");
});


new Hack(category.player, "Uncap player level (client side only)").setClick(async () => {
	const level = await NumberInput.fire('Level','What would you like to set your level to? (Can be 100+)','question')
	if(!level.value) return;
	localStorage.setItem("level", level.value)
	eval(`_.player.getLevel = () => {return ${level.value}}`)
	await Toast.fire('Updated!','Your level has been successfully updated','success')
})


new Hack(category.player, "Get all achievements").setClick(async () => {
	let data = _.instance.prodigy.achievements.getData();
let achmt = [];
data.forEach(e => {
e.data.forEach(h => {
let indivdata = [h.ID,h.data.ranks.length]
achmt.push(indivdata)
})
})
achmt.forEach(x => {
_.player.achievements.data.progress[x[0]] = x[1]
})

	await Toast.fire("Success!", "Obtained all achievements!", "success");
});

new Hack(category.player, "Morph Player (DEV)", "Morph into a pet, furnishing, or follow.").setClick(async () => {
	const morphType = await Swal.fire({
		title: "Which morph type?",
		input: "select",
		inputOptions: {
			pet: "Pet",
			dorm: "Furniture",
			follow: "Follow"
		},
		inputPlaceholder: "Morph Type",
		inputValidator: res => res? "" : "Please select a morph type.",
		showCancelButton: true
	});
	
	if (!morphType?.value) return;

	// swal inputOptions accepts an object, the property being the value it returns, the value being what it displays
	// kinda weird to explain, just look at how morphType does it
	// we want it to display a pretty string, and return the petID
	const morphOptions = {};
	// fuck you typescript, I'll do what I want
	// @ts-ignore
	_.gameData[morphType.value].forEach((morph) => morphOptions[morph.ID] = `${morph.name} (${morph.ID})`);

	const morphID = await Swal.fire({
		title: "Which morph?",
		input: "select",
		inputOptions: morphOptions,
		inputPlaceholder: "Morph ID",
		inputValidator: res => res? "" : "Please select a morph ID.",
		showCancelButton: true
	});
	
	if (!morphID?.value) return;
	// shut up typescript, I don't need you on my nuts every time I use Swal
	// typescript makes me cry
	_.player.getPlayerData().playerTransformation = {
		transformType: morphType.value,
		transformID: morphID.value,
		maxTime: 60*60*1000,
		timeRemaining: 60*60*1000
	};
	_.player.appearanceChanged = true;
	
	await Toast.fire("Morphed!", "You've been morphed.", "success");
});


new Hack(category.player, "Fix Morph Crash").setClick(async () => {
	_.player.getPlayerData().playerTransformation = undefined;
	_.player.appearanceChanged = true;

	await Toast.fire("Success!", "Fixed morph crash bug.", "success");
});

new Hack(category.player, "Permanent Morph", "Makes Your Current Morph Last Forever.").setClick(async () => {
	if (!_.player.data.playerTransformation) {
		await Swal.fire("No Morph Active", "Please use a Morph Marble and try again.", "error");
		return;
	}
	_.player.data.playerTransformation.maxTime = Infinity;
	_.player.data.playerTransformation.timeRemaining = Infinity;
	await Toast.fire("Success!", "You're morph will last forever!", "success");
});