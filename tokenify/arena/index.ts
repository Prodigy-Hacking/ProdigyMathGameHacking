import fetch from "node-fetch";
import data from "./config.json";
import fs from "fs";
import chalk from "chalk";
import { tokenify, renewToken } from "../../tokenify/";
import { RequestInit } from "node-fetch";
import proxyAgent from "https-proxy-agent";
import { Worker, isMainThread, parentPort, workerData, threadId } from "worker_threads";
const fetchJson = async (url: string, opts?: RequestInit | undefined) => await (await fetch(url, opts as any)).json();
const users: {
	[index: string]: { token: string; userID: number; authToken: string; };
} = {};
const main = async () => {
	foo: for (const _ in [2]) {
		if (!data.every(x => x.username && x.password)) return console.log("Malformed config.json.");
		const gameStatus: {
			data: { gameClientVersion: string };
		} = await fetchJson("https://api.prodigygame.com/game-api/status");
		console.log("Game status loaded.");
		const chunk = <T>(arr: T[], size: number): T[][] =>
			arr.reduce((acc: T[][], _, i) => {
				if (i % size === 0) acc.push(arr.slice(i, i + size));
				return acc;
			}, []);
		for (const acc of chunk(data, 85)) {
			const worker = new Worker(__filename, {
				workerData: {
					accounts: acc,
					gameStatus,
				},
			});
			worker.on("online", () => console.log(`Worker ${worker.threadId} is online.`))
			worker.on("message", m => console.log(`[${String(worker.threadId).padStart(2, "0")}] ${m}`));
			worker.on("error", r => console.error(r));
			worker.on("exit", code => {
				if (code !== 0) console.error(`Worker ${worker.threadId} stopped with exit code ${code}`);
			});
		}
	}
};
const doThread = async () => {
	if (!parentPort) return;
	const hack = async (seasonID: number, username: string, password: string): Promise<string> => {
		const user = users[username];
		if (!user) return "User not found.";
		const win = await (
			await fetch(
				`https://api.prodigygame.com/leaderboard-api/season/${seasonID}/user/${user.userID}/pvp?userID=${user.userID}`,
				{
					headers: {
						authorization: `Bearer ${user.token}`,
						"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
						"user-agent": "CUM MACHINE / v1.12.2",
					},
					body: `seasonID=${seasonID}&action=win`,
					method: "POST",
				}
			)
		).text();
		if (win === "") return "Failed to increase.";
		const winJson: { code: string; points: undefined } | { points: number; code: undefined } = JSON.parse(win);
		if (winJson.code === "Forbidden") {
			user.token = await renewToken(user.userID, user.authToken);
			return hack(seasonID, username, password);
		}
		if (winJson.code === "TooManyRequests") return "Ratelimited.";
		if (winJson.points === undefined) return JSON.stringify(winJson);
		const rank: { rank: number } = await fetchJson(
			`https://api.prodigygame.com/leaderboard-api/season/${seasonID}/user/${user.userID}/rank?userID=${user.userID}`,
			{
				headers: {
					authorization: `Bearer ${user.token}`,
					"user-agent": "CUM MACHINE / v1.12.2",
				},
			}
		);
		return `${`${winJson.points} Points (+100)`.padEnd(20)} - Rank: ${rank.rank}`;
	};
	const acc: { username: string; password: string }[] = workerData.accounts;
	const gameStatus = workerData.gameStatus;
	for (const account of acc) {
		const login = await fetch("https://api.prodigygame.com/game-auth-api/v1/login", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				username: account.username,
				password: account.password,
				clientVersion: gameStatus.data.gameClientVersion,
			}),
		});
		const user: {
			token: string;
			userID: number;
			authToken: string;
		} = await tokenify(account.username, account.password);
		users[account.username] = user;
		parentPort.postMessage("Logged in.");
		const lb: { seasonID: number } = await fetchJson(
			`https://api.prodigygame.com/leaderboard-api/user/${user.userID}/init?userID=${user.userID}`,
			{
				headers: {
					authorization: `Bearer ${user.token}`,
				},
			}
		);
		parentPort.postMessage("Leaderboard loaded.");
		const char = await fetchJson(`https://api.prodigygame.com/game-api/v2/characters/${user.userID}`, {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		});
		parentPort.postMessage(`Hack starting for user ${account.username}.`);
		const hackify = async () =>
			parentPort?.postMessage(
				`${`[${account.username}]`.padEnd(22)} ${await hack(lb.seasonID, account.username, account.password)}`
			);
		hackify();
		setInterval(hackify, 60500);
	}
};
if (isMainThread) main();
else {
	doThread();
}
