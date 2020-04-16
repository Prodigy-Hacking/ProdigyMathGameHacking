import { Swal, Toast, NumberInput } from "../utils/swal";
import { Hack, category } from "../index";
import {
	getItem,
	VERY_LARGE_NUMBER,
	savePlayer,
	gameData,
} from "../utils/util";
import { prodigy, game } from "../utils/util";
new Hack(category.player, "Set Gold").setClick(async () => {
	const gold = await NumberInput.fire(
		"Gold Amount",
		"What number do you want to set your gold to?",
		"question"
	);
	if (gold.value === undefined) return;
	prodigy.player.data.gold = +gold.value;
	savePlayer();
	await Toast.fire("Success!", "The gold amount has been set.", "success");
});
new Hack(category.player, "Set Level").setClick(async () => {
	const level = await NumberInput.fire(
		"Level",
		"What number do you want to set your level to?",
		"question"
	);
	if (level.value === undefined) return;
	prodigy.player.data.level = +level.value;
	prodigy.player.getLevel = () => prodigy.player.data.level;
	savePlayer();
	await Toast.fire(
		"Success!",
		"The level of your player has been set.",
		"success"
	);
});

new Hack(category.player, "Set Bounty Points").setClick(async () => {
	const points = await NumberInput.fire(
		"Bounty Points",
		"What number do you want to set your bounty points to?",
		"question"
	);
	if (points.value === undefined) return;
	prodigy.player.data.bountyScore = +points.value;
	savePlayer();
	await Toast.fire("Success!", "The bounty points has been set.", "success");
});

new Hack(category.player, "Obtain Conjure Cubes").setClick(async () => {
	const cubes = await NumberInput.fire(
		"Conjure Cubes",
		"How many conjure cubes do you want to get?",
		"question"
	);
	if (cubes.value === undefined) return;
	for (let i = 0; i < Math.min(99, +cubes.value); i++)
		prodigy.giftBoxController.receiveGiftBox(
			null,
			getItem("giftBox", 1)
		);
	savePlayer();
	await Toast.fire(
		"Success!",
		"You have obtained the requested conjure cubes.",
		"success"
	);
});
new Hack(category.player, "Membership").setClick(async () => {
	prodigy.player.it = true;
	savePlayer();
	await Toast.fire("Success!", "Membership is now enabled!", "success");
});
new Hack(category.player, "Instant Kill").setClick(async () => {
	prodigy.player.modifiers.damage = VERY_LARGE_NUMBER;
	savePlayer();
	await Toast.fire("Success!", "Instant kill is now enabled!", "success");
});

new Hack(category.player, "PVP Health").setClick(async () => {
	prodigy.player.pvpHP = VERY_LARGE_NUMBER;
	prodigy.player.getMaxHearts = () => VERY_LARGE_NUMBER;
	await Toast.fire("Success!", "You now have lots of health!", "success");
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
				`https://api.prodigygame.com/leaderboard-api/season/${prodigy.pvpNetworkHandler.seasonID}/user/${prodigy.player.userID}/pvp?userID=${prodigy.player.userID}`,
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
new Hack(
	category.player,
	"Change Name",
	"Change the name of your wizard."
).setClick(async () => {
	const names = gameData.name;
	const div = document.createElement("div");
	const createSelect = (
		arr: Map<string, string>,
		func: (str: string) => boolean
	) => {
		const select = document.createElement("select");
		select.classList.add("selectName");
		for (const opt of arr.entries()) {
			const optt = document.createElement("option");
			optt.value = opt[0];
			optt.innerText = opt[1];
			if (func(optt.value)) optt.selected = true;
			select.options.add(optt);
		}
		return select;
	};
	const nameSelect = (type: number, func: (num: number) => boolean) =>
		createSelect(
			new Map(
				names
					.filter(x => x.data.type === type)
					.map(x => [x.ID.toString(), x.name])
			),
			val => func(+val)
		);
	div.append(nameSelect(0, x => x === prodigy.player.name.data.firstName));
	div.append(nameSelect(1, x => x === prodigy.player.name.data.middleName));
	div.append(nameSelect(2, x => x === prodigy.player.name.data.lastName));
	div.append(
		createSelect(
			new Map(
				[["null", "[none]"]].concat(
					gameData.nickname.map(x => [x.ID.toString(), x.name])
				) as [string, string][]
			),
			x =>
				+x === prodigy.player.name.data.nickname ||
				String(prodigy.player.name.data.nickname) === x
		)
	);
	const name = await Swal.fire({
		title: "Set Player Name",
		focusConfirm: false,
		showCancelButton: true,
		html: div,
		preConfirm: () => {
			return Array.prototype.slice
				.call(document.querySelectorAll(`.selectName`))
				.map(
					(x: HTMLSelectElement) => x.options[x.selectedIndex].value
				);
		},
	});
	if (name.value === undefined) return;
	if (name.value[3] === "null") name.value[3] = null;
	[
		prodigy.player.name.data.firstName,
		prodigy.player.name.data.middleName,
		prodigy.player.name.data.lastName,
		prodigy.player.name.data.nickname,
	] = (name.value as string[]).map(x => x as unknown as number && +x);
	await Toast.fire("Name Changed!", "Your name was successfully changed.", "success")
});
