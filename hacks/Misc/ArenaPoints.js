// unminified
setInterval(_ => {
    fetch(
        (
            "https://api.prodigygame.com/leaderboard-api/season/" + 
            hack.instance.prodigy.gameContainer.get("PVPNetworkHandler").seasonID +
            "/user/" + 
            hack.instance.prodigy.player.userID + 
            "/pvp?userID=" + 
            hack.instance.prodigy.player.userID
        ),
        
        {
            headers: {
                "authorization": (
                    "Bearer " + 
                    hack.instance.prodigy.gameContainer.get("NetworkManager").jwtAuthProvider.getToken()
                ),
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-fetch-mode": "cors"
            },

            referrer: "https://play.prodigygame.com/",
            referrerPolicy: "no-referrer-when-downgrade",
            body: (
                "seasonID=" +
                hack.instance.prodigy.gameContainer.get("PVPNetworkHandler").seasonID + 
                "&action=win"
            ),
            method: "POST",
            mode: "cors"
        }
    ).then(v => console.log(v.text()))
}, 60100);
