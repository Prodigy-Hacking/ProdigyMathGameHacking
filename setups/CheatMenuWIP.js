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

var div1 = document.createElement('div');
var id = document.createAttribute("id");
id.value = 'submenu';
div1.setAttributeNode(id);

id = document.createAttribute("style");
id.value = 'dysplay:none; position: absolute; left: 12.7%; z-index: 10; background-color: white;';
div1.setAttributeNode(id);
id = document.createAttribute("class");
id.value = 'hide';
div1.setAttributeNode(id);
document.body.insertBefore(div1,document.getElementById('game-wrapper'));

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
div1.appendChild(id);

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
div1.appendChild(id);

id = document.createElement("p");
id.innerHTML = '99 Conjure Cubes';
var idea = document.createAttribute('id');
idea.value = 'conjure';
id.setAttributeNode(idea);
div1.appendChild(id);

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
div1.appendChild(id);

id = document.createElement("p");
id.innerHTML = 'Get all Pets';
var idea = document.createAttribute('id');
idea.value = 'pets';
id.setAttributeNode(idea);
div.appendChild(id);

id = document.createElement("p");
id.innerHTML = 'Stats SubMenu';
var idea = document.createAttribute('id');
idea.value = 'sub';
id.setAttributeNode(idea);
div.appendChild(id);

id = document.createElement("p");
id.innerHTML = 'Unlock all Zones';
var idea = document.createAttribute('id');
idea.value = 'zones';
id.setAttributeNode(idea);
div.appendChild(id);

id = document.createElement("p");
id.innerHTML = 'Max Battle Energy ';
var idea = document.createAttribute('id');
idea.value = 'hype';
id.setAttributeNode(idea);
div1.appendChild(id);

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
document.getElementById('sub').addEventListener("click", disp1);

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
document.getElementById('pets').addEventListener("click", pets);
document.getElementById('zones').addEventListener("click", zones);
document.getElementById('hype').addEventListener("click", hype);

function hype(){
    PIXI.game.prodigy.debugMisc.setBattleEnergy(Infinity);
}

function zones(){
    PIXI.game.prodigy.classModeController.lockedZones=0;
}

function pets(){
    PIXI.game.prodigy.debugMisc.getAllPets();
}

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

function disp1(){
    document.getElementById('submenu').classList.toggle("hide");
}

