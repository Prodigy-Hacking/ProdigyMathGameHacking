import { Prodigy } from "./prodigy";
import { TODO } from "./util";
import { GameData } from "./gameData";

export declare interface Game {
	prodigy: Prodigy;
	id: number; // Not sure what this does. Seems to be 0.
	state: GameState;
	input: TODO;
}
export declare interface GameState {
	states: GameStates;
	current: string;
	callbackContext: { runAwayCallback(): void };
}
export declare interface GameStates {
	Boot: BootState;
	Loading: GameStatesState;
	PVPLoading: GameStatesState;
	TileScreen: GameStatesState;
	Login: GameStatesState;
	Battle: BattleState;
	PVP: PVPState;
	Faint: GameStatesState;
	CharSelect: GameStatesState;
	CharCreate: GameStatesState;
	Museum: GameStatesState;
	DinoDig: GameStatesState;
	DanceDance: GameStatesState;
	CoOp: GameStatesState;
	TestScreen: GameStatesState;
	PrefabScene: GameStatesState;
}
export declare interface GameStatesState {
	key: string;
	game: Game;
	add?: unknown;
}
export declare interface BootState extends GameStatesState {
	key: "Boot";
	_gameData: GameData;
}
export declare interface PVPState extends GameStatesState {
	key: "PVP";
	endPVP(): void;
}
export declare interface BattleState extends GameStatesState {
	key: "Battle";
	startVictory(): void;
}