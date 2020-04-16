const setQuest = (t, i, n, e) => {
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
	hack.instance.prodigy.player.tutorial.setMenuValue(Cr.WORLD_MAP.INTRO, 1);
	hack.instance.prodigy.player.tutorial.setMenuValue(Cr.BESTIARY.INTRO, 1);
	hack.instance.prodigy.open.map(true, []);
	hack.instance.prodigy.player.onTutorialComplete();
};
