//> Arena point hack
//>> Gives you arena points
//> Arena point hack
//>> Gives you arena points
setInterval(_ => {
   fetch(
        (
            "https://api.prodigygame.com/leaderboard-api/season/" + 
            hack.instance.prodigy.gameContainer.get("70a-429f").seasonID +
            "/user/" + 
            hack.player.userID + 
            "/pvp?userID=" + 
            hack.player.userID
        ),
        
        {
            headers: {
                "authorization": (
                    "Bearer " + 
                    hack.network.jwtAuthProvider.getToken()
                ),
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-fetch-mode": "cors"
            },

            referrer: "https://play.prodigygame.com/",
            referrerPolicy: "no-referrer-when-downgrade",
            body: (
                "seasonID=" +
                hack.instance.prodigy.gameContainer.get("70a-429f").seasonID + 
                "&action=win"
            ),
            method: "POST",
            mode: "cors"
        }
    )
    .then(v => v.text())
    .then(v => console.log(v))
}, 60500);
