"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var typescript_1 = require("typescript");
var discord_js_1 = __importDefault(require("discord.js"));
var app = express_1.default();
var VERSION = "A-0.0.3";
var lastVersion = "None";
var lastBuild = 0;
var hook = new discord_js_1.default.WebhookClient("700774406963724328", "g3X1Kv3vV8uAeNnHBrBnRM-UzCAfsXCbJ-OzP27aqTnW9tkRc3i9tCbGFL8Of5vbRKOV");
setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
    var status, version;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, node_fetch_1.default("https://api.prodigygame.com/game-api/status")];
            case 1: return [4 /*yield*/, (_c.sent()).json()];
            case 2:
                status = _c.sent();
                version = (_a = status === null || status === void 0 ? void 0 : status.data) === null || _a === void 0 ? void 0 : _a.gameClientVersion;
                if (lastVersion === "None")
                    return [2 /*return*/, ((lastVersion = version), (lastBuild = status.data.prodigyGameFlags.gameDataVersion))];
                if (!version || (version === lastVersion && ((_b = status.data) === null || _b === void 0 ? void 0 : _b.prodigyGameFlags.gameDataVersion)))
                    return [2 /*return*/];
                return [4 /*yield*/, hook.send("**New Prodigy Version**: Prodigy has updated from `" + lastVersion + "` GDV `" + (lastBuild || "N/A") + "` to `" + (lastVersion = version) + "` GDV `" + (lastBuild = status.data.prodigyGameFlags.gameDataVersion) + "` ")];
            case 3:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); }, 100000);
app.get("/game.min.js", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status, version, gameMinJS, replacements, _a, _b, _c, _d, _e, _f;
    var _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0: return [4 /*yield*/, node_fetch_1.default("https://api.prodigygame.com/game-api/status")];
            case 1: return [4 /*yield*/, (_h.sent()).json()];
            case 2:
                status = _h.sent();
                version = (_g = status === null || status === void 0 ? void 0 : status.data) === null || _g === void 0 ? void 0 : _g.gameClientVersion;
                if (status.status !== "success" || !version)
                    return [2 /*return*/, res.sendStatus(503)];
                return [4 /*yield*/, node_fetch_1.default("https://code.prodigygame.com/code/" + version + "/game.min.js?v=" + version)];
            case 3: return [4 /*yield*/, (_h.sent()).text()];
            case 4:
                gameMinJS = _h.sent();
                res.type(".js");
                replacements = [
                    ["s),this._game=i}", "s),this._game=i};Object.defineProperty(hack, \"instance\", { get: () => t.instance });"],
                    ["t.constants=Object", "hack.constants=t,t.constants=Object"],
                    ["window,function(t){var i={};", "window,function(t){var i={};hack.modules=i;"],
                    ["return t.BAM=", ";hack.variables.loc=Ar;hack.variables.menuTxt=Kr;hack.variables.menuObj=t;return t.BAM="],
                ];
                _b = (_a = res).send;
                _d = (_c = replacements).reduce;
                _e = [function (l, c) { return l.split(c[0]).join(c[1]); }];
                _f = "\n\texports = {};window.hack=Object.create(null);hack.variables=Object.create(null);\n\t\n" + gameMinJS + "\n\t" + typescript_1.transpile(fs_1.default.readFileSync(path_1.default.join(__dirname, "./revival.ts"), { encoding: "utf8" })) + "\n\tconsole.log(\"%cWill's Redirect Hack\", \"font-size:40px;color:#540052;font-weight:900;font-family:sans-serif;\");\n\tconsole.log(\"%cVersion " + VERSION + "\", \"font-size:20px;color:#000025;font-weight:700;font-family:sans-serif;\");\n\tconsole.log('The variable \"hack\" contains the hacked variables.');\n\t";
                return [4 /*yield*/, node_fetch_1.default("https://raw.githubusercontent.com/Prodigy-Hacking/ProdigyMathGameHacking/master/willsCheatMenu/loader.js")];
            case 5: return [4 /*yield*/, (_h.sent()).text()];
            case 6: return [2 /*return*/, _b.apply(_a, [_d.apply(_c, _e.concat([_f + (_h.sent()) + "\n"]))])];
        }
    });
}); });
app.get("/", function (req, res) { return res.redirect("/game.min.js"); });
app.get("/public-game.min.js", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var publicGame;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, node_fetch_1.default("https://play.prodigygame.com/public/js/public-game.min.js")];
            case 1: return [4 /*yield*/, (_a.sent()).text()];
            case 2:
                publicGame = _a.sent();
                res.type(".js");
                return [2 /*return*/, res.send(publicGame.replace(/console\..+?\(.*?\)/g, "(()=>{})()"))];
        }
    });
}); });
app.get("/download", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, node_fetch_1.default("https://raw.githubusercontent.com/PatheticMustan/ProdigyMathGameHacking/master/redirect/Redirector.json")];
            case 1: return [4 /*yield*/, (_a.sent()).text()];
            case 2:
                file = _a.sent();
                res.type(".json");
                res.header("Content-Disposition", 'attachment; filename="Redirector.json"');
                return [2 /*return*/, res.send(file)];
        }
    });
}); });
app.get("/version", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, node_fetch_1.default("https://raw.githubusercontent.com/PatheticMustan/ProdigyMathGameHacking/master/redirect/Redirector.json")];
            case 1: return [4 /*yield*/, (_a.sent()).text()];
            case 2:
                file = _a.sent();
                res.type(".json");
                res.header("Content-Disposition", 'attachment; filename="Redirector.json"');
                return [2 /*return*/, res.send(file)];
        }
    });
}); });
app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 1337, function () { return console.log("Started!"); });
