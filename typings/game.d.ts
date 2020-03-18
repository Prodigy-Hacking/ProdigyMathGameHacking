import { Prodigy } from "./prodigy";
import { TODO } from "./util";
import { GameData } from "./gameData";

export declare interface Game {
	prodigy: Prodigy;
	id: number; // Not sure what this does. Seems to be 0.
	state: GameState;
}
export declare interface GameState {
	states: GameStates;
}
export declare interface GameStates {
	Boot: BootState;
	Loading: GameStatesState;
	PVPLoading: GameStatesState;
	TileScreen: GameStatesState;
	Login: GameStatesState;
	Battle: GameStatesState;
	PVP: GameStatesState;
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