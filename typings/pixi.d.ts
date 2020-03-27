import { Game } from "./game";

export declare interface PIXI {}
export declare interface Phaser {
	CanvasPool: {
		pool: { parent: { game: Game } }[];
	};
}
declare global {
	const PIXI: PIXI;
	const Phaser: Phaser;
}
