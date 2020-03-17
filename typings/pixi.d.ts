import type { Game } from "./game";

export declare interface PIXI {
	game: Game;
}
declare global {
	const PIXI: PIXI;
}