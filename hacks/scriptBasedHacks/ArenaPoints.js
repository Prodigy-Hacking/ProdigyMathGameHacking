function parseJwt(token) {
    var base64 = token.split(".")[1];
    var jsonPayload = atob(base64);
    return JSON.parse(jsonPayload);
};

let userID = parseJwt(localStorage.JWT_TOKEN).content.userID
let arenaseason = await (await fetch(`https://api.prodigygame.com/leaderboard-api/user/${userID}/init?userID=${userID}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
        'Authorization': localStorage.JWT_TOKEN,
    },
})).json();
arenaseason = arenaseason.seasonID;

setInterval(_ => {
    fetch(("https://api.prodigygame.com/leaderboard-api/season/" + arenaseason + "/user/" + userID + "/pvp?userID=" + userID), {
        headers: {
            "authorization": localStorage.JWT_TOKEN,
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-fetch-mode": "cors"
        },
        referrer: "https://play.prodigygame.com/",
        referrerPolicy: "no-referrer-when-downgrade",
        body: ("seasonID=" + arenaseason + "&action=win"),
        method: "POST",
        mode: "cors"
    }).then(v => v.text()).then(v => console.log(v))
}, 60500);
