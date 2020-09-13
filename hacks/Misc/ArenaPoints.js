//> Arena point hack
//>> Gives you arena points every minute, DO NOT RUN THIS MORE THAN ONCE, IT WILL RUN ON ITS OWN.
setInterval(_ => {
   //> Arena point hack
//>> Gives you arena points every minute, DO NOT RUN THIS MORE THAN ONCE, IT WILL RUN ON ITS OWN.
   fetch(
        (
            "https://api.prodigygame.com/leaderboard-api/season/" + 
            hack.instance.prodigy.gameContainer.get("e25-36e7").seasonID +
            "/user/" + 
            hack.player.userID + 
            "/pvp?userID=" + 
            hack.player.userID
        ),
        
        {
            headers: {
                "authorization": (
                    "Bearer " + 
hack.instance.prodigy.gameContainer.get('464-72c6').jwtAuthProvider.getToken()
                ),
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-fetch-mode": "cors"
            },

            referrer: "https://play.prodigygame.com/",
            referrerPolicy: "no-referrer-when-downgrade",
            body: (
                "seasonID=" +
                hack.instance.prodigy.gameContainer.get("e25-36e7").seasonID + 
                "&action=win"
            ),
            method: "POST",
            mode: "cors"
        }
    )
    .then(v => v.text())
    .then(v => console.log(v))
}, 60500);
