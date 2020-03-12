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

id = document.createElement("p");
id.innerHTML = 'Insta Kill';
var idea = document.createAttribute('id');
idea.value = 'instakill';
id.setAttributeNode(idea);
div.appendChild(id);

var e = document.createElement("input");
var a = document.createTextNode("Cheat Menu");
var body = document.getElementsByTagName("body");

e.appendChild(a);

a = document.createAttribute('style');
a.value = 'position: absolute; z-index: 10; width: 50px; height: 50px;';
e.setAttributeNode(a);

a = document.createAttribute('type');
a.value = 'image';
e.setAttributeNode(a);

a = document.createAttribute('src');
a.value = 'https://play.prodigygame.com/public/assets/images/ed/@2x/ed-sad@2x.png';
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
document.getElementById('instakill').addEventListener("click", instakill);

function instakill(){
    PIXI.game.prodigy.player.modifiers.damage=Infinity;
}

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

//Script Ends Here Bookmarklet Below
javascript:(function()%7Bvar style %3D document.createElement('style')%3Bstyle.innerHTML %3D '.hide %7Bdisplay%3A none%3B%7D'%3Bdocument.head.appendChild(style)%3Bvar div %3D document.createElement('div')%3Bvar id %3D document.createAttribute("id")%3Bid.value %3D 'menu'%3Bdiv.setAttributeNode(id)%3Bid %3D document.createAttribute("style")%3Bid.value %3D 'dysplay%3Anone%3B position%3A absolute%3B z-index%3A 10%3B background-color%3A white%3B'%3Bdiv.setAttributeNode(id)%3Bid %3D document.createAttribute("class")%3Bid.value %3D 'hide'%3Bdiv.setAttributeNode(id)%3Bdocument.body.insertBefore(div%2Cdocument.getElementById('game-wrapper'))%3Bid %3D document.createElement("p")%3Bid.innerHTML %3D 'Teleport'%3Bvar idea %3D document.createAttribute('id')%3Bidea.value %3D 'tele'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(document.createElement('br'))%3Bdiv.appendChild(document.createElement('br'))%3Bdiv.appendChild(id)%3Bid %3D document.createElement("p")%3Bid.innerHTML %3D 'Membership'%3Bvar idea %3D document.createAttribute('id')%3Bidea.value %3D 'member'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bid %3D document.createElement("p")%3Bid.innerHTML %3D 'Escape Battle'%3Bvar idea %3D document.createAttribute('id')%3Bidea.value %3D 'escape'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bid %3D document.createElement("p")%3Bid.innerHTML %3D 'Level 100'%3Bvar idea %3D document.createAttribute('id')%3Bidea.value %3D 'level'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bid %3D document.createElement("p")%3Bid.innerHTML %3D 'Skip Tutorial'%3Bvar idea %3D document.createAttribute('id')%3Bidea.value %3D 'tut'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bid %3D document.createElement("p")%3Bid.innerHTML %3D 'Lots of Gold'%3Bvar idea %3D document.createAttribute('id')%3Bidea.value %3D 'greed'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bid %3D document.createElement("p")%3Bid.innerHTML %3D '99 Conjure Cubes'%3Bvar idea %3D document.createAttribute('id')%3Bidea.value %3D 'conjure'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bid %3D document.createElement("p")%3Bid.innerHTML %3D 'Get All Items'%3Bvar idea %3D document.createAttribute('id')%3Bidea.value %3D 'items'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bid %3D document.createElement("p")%3Bid.innerHTML %3D 'Speed Up x10'%3Bvar idea %3D document.createAttribute('id')%3Bidea.value %3D 'sped'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bid %3D document.createElement("p")%3Bid.innerHTML %3D 'Normal Speed'%3Bvar idea %3D document.createAttribute('id')%3Bidea.value %3D 'notsped'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bid %3D document.createElement("p")%3Bid.innerHTML %3D 'Insta Kill'%3Bvar idea %3D document.createAttribute('id')%3Bidea.value %3D 'instakill'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bvar e %3D document.createElement("input")%3Bvar a %3D document.createTextNode("Cheat Menu")%3Bvar body %3D document.getElementsByTagName("body")%3Be.appendChild(a)%3Ba %3D document.createAttribute('style')%3Ba.value %3D 'position%3A absolute%3B z-index%3A 10%3B width%3A 50px%3B height%3A 50px%3B'%3Be.setAttributeNode(a)%3Ba %3D document.createAttribute('type')%3Ba.value %3D 'image'%3Be.setAttributeNode(a)%3Ba %3D document.createAttribute('src')%3Ba.value %3D 'https%3A%2F%2Fplay.prodigygame.com%2Fpublic%2Fassets%2Fimages%2Fed%2F%402x%2Fed-sad%402x.png'%3Be.setAttributeNode(a)%3Ba %3D document.createAttribute('id')%3Ba.value %3D 'cheatButton'%3Be.setAttributeNode(a)%3Bbody%5B0%5D.insertBefore(e%2C document.getElementById('game-wrapper'))%3Bdocument.getElementById("cheatButton").addEventListener("click"%2C disp)%3Bdocument.getElementById('tele').addEventListener("click"%2C teleport)%3Bdocument.getElementById('member' ).addEventListener("click"%2C member)%3Bdocument.getElementById('escape').addEventListener("click"%2C escape)%3Bdocument.getElementById('level').addEventListener("click"%2C level)%3Bdocument.getElementById('tut').addEventListener("click"%2C tut)%3Bdocument.getElementById('greed').addEventListener("click"%2C greed)%3Bdocument.getElementById('conjure').addEventListener("click"%2C conjure)%3Bdocument.getElementById('items').addEventListener("click"%2C item)%3Bdocument.getElementById('sped').addEventListener("click"%2C sped)%3Bdocument.getElementById('notsped').addEventListener("click"%2C notsped)%3Bdocument.getElementById('instakill').addEventListener("click"%2C instakill)%3Bfunction instakill()%7BPIXI.game.prodigy.player.modifiers.damage%3DInfinity%3B%7Dfunction sped()%7BPIXI.game.prodigy.debugMisc.setGameSpeed(10)%3B%7Dfunction notsped()%7BPIXI.game.prodigy.debugMisc.setGameSpeed(1)%3B%7Dfunction item()%7Ba%3D%5B"outfit"%2C "hat"%2C "boots"%2C "weapon"%2C "spellRelic"%2C "fossil"%5D%3Bfor (u of a) %7BPIXI.game.prodigy.player.backpack.data%5Bu%5D%3D%5B%5D%3Bx %3D PIXI.game.state.states.Boot._gameData%5Bu%5D%3Bfor (i in x) %7BPIXI.game.prodigy.player.backpack.data%5Bu%5D%5Bi%5D %3D %7B"ID"%3A x%5Bi%5D.ID%2C "N"%3A 1%7D%3B%7D%7DPIXI.game.prodigy.player.backpack.data.currency%3D%5B%5D%3Bx %3D PIXI.game.state.states.Boot._gameData.currency%3Bfor (i in x) %7BPIXI.game.prodigy.player.backpack.data.currency%5Bi%5D %3D %7B"ID"%3A x%5Bi%5D.ID%2C "N"%3A 99999999%7D%3B%7DPIXI.game.prodigy.player.backpack.data.follow%3D%5B%5D%3Bx %3D PIXI.game.state.states.Boot._gameData.follow%3Bfor (i in x) %7BPIXI.game.prodigy.player.backpack.data.follow%5Bi%5D %3D %7B"ID"%3A x%5Bi%5D.ID%7D%3B%7DPIXI.game.prodigy.player.backpack.data.item%3D%5B%5D%3Bx %3D PIXI.game.state.states.Boot._gameData.item%3Bfor (i in x) %7BPIXI.game.prodigy.player.backpack.data.item%5Bi%5D %3D %7B"ID"%3A x%5Bi%5D.ID%2C "N"%3A 99999999%7D%3B%7DPIXI.game.prodigy.player.backpack.data.item%3D%5B%5D%3Bx %3D PIXI.game.state.states.Boot._gameData.item%3Bfor (i in x) %7BPIXI.game.prodigy.player.backpack.data.item%5Bi%5D %3D %7B"ID"%3A x%5Bi%5D.ID%2C "N"%3A 99999999%7D%3B%7D%7Dfunction conjure()%7BPIXI.game.prodigy.debugMisc.getCubes(99)%3BPIXI.game.prodigy.create.conjureCubeButton()%3B%7Dfunction greed()%7BPIXI.game.prodigy.game.prodigy.debugMisc.getGold(Infinity)%3B%7Dfunction tut()%7BPIXI.game.prodigy.debugQuests.completeTutorial()%3B%7Dfunction level()%7BPIXI.game.prodigy.debugMisc.setLevel(100)%3B%7Dfunction member()%7BPIXI.game.prodigy.player.it%3Dtrue%3B%7Dfunction escape()%7BPIXI.game.prodigy.debugMisc.escapeBattle()%3B%7Dfunction teleport()%7Bwindow.addEventListener('keydown'%2C (event) %3D> %7BPIXI.game.prodigy.user.x%3DPIXI.game.input.mousePointer.position.x%3BPIXI.game.prodigy.user.y%3DPIXI.game.input.mousePointer.position.y%3B%7D)%3B%7Dfunction disp()%7Bdocument.getElementById("menu").classList.toggle("hide")%3B%7D%7D)()
