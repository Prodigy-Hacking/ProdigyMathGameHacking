require = (() => {}) as any;
import "../typings/pixi";

const setQuest = (t: string, i: number, n?: unknown, e?: unknown) => {
	_.instance.prodigy.world.getZone(t).testQuest(i, n, e);
	try {
		_.instance.game.state.states.TileScreen.process();
	} catch {}
};

_.functions = Object.create(null);
_.functions.completeTutorial = () => {
	setQuest("house", 2);
	setQuest("academy", 2);
	_.player.state.set("tutorial-0", 4);
	_.player.backpack.addKeyItem(13, 0);
	_.player.tutorial.setMenuValue(_.variables.menuObj.WORLD_MAP.INTRO, 1);
	_.player.tutorial.setMenuValue(_.variables.menuObj.BESTIARY.INTRO, 1);
	_.instance.prodigy.open.map(true, []);
	_.player.onTutorialComplete();
};
_.functions.getAllPets = () =>
	_.player.kennel.data.splice(
		0,
		1e69,
		..._.gameData.pet.map(x => ({
			ID: x.ID,
			catchDate: Date.now(),
			foreignSpells: [0, 0].map(
				x => _.gameData.spell[Math.floor(Math.random() * _.gameData.spell.length)].ID
			) as [number, number],
			level: 1e69,
			levelCaught: 1,
			stars: 1e69,
		}))
	);

_.functions.getAllItemsInCategory = category =>
	_.player.backpack.data[category].splice(
		0,
		1e69,
		..._.gameData[category].map(x => ({ ID: x.ID, N: 1e69 }))
	);
_.functions.escapeBattle = () => {
	const currentState = _.instance.game.state.current;
	if (currentState === "PVP") _.instance.game.state.states.PVP.endPVP();
	else if (currentState === "CoOp") _.instance.prodigy.world.$(_.player.data.zone);
	else _.instance.game.state.callbackContext.runAwayCallback();
};
_.hackMainframe = () => {
	const parent = document.querySelector("canvas")?.parentElement;
	document.querySelector("canvas")?.remove();
	const canvas = document.createElement("canvas");
	parent.prepend(canvas)
	const ctx = canvas.getContext("2d");
	const letters = "0123456789ABCDEF".split("");
	canvas.width = innerWidth
	canvas.height = innerHeight

	const fontSize = 10;
	const columns = canvas.width / fontSize;
	const drops = [];
	for (let i = 0; i < columns; i++) drops[i] = 1;
	setInterval(() => {
		ctx.fillStyle = "rgba(0, 0, 0, .1)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i < drops.length; i++) {
			const text = letters[Math.floor(Math.random() * letters.length)];
			ctx.fillStyle = "#0f0";
			ctx.fillText(text, i * fontSize, drops[i] * fontSize);
			drops[i]++;
			if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
				drops[i] = 0;
			}
		}
	}, 33)
};
/*
_.functions.customChat = (text: string) => {
	const dialogue = _.instance.prodigy.dialogue.create();
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
	_.instance.prodigy.notifications.setPaused(true);
	const next = () => {
		dialogue.current = dialogue.eventQueue.splice(0, dialogue.skipCounter + 1)[dialogue.skipCounter];
		dialogue.skipCounter = 0;
		if (Object.keys(dialogue.current ?? {}).length > 0) {
			const item = [dialogue.current.dialogueData.avatar.atlas];
			if (dialogue.currentDialogue?.game) {
				dialogue.currentDialogue.updateSchema(dialogue.current, item);
			} else {
				dialogue.currentDialogue = _.instance.prodigy.open.characterDialogue(
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
Object.defineProperty(_, "gameData", { get: () => _.instance.game.state.states.Boot._gameData });
Object.defineProperty(_, "localizer", {
	get: () => _.instance.prodigy.gameContainer.get("LocalizationService"),
});
Object.defineProperty(_, "network", {
	get: () => _.player.game.input.onDown._bindings[0].context,
});
Object.defineProperty(_, "hack", {
	get: () => _,
});