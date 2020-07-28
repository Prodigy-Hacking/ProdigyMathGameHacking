define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pickRandom = exports.locations = exports.joinAsset = exports.assetURL = exports.savePlayer = exports.VERY_LARGE_NUMBER = exports.getItem = exports.gameData = exports.prodigy = exports.game = void 0;
    const base = hack.instance;
    exports.game = base.game;
    exports.prodigy = base.prodigy;
    exports.gameData = exports.game.state.states.Boot._gameData;
    exports.getItem = (type, id) => exports.gameData[type].find(x => x.ID === id) ?? null;
    exports.VERY_LARGE_NUMBER = 1e69;
    exports.savePlayer = () => hack.player.forceSaveCharacter();
    exports.assetURL = "https://raw.githubusercontent.com/PatheticMustan/ProdigyMathGameHacking/HEAD/willsCheatMenu/src/assets/";
    exports.joinAsset = (asset) => `${exports.assetURL}${asset}`;
    exports.locations = {
        academy: exports.joinAsset("academy.png"),
        bonfire_spire: exports.joinAsset("bonfire_spire.png"),
        forest: exports.joinAsset("forest.png"),
        shipwreck_shore: exports.joinAsset("shipwreck_shore.png"),
        shiverchill: exports.joinAsset("shiverchill.png"),
        skywatch: exports.joinAsset("skywatch.png"),
    };
    exports.pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
});
//# sourceMappingURL=util.js.map