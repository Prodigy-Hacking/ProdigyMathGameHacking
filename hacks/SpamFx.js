//ALL SCRIPTS APPEAR FOR OTHER USERS


//Spew confetti. Doesn't crash users:
setInterval(function(){
Phaser.GAMES[0].prodigy.network.emitMessage({action:"fx",data:{type:1, userID: Phaser.GAMES[0].prodigy.player.userID}})
},10);

//Spew fireworks. Doesn't crash users:
setInterval(function(){
Phaser.GAMES[0].prodigy.network.emitMessage({action:"fx",data:{type:2, userID: Phaser.GAMES[0].prodigy.player.userID}})
},10);


/*CREDIT*/
/*DaChickenKing | Did research on the SocketInterface in the Discord Server
TNTHacker2015 | Made base FX script, rest of scripts we're just changing type to a different value
*/
