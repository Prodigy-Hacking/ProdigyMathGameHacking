"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require = (function () { });
require("../typings/pixi");
var setQuest = function (t, i, n, e) {
    hack.instance.prodigy.world.getZone(t).testQuest(i, n, e);
    try {
        hack.instance.game.state.states.TileScreen.process();
    }
    catch (_a) { }
};
hack.functions = Object.create(null);
hack.functions.completeTutorial = function () {
    setQuest("house", 2);
    setQuest("academy", 2);
    hack.instance.prodigy.player.state.set("tutorial-0", 4);
    hack.instance.prodigy.player.backpack.addKeyItem(13, 0);
    hack.instance.prodigy.player.tutorial.setMenuValue(hack.variables.menuObj.WORLD_MAP.INTRO, 1);
    hack.instance.prodigy.player.tutorial.setMenuValue(hack.variables.menuObj.BESTIARY.INTRO, 1);
    hack.instance.prodigy.open.map(true, []);
    hack.instance.prodigy.player.onTutorialComplete();
};
hack.functions.getAllPets = function () {
    var _a;
    return (_a = hack.instance.prodigy.player.kennel.data).splice.apply(_a, __spreadArrays([0,
        1e69], hack.gameData.pet.map(function (x) { return ({
        ID: x.ID,
        catchDate: Date.now(),
        foreignSpells: [0, 0].map(function (x) { return hack.gameData.spell[Math.floor(Math.random() * hack.gameData.spell.length)].ID; }),
        level: 1e69,
        levelCaught: 1,
        stars: 1e69,
    }); })));
};
hack.functions.getAllItemsInCategory = function (category) {
    var _a;
    return (_a = hack.instance.prodigy.player.backpack.data[category]).splice.apply(_a, __spreadArrays([0,
        1e69], hack.gameData[category].map(function (x) { return ({ ID: x.ID, N: 1e69 }); })));
};