function disp(){
    if(document.getElementById('submenu').classList.value != "hide"){
        document.getElementById('submenu').classList.toggle("hide");
    }
    document.getElementById('menu').classList.toggle("hide");
    
}
//Script Ends Here Bookmarklet Below
javascript:(function()%7Bvar%20style%20%3D%20document.createElement('style')%3Bstyle.innerHTML%20%3D%20'.hide%20%7Bdisplay%3A%20none%3B%7D'%3Bdocument.head.appendChild(style)%3Bvar%20div%20%3D%20document.createElement('div')%3Bvar%20id%20%3D%20document.createAttribute(%22id%22)%3Bid.value%20%3D%20'menu'%3Bdiv.setAttributeNode(id)%3Bid%20%3D%20document.createAttribute(%22style%22)%3Bid.value%20%3D%20'dysplay%3Anone%3B%20position%3A%20absolute%3B%20z-index%3A%2010%3B%20background-color%3A%20white%3B'%3Bdiv.setAttributeNode(id)%3Bid%20%3D%20document.createAttribute(%22class%22)%3Bid.value%20%3D%20'hide'%3Bdiv.setAttributeNode(id)%3Bdocument.body.insertBefore(div%2Cdocument.getElementById('game-wrapper'))%3Bvar%20div1%20%3D%20document.createElement('div')%3Bvar%20id%20%3D%20document.createAttribute(%22id%22)%3Bid.value%20%3D%20'submenu'%3Bdiv1.setAttributeNode(id)%3Bid%20%3D%20document.createAttribute(%22style%22)%3Bid.value%20%3D%20'dysplay%3Anone%3B%20position%3A%20absolute%3B%20left%3A%2012.7%25%3B%20z-index%3A%2010%3B%20background-color%3A%20white%3B'%3Bdiv1.setAttributeNode(id)%3Bid%20%3D%20document.createAttribute(%22class%22)%3Bid.value%20%3D%20'hide'%3Bdiv1.setAttributeNode(id)%3Bdocument.body.insertBefore(div1%2Cdocument.getElementById('game-wrapper'))%3Bid%20%3D%20document.createElement(%22p%22)%3Bid.innerHTML%20%3D%20'Teleport'%3Bvar%20idea%20%3D%20document.createAttribute('id')%3Bidea.value%20%3D%20'tele'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(document.createElement('br'))%3Bdiv.appendChild(document.createElement('br'))%3Bdiv.appendChild(id)%3Bid%20%3D%20document.createElement(%22p%22)%3Bid.innerHTML%20%3D%20'Membership'%3Bvar%20idea%20%3D%20document.createAttribute('id')%3Bidea.value%20%3D%20'member'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bid%20%3D%20document.createElement(%22p%22)%3Bid.innerHTML%20%3D%20'Escape%20Battle'%3Bvar%20idea%20%3D%20document.createAttribute('id')%3Bidea.value%20%3D%20'escape'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bid%20%3D%20document.createElement(%22p%22)%3Bid.innerHTML%20%3D%20'Level%20100'%3Bvar%20idea%20%3D%20document.createAttribute('id')%3Bidea.value%20%3D%20'level'%3Bid.setAttributeNode(idea)%3Bdiv1.appendChild(id)%3Bid%20%3D%20document.createElement(%22p%22)%3Bid.innerHTML%20%3D%20'Skip%20Tutorial'%3Bvar%20idea%20%3D%20document.createAttribute('id')%3Bidea.value%20%3D%20'tut'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bid%20%3D%20document.createElement(%22p%22)%3Bid.innerHTML%20%3D%20'Lots%20of%20Gold'%3Bvar%20idea%20%3D%20document.createAttribute('id')%3Bidea.value%20%3D%20'greed'%3Bid.setAttributeNode(idea)%3Bdiv1.appendChild(id)%3Bid%20%3D%20document.createElement(%22p%22)%3Bid.innerHTML%20%3D%20'99%20Conjure%20Cubes'%3Bvar%20idea%20%3D%20document.createAttribute('id')%3Bidea.value%20%3D%20'conjure'%3Bid.setAttributeNode(idea)%3Bdiv1.appendChild(id)%3Bid%20%3D%20document.createElement(%22p%22)%3Bid.innerHTML%20%3D%20'Get%20All%20Items'%3Bvar%20idea%20%3D%20document.createAttribute('id')%3Bidea.value%20%3D%20'items'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bid%20%3D%20document.createElement(%22p%22)%3Bid.innerHTML%20%3D%20'Speed%20Up%20x10'%3Bvar%20idea%20%3D%20document.createAttribute('id')%3Bidea.value%20%3D%20'sped'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bid%20%3D%20document.createElement(%22p%22)%3Bid.innerHTML%20%3D%20'Normal%20Speed'%3Bvar%20idea%20%3D%20document.createAttribute('id')%3Bidea.value%20%3D%20'notsped'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bid%20%3D%20document.createElement(%22p%22)%3Bid.innerHTML%20%3D%20'Insta%20Kill'%3Bvar%20idea%20%3D%20document.createAttribute('id')%3Bidea.value%20%3D%20'instakill'%3Bid.setAttributeNode(idea)%3Bdiv1.appendChild(id)%3Bid%20%3D%20document.createElement(%22p%22)%3Bid.innerHTML%20%3D%20'Get%20all%20Pets'%3Bvar%20idea%20%3D%20document.createAttribute('id')%3Bidea.value%20%3D%20'pets'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bid%20%3D%20document.createElement(%22p%22)%3Bid.innerHTML%20%3D%20'Stats%20SubMenu'%3Bvar%20idea%20%3D%20document.createAttribute('id')%3Bidea.value%20%3D%20'sub'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bid%20%3D%20document.createElement(%22p%22)%3Bid.innerHTML%20%3D%20'Unlock%20all%20Zones'%3Bvar%20idea%20%3D%20document.createAttribute('id')%3Bidea.value%20%3D%20'zones'%3Bid.setAttributeNode(idea)%3Bdiv.appendChild(id)%3Bid%20%3D%20document.createElement(%22p%22)%3Bid.innerHTML%20%3D%20'Max%20Battle%20Energy%20'%3Bvar%20idea%20%3D%20document.createAttribute('id')%3Bidea.value%20%3D%20'hype'%3Bid.setAttributeNode(idea)%3Bdiv1.appendChild(id)%3Bvar%20e%20%3D%20document.createElement(%22input%22)%3Bvar%20a%20%3D%20document.createTextNode(%22Cheat%20Menu%22)%3Bvar%20body%20%3D%20document.getElementsByTagName(%22body%22)%3Be.appendChild(a)%3Ba%20%3D%20document.createAttribute('style')%3Ba.value%20%3D%20'position%3A%20absolute%3B%20z-index%3A%2010%3B%20width%3A%2050px%3B%20height%3A%2050px%3B'%3Be.setAttributeNode(a)%3Ba%20%3D%20document.createAttribute('type')%3Ba.value%20%3D%20'image'%3Be.setAttributeNode(a)%3Ba%20%3D%20document.createAttribute('src')%3Ba.value%20%3D%20'https%3A%2F%2Fplay.prodigygame.com%2Fpublic%2Fassets%2Fimages%2Fed%2F%402x%2Fed-sad%402x.png'%3Be.setAttributeNode(a)%3Ba%20%3D%20document.createAttribute('id')%3Ba.value%20%3D%20'cheatButton'%3Be.setAttributeNode(a)%3Bbody%5B0%5D.insertBefore(e%2C%20document.getElementById('game-wrapper'))%3Bdocument.getElementById(%22cheatButton%22).addEventListener(%22click%22%2C%20disp)%3Bdocument.getElementById('sub').addEventListener(%22click%22%2C%20disp1)%3Bdocument.getElementById('tele').addEventListener(%22click%22%2C%20teleport)%3Bdocument.getElementById('member'%20).addEventListener(%22click%22%2C%20member)%3Bdocument.getElementById('escape').addEventListener(%22click%22%2C%20escape)%3Bdocument.getElementById('level').addEventListener(%22click%22%2C%20level)%3Bdocument.getElementById('tut').addEventListener(%22click%22%2C%20tut)%3Bdocument.getElementById('greed').addEventListener(%22click%22%2C%20greed)%3Bdocument.getElementById('conjure').addEventListener(%22click%22%2C%20conjure)%3Bdocument.getElementById('items').addEventListener(%22click%22%2C%20item)%3Bdocument.getElementById('sped').addEventListener(%22click%22%2C%20sped)%3Bdocument.getElementById('notsped').addEventListener(%22click%22%2C%20notsped)%3Bdocument.getElementById('instakill').addEventListener(%22click%22%2C%20instakill)%3Bdocument.getElementById('pets').addEventListener(%22click%22%2C%20pets)%3Bdocument.getElementById('zones').addEventListener(%22click%22%2C%20zones)%3Bdocument.getElementById('hype').addEventListener(%22click%22%2C%20hype)%3Bfunction%20hype()%7BPIXI.game.prodigy.debugMisc.setBattleEnergy(Infinity)%3B%7Dfunction%20zones()%7BPIXI.game.prodigy.classModeController.lockedZones%3D0%3B%7Dfunction%20pets()%7BPIXI.game.prodigy.debugMisc.getAllPets()%3B%7Dfunction%20instakill()%7BPIXI.game.prodigy.player.modifiers.damage%3DInfinity%3B%7Dfunction%20sped()%7BPIXI.game.prodigy.debugMisc.setGameSpeed(10)%3B%7Dfunction%20notsped()%7BPIXI.game.prodigy.debugMisc.setGameSpeed(1)%3B%7Dfunction%20item()%7Ba%3D%5B%22outfit%22%2C%20%22hat%22%2C%20%22boots%22%2C%20%22weapon%22%2C%20%22spellRelic%22%2C%20%22fossil%22%5D%3Bfor%20(u%20of%20a)%20%7BPIXI.game.prodigy.player.backpack.data%5Bu%5D%3D%5B%5D%3Bx%20%3D%20PIXI.game.state.states.Boot._gameData%5Bu%5D%3Bfor%20(i%20in%20x)%20%7BPIXI.game.prodigy.player.backpack.data%5Bu%5D%5Bi%5D%20%3D%20%7B%22ID%22%3A%20x%5Bi%5D.ID%2C%20%22N%22%3A%201%7D%3B%7D%7DPIXI.game.prodigy.player.backpack.data.currency%3D%5B%5D%3Bx%20%3D%20PIXI.game.state.states.Boot._gameData.currency%3Bfor%20(i%20in%20x)%20%7BPIXI.game.prodigy.player.backpack.data.currency%5Bi%5D%20%3D%20%7B%22ID%22%3A%20x%5Bi%5D.ID%2C%20%22N%22%3A%2099999999%7D%3B%7DPIXI.game.prodigy.player.backpack.data.follow%3D%5B%5D%3Bx%20%3D%20PIXI.game.state.states.Boot._gameData.follow%3Bfor%20(i%20in%20x)%20%7BPIXI.game.prodigy.player.backpack.data.follow%5Bi%5D%20%3D%20%7B%22ID%22%3A%20x%5Bi%5D.ID%7D%3B%7DPIXI.game.prodigy.player.backpack.data.item%3D%5B%5D%3Bx%20%3D%20PIXI.game.state.states.Boot._gameData.item%3Bfor%20(i%20in%20x)%20%7BPIXI.game.prodigy.player.backpack.data.item%5Bi%5D%20%3D%20%7B%22ID%22%3A%20x%5Bi%5D.ID%2C%20%22N%22%3A%2099999999%7D%3B%7DPIXI.game.prodigy.player.backpack.data.item%3D%5B%5D%3Bx%20%3D%20PIXI.game.state.states.Boot._gameData.item%3Bfor%20(i%20in%20x)%20%7BPIXI.game.prodigy.player.backpack.data.item%5Bi%5D%20%3D%20%7B%22ID%22%3A%20x%5Bi%5D.ID%2C%20%22N%22%3A%2099999999%7D%3B%7D%7Dfunction%20conjure()%7BPIXI.game.prodigy.debugMisc.getCubes(99)%3BPIXI.game.prodigy.create.conjureCubeButton()%3B%7Dfunction%20greed()%7BPIXI.game.prodigy.game.prodigy.debugMisc.getGold(Infinity)%3B%7Dfunction%20tut()%7BPIXI.game.prodigy.debugQuests.completeTutorial()%3B%7Dfunction%20level()%7BPIXI.game.prodigy.debugMisc.setLevel(100)%3B%7Dfunction%20member()%7BPIXI.game.prodigy.player.it%3Dtrue%3B%7Dfunction%20escape()%7BPIXI.game.prodigy.debugMisc.escapeBattle()%3B%7Dfunction%20teleport()%7Bwindow.addEventListener('keydown'%2C%20(event)%20%3D%3E%20%7BPIXI.game.prodigy.user.x%3DPIXI.game.input.mousePointer.position.x%3BPIXI.game.prodigy.user.y%3DPIXI.game.input.mousePointer.position.y%3B%7D)%3B%7Dfunction%20disp1()%7Bdocument.getElementById('submenu').classList.toggle(%22hide%22)%3B%7Dfunction%20disp()%7Bif(document.getElementById('submenu').classList.value%20!%3D%20%22hide%22)%7Bdocument.getElementById('submenu').classList.toggle(%22hide%22)%3B%7Ddocument.getElementById('menu').classList.toggle(%22hide%22)%3B%7D%7D)()
