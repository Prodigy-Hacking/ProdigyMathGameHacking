setInterval(_ => {
    fetch(
        ("https://api.prodigygame.com/leaderboard-api/season/" + _.instance.prodigy.gameContainer.get("293-6cb0").seasonID + "/user/" + _.player.userID + "/pvp?userID=" + _.player.userID), {
            headers: {
                "authorization": ("Bearer " + _.network.jwtAuthProvider.getToken()),
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-fetch-mode": "cors"
            },
            referrer: "https://play.prodigygame.com/",
            referrerPolicy: "no-referrer-when-downgrade",
            body: ("seasonID=" + _.instance.prodigy.gameContainer.get("293-6cb0").seasonID + "&action=win"),
            method: "POST",
            mode: "cors"
        }).then(v => v.text()).then(v => console.log(v))
}, 60500);
