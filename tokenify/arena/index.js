"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_json_1 = __importDefault(require("./config.json"));
const tokenify_1 = require("../../tokenify/");
const worker_threads_1 = require("worker_threads");
const fetchJson = async (url, opts) => await (await node_fetch_1.default(url, opts)).json();
const users = {};
const main = async () => {
    foo: for (const _ in [2]) {
        if (!config_json_1.default.every(x => x.username && x.password))
            return console.log("Malformed config.json.");
        const gameStatus = await fetchJson("https://api.prodigygame.com/game-api/status");
        console.log("Game status loaded.");
        const chunk = (arr, size) => arr.reduce((acc, _, i) => {
            if (i % size === 0)
                acc.push(arr.slice(i, i + size));
            return acc;
        }, []);
        for (const acc of chunk(config_json_1.default, 50)) {
            const worker = new worker_threads_1.Worker(__filename, {
                workerData: {
                    accounts: acc,
                    gameStatus,
                },
            });
            worker.on("message", m => console.log(`[${String(worker.threadId).padStart(2, "0")}] ${m}`));
            worker.on("error", r => console.error(r));
            worker.on("exit", code => {
                if (code !== 0)
                    console.error(`Worker ${worker.threadId} stopped with exit code ${code}`);
            });
        }
    }
};
const doThread = async () => {
    if (!worker_threads_1.parentPort)
        return;
    const hack = async (seasonID, username, password) => {
        const user = users[username];
        if (!user)
            return "User not found.";
        const win = await (await node_fetch_1.default(`https://api.prodigygame.com/leaderboard-api/season/${seasonID}/user/${user.userID}/pvp?userID=${user.userID}`, {
            headers: {
                authorization: `Bearer ${user.token}`,
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "user-agent": "CUM MACHINE / v1.12.2",
            },
            body: `seasonID=${seasonID}&action=win`,
            method: "POST",
        })).text();
        if (win === "")
            return "Failed to increase.";
        const winJson = JSON.parse(win);
        if (winJson.code === "ForbiddenError") {
            process.exit(1);
        }
        if (winJson.code === "TooManyRequests")
            return "Ratelimited.";
        if (winJson.points === undefined)
            return JSON.stringify(winJson);
        const rank = await fetchJson(`https://api.prodigygame.com/leaderboard-api/season/${seasonID}/user/${user.userID}/rank?userID=${user.userID}`, {
            headers: {
                authorization: `Bearer ${user.token}`,
                "user-agent": "CUM MACHINE / v1.12.2",
            },
        });
        return `${`${winJson.points} Points (+100)`.padEnd(20)} - Rank: ${rank.rank}`;
    };
    const acc = worker_threads_1.workerData.accounts;
    const gameStatus = worker_threads_1.workerData.gameStatus;
    for (const account of acc) {
        const login = await node_fetch_1.default("https://api.prodigygame.com/game-auth-api/v1/login", {
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
        const user = await tokenify_1.tokenify(account.username, account.password);
        users[account.username] = user;
        worker_threads_1.parentPort.postMessage("Logged in.");
        const lb = await fetchJson(`https://api.prodigygame.com/leaderboard-api/user/${user.userID}/init?userID=${user.userID}`, {
            headers: {
                authorization: `Bearer ${user.token}`,
            },
        });
        worker_threads_1.parentPort.postMessage("Leaderboard loaded.");
        const char = await fetchJson(`https://api.prodigygame.com/game-api/v2/characters/${user.userID}`, {
            headers: {
                authorization: `Bearer ${user.token}`,
            },
        });
        worker_threads_1.parentPort.postMessage(`Hack starting for user ${account.username}.`);
        const hackify = async () => worker_threads_1.parentPort?.postMessage(`${`[${account.username}]`.padEnd(22)} ${await hack(lb.seasonID, account.username, account.password)}`);
        hackify();
        setInterval(hackify, 60500);
    }
};
if (worker_threads_1.isMainThread)
    main();
else {
    doThread();
}
