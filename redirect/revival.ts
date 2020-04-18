require = (() => {}) as any;
import "../typings/pixi";

const setQuest = (t: string, i: number, n?: unknown, e?: unknown) => {
	hack.instance.prodigy.world.getZone(t).testQuest(i, n, e);
	try {
		hack.instance.game.state.states.TileScreen.process();
	} catch {}
};

hack.functions = Object.create(null);
hack.functions.completeTutorial = () => {
	setQuest("house", 2);
	setQuest("academy", 2);
	hack.instance.prodigy.player.state.set("tutorial-0", 4);
	hack.instance.prodigy.player.backpack.addKeyItem(13, 0);
	hack.instance.prodigy.player.tutorial.setMenuValue(hack.variables.menuObj.WORLD_MAP.INTRO, 1);
	hack.instance.prodigy.player.tutorial.setMenuValue(hack.variables.menuObj.BESTIARY.INTRO, 1);
	hack.instance.prodigy.open.map(true, []);
	hack.instance.prodigy.player.onTutorialComplete();
};
hack.functions.getAllPets = () =>
	hack.instance.prodigy.player.kennel.data.splice(
		0,
		1e69,
		...hack.gameData.pet.map(x => ({
			ID: x.ID,
			catchDate: Date.now(),
			foreignSpells: [0, 0].map(
				x => hack.gameData.spell[Math.floor(Math.random() * hack.gameData.spell.length)].ID
			) as [number, number],
			level: 1e69,
			levelCaught: 1,
			stars: 1e69,
		}))
	);

hack.functions.getAllItemsInCategory = category =>
	hack.instance.prodigy.player.backpack.data[category].splice(
		0,
		1e69,
		...hack.gameData[category].map(x => ({ ID: x.ID, N: 1e69 }))
	);
hack.functions.escapeBattle = () => {
	const currentState = hack.instance.game.state.current;
	if (currentState === "PVP") hack.instance.game.state.states.PVP.endPVP();
	else if (currentState === "CoOp")
	hack.instance.prodigy.world.$(hack.instance.prodigy.player.data.zone);
	else hack.instance.game.state.callbackContext.runAwayCallback();
}
Object.defineProperty(hack, "gameData", { get: () => hack.instance.game.state.states.Boot._gameData });
Object.defineProperty(hack, "localizer", { get: () => hack.instance.prodigy.gameContainer.get("LocalizationService") });