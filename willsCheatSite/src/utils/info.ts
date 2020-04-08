import { getAccount, BigData, Account, getGameData, getBigData } from "./api";
import { GameData } from "../../../typings/gameData";

const info = document.getElementById("info");
const stats: [string, (data: BigData, gd: GameData, acc: Account) => string][] = [
	["Username", (d, gd, a) => a.name],
	["User ID", (d, gd, a) => String(a.userID)],
	[
		"IGN",
		(d, gd) =>
			(["first", "middle", "last"] as const)
				.map(x => gd.name.find(y => y.ID === d.appearance.name[x]))
				.join(" "),
	],
];
setInterval(async () => {
	const bigData = await getBigData();
	const account = await getAccount();
	if (!(bigData && info && account)) return;
	const gameData = await getGameData();
	info.innerHTML = stats.map(([x, y]) => `<p><b>${x}</b>: ${y(bigData, gameData, account)}</p>`).join("\n");
}, 1000);
