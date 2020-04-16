const setQuest = (t, i, n, e) => {
	hack.instance.prodigy.world.getZone(t).testQuest(i, n, e);
	try {
		hack.instance.game.state.states.TileScreen.process();
	} catch {}
};

hack.functions = {};
hack.functions.completeTutorial = () => {
	setQuest("house", 2);
	setQuest("academy", 2);
	hack.instance.prodigy.player.state.set("tutorial-0", 4);
	hack.instance.prodigy.player.backpack.addKeyItem(13, 0);
	hack.instance.prodigy.player.tutorial.setMenuValue(Cr.WORLD_MAP.INTRO, 1);
	hack.instance.prodigy.player.tutorial.setMenuValue(Cr.BESTIARY.INTRO, 1);
	hack.instance.prodigy.open.map(true, [
		"WORLD_DYNO_DIG_OASIS",
		"WORLD_EPICS_SUBSPACE",
		"WORLD_DARK_TOWER",
		"WORLD_LAMPLIGHT_TOWN",
		"WORLD_THE_ACADEMY",
		"WORLD_LOST_ISLAND",
		"WORLD_YOUR_HOUSE",
		"DISABLE_TITAN",
	]);
	hack.instance.prodigy.player.onTutorialComplete();
};
