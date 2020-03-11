var style = document.createElement('style');
style.innerHTML = '.hide {display: none;}';
document.head.appendChild(style);

var div = document.createElement('div');
var id = document.createAttribute("id");
id.value = 'menu';
div.setAttributeNode(id);

id = document.createAttribute("style");
id.value = 'dysplay:none; position: absolute; z-index: 10; background-color: white;';
div.setAttributeNode(id);
id = document.createAttribute("class");
id.value = 'hide';
div.setAttributeNode(id);
document.body.insertBefore(div,document.getElementById('game-wrapper'));

id = document.createElement("p");
id.innerHTML = 'Teleport';
var idea = document.createAttribute('id');
idea.value = 'tele';
id.setAttributeNode(idea);
div.appendChild(document.createElement('br'));
div.appendChild(id);

id = document.createElement("p");
id.innerHTML = 'Membership';
var idea = document.createAttribute('id');
idea.value = 'member';
id.setAttributeNode(idea);
div.appendChild(id);

id = document.createElement("p");
id.innerHTML = 'Escape Battle';
var idea = document.createAttribute('id');
idea.value = 'escape';
id.setAttributeNode(idea);
div.appendChild(id);

id = document.createElement("p");
id.innerHTML = 'Level 100';
var idea = document.createAttribute('id');
idea.value = 'level';
id.setAttributeNode(idea);
div.appendChild(id);

id = document.createElement("p");
id.innerHTML = 'Skip Tutorial';
var idea = document.createAttribute('id');
idea.value = 'tut';
id.setAttributeNode(idea);
div.appendChild(id);

id = document.createElement("p");
id.innerHTML = 'Lots of Gold';
var idea = document.createAttribute('id');
idea.value = 'greed';
id.setAttributeNode(idea);
div.appendChild(id);

id = document.createElement("p");
id.innerHTML = '99 Conjure Cubes';
var idea = document.createAttribute('id');
idea.value = 'conjure';
id.setAttributeNode(idea);
div.appendChild(id);

id = document.createElement("p");
id.innerHTML = 'Get All Items';
var idea = document.createAttribute('id');
idea.value = 'items';
id.setAttributeNode(idea);
div.appendChild(id);

id = document.createElement("p");
id.innerHTML = 'Speed Up x10';
var idea = document.createAttribute('id');
idea.value = 'sped';
id.setAttributeNode(idea);
div.appendChild(id);

id = document.createElement("p");
id.innerHTML = 'Normal Speed';
var idea = document.createAttribute('id');
idea.value = 'notsped';
id.setAttributeNode(idea);
div.appendChild(id);

var e = document.createElement("button");
var a = document.createTextNode("Cheat Menu");
var body = document.getElementsByTagName("body");

e.appendChild(a);

a = document.createAttribute('style');
a.value = 'position: absolute; z-index: 10;';

e.setAttributeNode(a);

a = document.createAttribute('id');
a.value = 'cheatButton';

e.setAttributeNode(a);

body[0].insertBefore(e, document.getElementById('game-wrapper'));

document.getElementById("cheatButton").addEventListener("click", disp);

document.getElementById('tele').addEventListener("click", teleport);
document.getElementById('member' ).addEventListener("click", member);
document.getElementById('escape').addEventListener("click", escape);
document.getElementById('level').addEventListener("click", level);
document.getElementById('tut').addEventListener("click", tut);
document.getElementById('greed').addEventListener("click", greed);
document.getElementById('conjure').addEventListener("click", conjure);
document.getElementById('items').addEventListener("click", item);
document.getElementById('sped').addEventListener("click", sped);
document.getElementById('notsped').addEventListener("click", notsped);

function sped(){
    PIXI.game.prodigy.debugMisc.setGameSpeed(10);
}

function notsped(){
    PIXI.game.prodigy.debugMisc.setGameSpeed(1);
}

function item(){
a=["outfit", "hat", "boots", "weapon", "spellRelic", "fossil"];
for (u of a) {
    PIXI.game.prodigy.player.backpack.data[u]=[];
    x = PIXI.game.state.states.Boot._gameData[u];
    for (i in x) {
        PIXI.game.prodigy.player.backpack.data[u][i] = {"ID": x[i].ID, "N": 1};
    }
}
PIXI.game.prodigy.player.backpack.data.currency=[];
x = PIXI.game.state.states.Boot._gameData.currency;
for (i in x) {
    PIXI.game.prodigy.player.backpack.data.currency[i] = {"ID": x[i].ID, "N": 99999999};
}

PIXI.game.prodigy.player.backpack.data.follow=[];
x = PIXI.game.state.states.Boot._gameData.follow;
for (i in x) {
    PIXI.game.prodigy.player.backpack.data.follow[i] = {"ID": x[i].ID};
}
PIXI.game.prodigy.player.backpack.data.item=[];
x = PIXI.game.state.states.Boot._gameData.item;
for (i in x) {
    PIXI.game.prodigy.player.backpack.data.item[i] = {"ID": x[i].ID, "N": 99999999};
}

PIXI.game.prodigy.player.backpack.data.item=[];
x = PIXI.game.state.states.Boot._gameData.item;
for (i in x) {
    PIXI.game.prodigy.player.backpack.data.item[i] = {"ID": x[i].ID, "N": 99999999};
}
}

function conjure(){
    PIXI.game.prodigy.debugMisc.getCubes(99);
    PIXI.game.prodigy.create.conjureCubeButton();
}

function greed(){
    PIXI.game.prodigy.game.prodigy.debugMisc.getGold(Infinity);
}

function tut(){
    PIXI.game.prodigy.debugQuests.completeTutorial();
}

function level(){
  PIXI.game.prodigy.debugMisc.setLevel(100);
}

function member(){
  PIXI.game.prodigy.player.it=true;
}

function escape(){
  PIXI.game.prodigy.debugMisc.escapeBattle();
}

function teleport(){
window.addEventListener('keydown', (event) => {
PIXI.game.prodigy.user.x=PIXI.game.input.mousePointer.position.x;
PIXI.game.prodigy.user.y=PIXI.game.input.mousePointer.position.y;
});
}

function disp(){
document.getElementById("menu").classList.toggle("hide");
}
