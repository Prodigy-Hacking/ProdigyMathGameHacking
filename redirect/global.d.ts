import { PIXI } from "../typings/pixi";
export declare interface HackFunctions {
	completeTutorial(): void;
}
export declare interface HackVariables {
	loc: { [index: string]: number; [index: number]: string };
	menuTxt: { [index: string]: number; [index: number]: string };
	menuObj: { [index: string]: { INTRO: { menu: number; ID: number } } };
}
