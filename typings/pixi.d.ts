import { Game } from "./game";
import { Prodigy } from "./prodigy";
import { HackFunctions, HackVariables } from "../redirect/global"
export declare interface PIXI {}
export declare interface Phaser {}
declare global {
	const PIXI: PIXI;
	const Phaser: Phaser;
	const hack: { instance: { prodigy: Prodigy, game: Game }, constants: unknown, modules: unknown, functions: HackFunctions, variables: HackVariables }
}
