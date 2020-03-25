import { Swal, Toast, NumberInput } from "../utils/swal";
import { Hack, category } from "../index";
import {
	getItem,
	VERY_LARGE_NUMBER,
	savePlayer,
	gameData,
} from "../utils/util";
new Hack(category.player, "Set Gold").setClick(async () => {
	const gold = await NumberInput.fire(
		"Gold Amount",
		"What number do you want to set your gold to?",
		"question"
	);
	if (gold.value === undefined) return;
	Phaser.GAMES[0].prodigy.player.data.gold = +gold.value;
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
	Phaser.GAMES[0].prodigy.player.data.level = +level.value;
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
	Phaser.GAMES[0].prodigy.player.data.bountyScore = +points.value;
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
		Phaser.GAMES[0].prodigy.giftBoxController.receiveGiftBox(
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
	Phaser.GAMES[0].prodigy.player.it = true;
	savePlayer();
	await Toast.fire("Success!", "Membership is now enabled!", "success");
});
new Hack(category.player, "Instant Kill").setClick(async () => {
	Phaser.GAMES[0].prodigy.player.modifiers.damage = VERY_LARGE_NUMBER;
	savePlayer();
	await Toast.fire("Success!", "Instant kill is now enabled!", "success");
});

new Hack(category.player, "PVP Health").setClick(async () => {
	Phaser.GAMES[0].prodigy.player.pvpHP = VERY_LARGE_NUMBER;
	Phaser.GAMES[0].prodigy.player.getMaxHearts = () => VERY_LARGE_NUMBER;
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
				`https://api.prodigygame.com/leaderboard-api/season/${Phaser.GAMES[0].prodigy.pvpNetworkHandler.seasonID}/user/${Phaser.GAMES[0].prodigy.player.userID}/pvp?userID=${Phaser.GAMES[0].prodigy.player.userID}`,
				{
					headers: {
						authorization: `Bearer ${Phaser.GAMES[0].prodigy.network.jwtAuthProvider.getToken()}`,
						"content-type":
							"application/x-www-form-urlencoded; charset=UTF-8",
					},
					body: `seasonID=${Phaser.GAMES[0].prodigy.pvpNetworkHandler.seasonID}&action=win`,
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
