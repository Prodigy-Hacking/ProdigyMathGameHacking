import { GameItemKey } from "../../../typings/gameData";
import { Item } from "../../../typings/item";
export const game = Phaser.GAMES[0]
export const prodigy = game.state.states.Login._gameObj;
export const gameData = game.state.states.Boot._gameData;
export const getItem = <T extends GameItemKey>(type: T, id: number): Item<T> | null => gameData[type].find(x => x.ID === id) as null | Item<any> ?? null;
export const VERY_LARGE_NUMBER = 1e69;
export const savePlayer = () => game.state.states.Login._gameObj.player.forceSaveCharacter();
export const assetURL = "https://raw.githubusercontent.com/PatheticMustan/ProdigyMathGameHacking/HEAD/willsCheatMenu/src/assets/"
export const joinAsset = (asset: string) => `${assetURL}${asset}`;
export const locations = {
	academy: joinAsset("academy.png"),
	bonfire_spire: joinAsset("bonfire_spire.png"),
	forest: joinAsset("forest.png"),
	shipwreck_shore: joinAsset("shipwreck_shore.png"),
	shiverchill: joinAsset("shiverchill.png"),
	skywatch: joinAsset("skywatch.png"),
}
export const pickRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];