import { Input } from "./swal";
import Swal from "sweetalert2";
import { LOGIN, GET_USER, USER_UPDATE, PROD_GAMEDATA } from "./urls";
import _ from "lodash";
import { DeepPartial } from "../../declarations";
import { BackpackData } from "../../../typings/backpack";
import { GameData } from "../../../typings/gameData";
import { Pet } from "../../../typings/pet";
interface Globs {
	username: string;
	password: string;
	token: string;
	lastUpdate: number;
	cache: Account;
}
const globs: Partial<Globs> = {
	username: undefined,
	password: undefined,
	token: undefined,
	lastUpdate: 0,
	cache: undefined,
};
export interface Status {
	data: {
		ServerGameVersion: string;
		gameClientVersion: string;
		gameCodePath: string;
		gameLibPath: string;
		maintenance: boolean;
		maintenanceMessage: boolean;
		prodigyGameFlags: {
			gameDataVersion: number
		}; // im too lazy to add all of them
	};
	status: "success";
}
export interface Account {
	authToken: string;
	classIDs: { id: number; ownerID: number; startDate: number }[];
	curriculumOverride: number | null;
	curriculumTreeID: number;
	goalId: number | null;
	grade: number;
	isMember: 0 | 1;
	isTowerTownEnabled: number;
	lastVisited: string;
	memberEndDate: number | null;
	memberStartDate: number | null;
	name: string;
	objectID: number;
	ownerIDs: [{ id: number; type: string; startDate: number }][];
	parentEmail: string | null;
	placementTestID: number | null;
	registerDate: string;
	token: string;
	userID: number;
	usertype: string;
}
export const getStatus = async (): Promise<Status> =>
	await (await fetch("https://api.prodigygame.com/game-api/status")).json();
export const login = async (): Promise<Account | null> => {
	if (!(globs.username && globs.password)) {
		const div = document.createElement("div");
		for (const n of ["Username", "Password"]) {
			const display = document.createElement("h2");
			display.classList.add("inputLabel");
			display.innerText = n;
			div.append(display);
			const input = document.createElement("input");
			input.classList.add("input");
			input.classList.add("swal2-input");
			input.classList.add("textInput");
			if (n === "Password") input.type = "password";
			div.append(input);
		}
		const creds = await Swal.fire({
			title: "Account Credentials",
			focusConfirm: false,
			showCancelButton: true,
			html: div,
			preConfirm: () => {
				return Array.prototype.slice
					.call(document.querySelectorAll(`.input`))
					.map((x: HTMLInputElement) => x.value);
			},
		});
		if (creds.value === undefined) return null;
		[globs.username, globs.password] = creds.value;
	}
	const status = await getStatus();
	const response = await fetch(LOGIN, {
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			username: globs.username,
			password: globs.password,
			clientVersion: status.data.gameClientVersion,
		}),
		method: "POST",
	});
	globs.lastUpdate = Date.now();
	const json = await response.json();
	if (response.ok) globs.cache = json;
	return response.ok ? json : null;
};
export const getAccount = async () =>
	(globs.lastUpdate ?? 0) + 60000 * 5 < Date.now() ? await login() : globs.cache!;
const getToken = async () => (await getAccount())?.token;
const fetchWithAuth = async (input: RequestInfo, init?: RequestInit | undefined) =>
	fetch(input, _.merge({ headers: { authorization: `Bearer ${await getToken()}` } }, init));
interface User {
	appearance: unknown;
	data: unknown;
	equipment: unknown;
}
export const getUser = async <T extends number[]>(...users: T): Promise<{ [i in T[number]]: User } | null> => {
	const account = await getAccount();
	if (!account) return null;
	const response = await fetchWithAuth(GET_USER(account.userID, users.join(",")));
	if (!response.ok) return null;
	return response.json();
};
interface BigData {
	data: {
		allowsHouseVisitors: boolean;
		atHomeTimestamp: number;
		bountyScore: number;
		battleCounter: number;
		daily: { lastStarted: number; isComplete: boolean };
		deserter: number;
		energy: number;
		gold: number;
		hp: number;
		level: number;
		school: string;
		settings: { bgmVolume: number; voiceVolume: number; sfxVolume: number };
		stars: number;
		startDate: number;
		storedMemberStars: number;
		team: number;
		tower: number | string;
		trialStartDate: string;
		zone: string;
	};
	inventory: BackpackData;
	isMember: 1 | 0;
	tutorial: {
		menus: {
			[index: number]: number[];
		};
		zones: unknown;
	};
	pets: Pet[];
	encounters: unknown;
	quests: unknown;
	appearance: {
		eyeColor: number;
		face: number;
		gender: string;
		hair: { color: number; style: number };
		name: { last: number; first: number; middle: number; nick: number | null };
		skinColor: number;
	};
	equipment: {
		boots: number;
		follow: number;
		hat: number;
		outfit: number;
		weapon: number;
	};
	house: {
		active: {
			ID: number;
			anchorY: number;
			dx: number;
			dy: number;
			r: number;
			stack: unknown[];
			x: number;
			y: number;
			z: number;
		}[];
		bg: {
			active: number;
			own: number[];
		};
		currentHouseTag: string;
		items: { [index: number]: { A: []; N: number } };
	};
	achievements: unknown;
	state: {
		breadcrumbs: {
			BREADCRUMB_TITAN_INTRO: number;
			BREADCRUMB_TITAN_UNLOCKED_HUD_BUTTON: number;
			BREADCRUMB_UNLOCK_ACADEMY: number;
			FEATURE_BADGES: number;
			FEATURE_BATTLE_TUTORIAL: number;
			FEATURE_COOP_BATTLE: number;
			FEATURE_SOCIAL_FEED: number;
			FEATURE_TOWERS_PROMPT: number;
		};
		towers: {
			[tower in "earthtower"]: {
				achievementMonstersCount: boolean;
				achievementPagesCount: boolean;
				boss: boolean;
				floors: number;
				wardenSaved: boolean;
			};
		};
		tutorial: {
			0: number;
		};
		world: {
			bounties: number[];
			dailyQuests: { [index: number]: { dateId: number; questId: number; questState: number } };
		};
		zone: {
			[location: string]: unknown;
		};
	};
}
export const getBigData = async (): Promise<BigData | null> => {
	const account = await getAccount();
	if (!account) return null;
	const bigData = await fetchWithAuth(
		`https://api.prodigygame.com/game-api/v1/character/${account.userID}?isMember=0&userID=${account.userID}`
	);
	return bigData.ok ? await bigData.json() : null;
};
export const updateUser = async (data: DeepPartial<BigData>) => {
	const account = await getAccount();
	const bigData = await getBigData();
	if (!(bigData && account)) return null;
	const merged = _.mergeWith(bigData, data, (t, o) => (_.isArray(t) ? o : JSON.stringify(o) === "{}" ? o : undefined));
	const fetched = await fetchWithAuth(USER_UPDATE(account.userID), {
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			data: JSON.stringify(merged),
			userID: account.userID,
		}),
		method: "POST",
	});
	return fetched.ok || null;
};
let gameDataCache: GameData | null = null;
export const getGameData = async (): Promise<GameData> =>
	gameDataCache
		? gameDataCache
		: (gameDataCache = await (await fetch(PROD_GAMEDATA((await getStatus()).data.prodigyGameFlags.gameDataVersion))).json());
export const VERY_LARGE_NUMBER = 1e69;

export const LARGE_NUMBER = 1e9;
