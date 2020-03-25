import { Game } from "./game";

export declare interface PIXI {
}
export declare interface Phaser {
	GAMES: Game[];
}
declare global {
	const PIXI: PIXI;
	const Phaser: Phaser;
}