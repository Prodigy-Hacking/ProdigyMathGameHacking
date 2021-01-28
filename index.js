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
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
// should match https://github.com/Prodigy-Hacking/PHEx/blob/master/src/manifest.json
var SupportPHEXVersion = "2.0.0";
var lastVersion = "None";
setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
    var status_1, version, e_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, node_fetch_1.default("https://api.prodigygame.com/game-api/status")];
            case 1: return [4 /*yield*/, (_b.sent()).json()];
            case 2:
                status_1 = _b.sent();
                version = (_a = status_1 === null || status_1 === void 0 ? void 0 : status_1.data) === null || _a === void 0 ? void 0 : _a.gameClientVersion;
                if (lastVersion === "None")
                    return [2 /*return*/, (lastVersion = version)];
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }, 100000);
app.use(cors_1.default());
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
                    ["s),this._game=i}", "s),this._game=i};jQuery.temp22=_;let nahhh=setInterval(()=>{if (jQuery.temp22 !== _) {_ = jQuery.temp22; delete jQuery.temp22;clearInterval(nahhh)}});Object.defineProperty(_, \"instance\", { get: () => t.instance });"],
                    ["t.constants=Object", "_.constants=t,t.constants=Object"],
                    ["window,function(t){var i={};", "window,function(t){var i={};_.modules=i;"],
                    ["this._player=t", "this._player=_.player=t"],
                    ["i.prototype.hasMembership=", "i.prototype.hasMembership=_=>true,i.prototype.originalHasMembership="] // membership override
                    // ["this._localizer=null,this.et=[]", "_.chat=this;this._localizer=null,this.et=[]"],
                    // ["return t.BAM=", ";_.variables.loc=Ar;_.variables.menuTxt=Kr;_.variables.menuObj=t;return t.BAM="],
                ];
                _b = (_a = res).send;
                _d = (_c = replacements).reduce;
                _e = [function (code, replacement) { return code.split(replacement[0]).join(replacement[1]); }];
                _f = "nootmeat = func => {\n\t\t\t\tlet elephant = 2\n\t\t\t}\n\t\t\texports = {};_.variables=Object.create(null);\n\t\n\t\t\t" + gameMinJS + "\n\n\t\t\t" + typescript_1.transpile(fs_1.default.readFileSync(path_1.default.join(__dirname, "./revival.ts"), { encoding: "utf8" })) + "\n\n\t\t\tconsole.log(\"%cWill's Redirect Hack\", \"font-size:40px;color:#540052;font-weight:900;font-family:sans-serif;\");\n\t\t\tconsole.log(\"%cVersion " + SupportPHEXVersion + "\", \"font-size:20px;color:#000025;font-weight:700;font-family:sans-serif;\");\n\t\t\tconsole.log('The variable \"_\" contains the hacked variables.');\n\t\t\tSW.Load.onGameLoad();\n\t\t\tsetTimeout(() => {\n\t\t\t\t";
                return [4 /*yield*/, node_fetch_1.default("https://raw.githubusercontent.com/Prodigy-Hacking/ProdigyMathGameHacking/master/willsCheatMenu/loader.js")];
            case 5: return [4 /*yield*/, (_h.sent()).text()];
            case 6: return [2 /*return*/, _b.apply(_a, [_d.apply(_c, _e.concat([_f + (_h.sent()) + "\n\t\t\t}, 10000);\n\t\t"]))])];
        }
    });
}); });
app.get("/", function (req, res) { return res.redirect("/game.min.js"); });
app.get("/public-game.min.js", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var publicGame;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.query.hash)
                    return [2 /*return*/, res.send("alert('OUTDATED REDIRECTOR CONFIG')")];
                return [4 /*yield*/, node_fetch_1.default("https://code.prodigygame.com/js/public-game-" + req.query.hash + ".min.js")];
            case 1: return [4 /*yield*/, (_a.sent()).text()];
            case 2:
                publicGame = _a.sent();
                res.type(".js");
                return [2 /*return*/, res.send("\n\t\t" + publicGame.replace(/console\..+?\(.*?\)/g, "(()=>{})()") + "\n\n\t\t// overwrite Array.some to patch Prodigy's anti-cheat.\n\t\t// The Anti-Anti-Cheat\n\t\tl=Array.prototype.some;\n\t\tsetInterval(()=>{Array.prototype.some = function some(...args) {\n\t\t\tif (this[0] === \"hack\") this.splice(0, 100);\n\t\t\treturn l.call(this, ...args);\n\t\t}});\n\t\t\n\t\t// Prodigy's new hack var anti-cheat overwrote setInterval, to patch this, we get a fresh new setInterval from an iFrame,\n\t\t// then patch their patch.\n\t\tlet fffffff = document.createElement(\"iframe\");\n\t\tdocument.head.append(fffffff);\n\t\tfffffff.contentWindow.setInterval(() => {\n\t\t\tlet l = fffffff.contentWindow.setInterval;\n\t\t\twindow.setInterval = function(func, ...args) {\n\t\t\t\tif (func.toString().includes('[\"hack\"]')) return;\n\t\t\t\treturn l.call(window, func, ...args);\n\t\t\t}\n\t\t});\n\t")];
        }
    });
}); });
app.get("/download", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, res.redirect("https://github.com/Prodigy-Hacking/PHEx/raw/master/build/extension.zip")];
    });
}); });
app.get("/version", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, res.send(SupportPHEXVersion)];
    });
}); });
var port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 1337;
app.listen(port, function () { return console.log("The old machine hums along on port :" + port); });
