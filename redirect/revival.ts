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
	else if (currentState === "CoOp") hack.instance.prodigy.world.$(hack.instance.prodigy.player.data.zone);
	else hack.instance.game.state.callbackContext.runAwayCallback();
};
/*
hack.functions.customChat = (text: string) => {
	const dialogue = hack.instance.prodigy.dialogue.create();
	dialogue.setText(10);
	const key = "noot";
	dialogue.eventQueue[0].dialogueData = dialogue.dataProvider.getLegacy(
		key,
		dialogue.eventQueue[0].legacyData.index
	);
	dialogue.eventQueue[0] = Object.assign(
		{
			type: undefined,
			windowPosition: undefined,
			blockInput: !undefined,
		},
		dialogue.eventQueue[0]
	);
	dialogue.eventQueue[0] = (window as any)._.pickBy(dialogue.eventQueue[0], x => x !== undefined);
	dialogue.closeDialogue(false);
	dialogue.onClose = () => {};
	hack.instance.prodigy.notifications.setPaused(true);
	const next = () => {
		dialogue.current = dialogue.eventQueue.splice(0, dialogue.skipCounter + 1)[dialogue.skipCounter];
		dialogue.skipCounter = 0;
		if (Object.keys(dialogue.current ?? {}).length > 0) {
			const item = [dialogue.current.dialogueData.avatar.atlas];
			if (dialogue.currentDialogue?.game) {
				dialogue.currentDialogue.updateSchema(dialogue.current, item);
			} else {
				dialogue.currentDialogue = hack.instance.prodigy.open.characterDialogue(
					dialogue.current,
					next.bind(dialogue),
					item
				);
			}
		}
	};
	next();
};
*/
Object.defineProperty(hack, "gameData", { get: () => hack.instance.game.state.states.Boot._gameData });
Object.defineProperty(hack, "localizer", {
	get: () => hack.instance.prodigy.gameContainer.get("LocalizationService"),
});
Object.defineProperty(hack, "network", {
	get: () => hack.instance.prodigy.gameContainer.get("NetworkManager"),
});
Object.defineProperty(hack, "hack", {
	get: () => hack,
});
