import { Swal, Toast, NumberInput } from "../utils/swal";
import { Hack, category } from "../index";
import { getItem, VERY_LARGE_NUMBER, savePlayer, gameData } from "../utils/util";
import { prodigy, game } from "../utils/util";
new Hack(category.player, "Set Gold").setClick(async () => {
	const gold = await NumberInput.fire("Gold Amount", "What number do you want to set your gold to?", "question");
	if (gold.value === undefined) return;
	_.player.data.gold = +gold.value;
	savePlayer();
	await Toast.fire("Success!", `You now have ${gold.value} gold.`, "success");
});
new Hack(category.player, "Set Level").setClick(async () => {
	const level = await NumberInput.fire("Level", "What number do you want to set your level to?", "question");
	if (level.value === undefined) return;
	_.player.data.level = +level.value;
	_.player.getLevel = () => _.player.data.level;
	savePlayer();
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
	savePlayer();
	await Toast.fire("Success!", `You now have ${_.player.data.bountyScore} bounty points.`, "success");
});

new Hack(category.player, "Obtain Conjure Cubes").setClick(async () => {
	const cubes = await NumberInput.fire("Conjure Cubes", "How many conjure cubes do you want to get?", "question");
	if (cubes.value === undefined) return;
	for (let i = 0; i < Math.min(99, +cubes.value); i++)
		prodigy.giftBoxController.receiveGiftBox(null, getItem("giftBox", 1));
	savePlayer();
	await Toast.fire("Success!", `You now have ${cubes.value} clojure cubes.`, "success");
});

new Hack(category.player, "Set Wins").setClick(async () => {
	const amount = await NumberInput.fire("Wins", "What number do you want to set your wins to?", "question");
	if (amount.value === undefined) return;
	_.player.data.win = +amount.value;
	savePlayer();
	await Toast.fire("Success!", `You now have ${amount.value} wins.`, "success");
});

new Hack(category.player, "Set Losses").setClick(async () => {
	const amount = await NumberInput.fire("Losses", "What number do you want to set your losses to?", "question");
	if (amount.value === undefined) return;
	_.player.data.loss = +amount.value;
	savePlayer();
	await Toast.fire("Success!", `You now have ${amount.value} losses.`, "success");
});

new Hack(category.player, "Instant Kill").setClick(async () => {
	_.player.modifiers.damage = VERY_LARGE_NUMBER;
	savePlayer();
	await Toast.fire("Success!", "Instant kill is now enabled!", "success");
});

new Hack(category.player, "PVP Health").setClick(async () => {
	_.player.pvpHP = VERY_LARGE_NUMBER;
	_.player.getMaxHearts = () => VERY_LARGE_NUMBER;
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
	const createSelect = (arr: Map<string, string>, func: (str: string) => boolean) => {
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
		createSelect(new Map(names.filter(x => x.data.type === type).map(x => [x.ID.toString(), x.name])), val =>
			func(+val)
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
				.call(document.querySelectorAll(`.selectName`))
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
