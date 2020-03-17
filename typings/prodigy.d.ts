import type { Game } from "./game";
import type { Player } from "./player";

export declare interface Prodigy {
	version: string;
	game: Game;
	player: Player;
}