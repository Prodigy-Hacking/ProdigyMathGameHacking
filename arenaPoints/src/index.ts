import fetch from "node-fetch";
import data from "../config.json";
import chalk from "chalk";
import { tokenify, renewToken } from "../../tokenify/"
import { RequestInit } from "node-fetch"
const main = async () => {
	foo:
	for (const _ in [2]) {
		const users: {
			[index: string]: { token: string; userID: number };
		} = {};
		const fetchJson = async (url: string, opts?: RequestInit | undefined) =>
			await (await fetch(url, opts as any)).json();
		if (!data.every(x => x.username && x.password))
			return console.log("Malformed config.json.");
		const gameStatus: {
			data: { gameClientVersion: string };
		} = await fetchJson("https://api.prodigygame.com/game-api/status");
		console.log("Game status loaded.");
		const hack = async (
			seasonID: number,
			username: string,
			password: string
		): Promise<string> => {
			const user = users[username];
			if (!user) return "User not found.";
			const win = await (
				await fetch(
					`https://api.prodigygame.com/leaderboard-api/season/${seasonID}/user/${user.userID}/pvp?userID=${user.userID}`,
					{
						headers: {
							authorization: `Bearer ${user.token}`,
							"content-type":
								"application/x-www-form-urlencoded; charset=UTF-8",
						},
						body: `seasonID=${seasonID}&action=win`,
						method: "POST",
					}
				)
			).text();
			if (win === "") return "Failed to increase.";
			const winJson:
				| { code: string; points: undefined }
				| { points: number; code: undefined } = JSON.parse(win);
			if (winJson.code === "ForbiddenError") {
				process.exit(1);
			}
			const rank: { rank: number } = await fetchJson(
				`https://api.prodigygame.com/leaderboard-api/season/${seasonID}/user/${user.userID}/rank?userID=${user.userID}`,
				{
					headers: {
						authorization: `Bearer ${user.token}`,
					},
				}
			);
			return `${`${winJson.points} Points (+100)`.padEnd(20)} - Rank: ${
				rank.rank
			}`;
		};
		for (const account of data) {
			const login = await fetch(
				"https://api.prodigygame.com/game-auth-api/v1/login",
				{
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						username: account.username,
						password: account.password,
						clientVersion: gameStatus.data.gameClientVersion,
					}),
				}
			);
			const user: {
				token: string;
				userID: number;
			} = await tokenify(account.username, account.password);
			users[account.username] = user;
			console.log("Logged in.");
			const lb: { seasonID: number } = await fetchJson(
				`https://api.prodigygame.com/leaderboard-api/user/${user.userID}/init?userID=${user.userID}`,
				{
					headers: {
						authorization: `Bearer ${user.token}`,
					},
				}
			);
			console.log("Leaderboard loaded.");
			const char = await fetchJson(
				`https://api.prodigygame.com/game-api/v2/characters/${user.userID}`,
				{
					headers: {
						authorization: `Bearer ${user.token}`,
					},
				}
			);
			console.log(`Hack starting for user ${account.username}.`);
			const hackify = async () =>
				console.log(
					`${`[${account.username}]`.padEnd(22)} ${await hack(
						lb.seasonID,
						account.username,
						account.password
					)}`
				);
			hackify();
			setInterval(hackify, 60500);
		}
	}
};
main();
