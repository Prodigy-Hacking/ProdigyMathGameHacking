import { Game } from "./game";
import { Player } from "./player";
import { DebugMisc } from "./debugMisc";
import { TODO } from "./util";
import { Open } from "./open";

export declare interface Prodigy {
	version: string;
	game: Game;
	player: Player;
	// debugMisc: DebugMisc;
	world: TODO;
	giftBoxController: TODO;
	open: Open;
	// debugQuests: TODO;
	user: TODO;
	pvpNetworkHandler: TODO;
	network: TODO;
	classModeController: TODO;
	gameContainer: TODO;
}