"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_json_1 = __importDefault(require("../config.json"));
const tokenify_1 = require("../../tokenify/");
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
            const user = await tokenify_1.tokenify(account.username, account.password);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0REFBK0I7QUFDL0IsaUVBQWtDO0FBRWxDLDhDQUFzRDtBQUV0RCxNQUFNLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtJQUN2QixHQUFHLEVBQ0gsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3BCLE1BQU0sS0FBSyxHQUVQLEVBQUUsQ0FBQztRQUNQLE1BQU0sU0FBUyxHQUFHLEtBQUssRUFBRSxHQUFXLEVBQUUsSUFBOEIsRUFBRSxFQUFFLENBQ3ZFLE1BQU0sQ0FBQyxNQUFNLG9CQUFLLENBQUMsR0FBRyxFQUFFLElBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLHFCQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQzdDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sVUFBVSxHQUVaLE1BQU0sU0FBUyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7UUFDbkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFDakIsUUFBZ0IsRUFDaEIsUUFBZ0IsRUFDaEIsUUFBZ0IsRUFDRSxFQUFFO1lBQ3BCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsSUFBSTtnQkFBRSxPQUFPLGlCQUFpQixDQUFDO1lBQ3BDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FDakIsTUFBTSxvQkFBSyxDQUNWLHNEQUFzRCxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sZUFBZSxJQUFJLENB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