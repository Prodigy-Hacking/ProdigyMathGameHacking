import { PIXI } from "../typings/pixi";
import { BackpackData } from "../typings/backpack";
export declare interface HackFunctions {
	completeTutorial(): void;
	getAllPets(): void;
	getAllItemsInCategory(category: keyof BackpackData): void;
}
export declare interface HackVariables {
	loc: { [index: string]: number; [index: number]: string };
	menuTxt: { [index: string]: number; [index: number]: string };
	menuObj: { [index: string]: { INTRO: { menu: number; ID: number } } };
}
