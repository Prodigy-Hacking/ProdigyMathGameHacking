"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_json_1 = __importDefault(require("../config.json"));
const main = async () => {
    foo: for (const _ in [2]) {
        const users = {};
        const fetchJson = async (url, opts) => await (await node_fetch_1.default(url, opts)).json();
        if (!config_json_1.default.every(x => x.username && x.password))
            return console.log("Malformed config.json.");
        const gameStatus = await fetchJson("https://api.prodigygame.com/game-api/status");
        console.log("Game status loaded.");
        const hack = async (seasonID, username, password) => {
            const user = users[username];
            if (!user)
                return "User not found.";
            const win = await (await node_fetch_1.default(`https://api.prodigygame.com/leaderboard-api/season/${seasonID}/user/${user.userID}/pvp?userID=${user.userID}`, {
                headers: {
                    authorization: `Bearer ${user.token}`,
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
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
            const rank = await fetchJson(`https://api.prodigygame.com/leaderboard-api/season/${seasonID}/user/${user.userID}/rank?userID=${user.userID}`, {
                headers: {
                    authorization: `Bearer ${user.token}`,
                },
            });
            return `${`${winJson.points} Points (+100)`.padEnd(20)} - Rank: ${rank.rank}`;
        };
        for (const account of config_json_1.default) {
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
            if (!login.ok) {
                console.log(`User ${account.username} failed to login: Invalid Credentials.`);
                break;
            }
            const user = await login.json();
            users[account.username] = user;
            console.log("Logged in.");
            const lb = await fetchJson(`https://api.prodigygame.com/leaderboard-api/user/${user.userID}/init?userID=${user.userID}`, {
                headers: {
                    authorization: `Bearer ${user.token}`,
                },
            });
            console.log("Leaderboard loaded.");
            const char = await fetchJson(`https://api.prodigygame.com/game-api/v2/characters/${user.userID}`, {
                headers: {
                    authorization: `Bearer ${user.token}`,
                },
            });
            console.log(`Hack starting for user ${account.username}.`);
            const hackify = async () => console.log(`${`[${account.username}]`.padEnd(22)} ${await hack(lb.seasonID, account.username, account.password)}`);
            hackify();
            setInterval(hackify, 60500);
        }
    }
};
main();
//# sourceMappingURL=index.js.map