import { GameItemKey } from "../../../typings/gameData";
import { Item } from "../../../typings/item";
export const gameData = PIXI.game.state.states.Boot._gameData;
export const getItem = <T extends GameItemKey>(type: T, id: number): Item<T> | null => gameData[type].find(x => x.ID === id) as null | Item<any> ?? null;
export const VERY_LARGE_NUMBER = 1e153;
export const savePlayer = () => PIXI.game.prodigy.player.forceSaveCharacter();