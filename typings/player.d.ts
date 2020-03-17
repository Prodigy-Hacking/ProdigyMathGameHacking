import type { TODO } from "./util";
import type { Game } from "./game";

export declare interface Player {
	achievements: TODO;
	appearance: TODO;
	backpack: TODO;
	daily: TODO;
	dailyQuestions: TODO;
	encounters: TODO;
	equipment: TODO;
	house: TODO;
	kennel: TODO;
	onHPChange: TODO;
	quests: TODO;
	state: TODO;
	_remoteLogger: TODO;
	game: Game;
	immortal: boolean;
	inPVP: boolean;
	isClassCodeAttached: boolean;
	readonly isFocusModeEnabled: boolean; // Getter
	danceID?: unknown;
	emoteID?: unknown;
	appearanceChanged: boolean;
	broadcastId: number;
	catchAttempt: number;
	chatID: number;
	classIDs: number[];
	coOpTeam?: unknown;
	currentVideoSkillId?: unknown;
	curriculumTreeID: number;
	earlyBirdLastChance: boolean;
	grade: number;
	isOpponent: boolean;
	hasUsedTicket: boolean;
	/** Membership */
	it: boolean;
	justLeveled: boolean;
	/** A date ISOString */
	lastVisited: string;
	locationSelectionType: string; // home
	memberEndDate?: unknown; // possibly Date?
	memberPrompt: boolean;
	memberShareDate?: unknown; // possibly Date?
	/** A date ISOString */
	memberStartDate?: string;
	modifiers: {
		maxHearts: number;
		damage: number;
		miss: number;
		ignoreElement: number;
		potion?: unknown;
	};
	overrideClassSelect: boolean;
	owners: {
		id: number;
		ownerID: number;
		startDate: number;
	}[];
	parentEmail: string;
	parentalLink: boolean;
	password: string;
	playerParents: unknown[];
	playerTeachers: {
		id: number;
		type: string;
		startDate: number;
	}[];
	pvpHP: number;
	registerDate: Date;
	readonly saveEnabled: boolean; // Getter
	source?: unknown;
	spellStreak: number;
	starsEarned: number;
	starsReward: number;
	starsRewardBase: number;
	starsToProcess: number;
	data: PlayerData;
	team?: unknown;
	transformID?: unknown; // Possibly number?
	tutorialCompletedThisSession: boolean;
	type: string; // Possibly "A" | "B" | "C" | "D" | "F"
	updated: boolean;
	userID: number;
	username: string;
	world: {
		id: number;
		full: number;
		name: string;
		meta: unknown; // Seems to be {type: "hat", ID: 47} for me.
		count: number;
	};
	_isFocusModeEnabled: false;
	_saveEnabled: true;
	name: PlayerName;
}
export declare interface PlayerName {
	data: {
		firstName: number;
		lastName: number;
		middleName: number;
		nickname: unknown;
	},
	gender: "male" | "female";
	localizer: { dataSource: TODO; };
}
export declare interface PlayerData {
	// TODO
}
// TODO: Get types for unknowns.
