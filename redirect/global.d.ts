import { PIXI } from "../typings/pixi";
import { BackpackData } from "../typings/backpack";
import { Player } from "../typings/player";
import { Prodigy } from "../typings/prodigy";
import { Game } from "../typings/game"
export declare interface HackFunctions {
	completeTutorial(): void;
	getAllPets(): void;
	getAllItemsInCategory(category: keyof BackpackData): void;
	escapeBattle(): void;
}
export declare interface HackVariables {
	loc: { [index: string]: number; [index: number]: string };
	menuTxt: { [index: string]: number; [index: number]: string };
	menuObj: { [index: string]: { INTRO: { menu: number; ID: number } } };
}
export declare interface Hack {
	instance: { prodigy: Prodigy; game: Game };
	constants: unknown;
	modules: unknown;
	functions: HackFunctions;
	variables: HackVariables;
	gameData: GameData;
	localizer: TODO;
	dialogue: TODO;
	network: TODO;
	hack: Hack;
	player: Player;
	hackMainframe(): void;
}