function parseJwt(token) {
    var base64 = token.split(".")[1];
    var jsonPayload = atob(base64);
    return JSON.parse(jsonPayload);
};
let userID = parseJwt(localStorage.JWT_TOKEN).content.userID
let playerdata = await (await fetch(`https://api.prodigygame.com/game-api/v1/character/${userID}?isMember=0&userID=${userID}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
        'Authorization' : localStorage.JWT_TOKEN,
        
    },
})).json();
playerdata.data.level = 100

await fetch(`https://api.prodigygame.com/game-api/v3/characters/${userID}`, {
    headers: {
        "Authorization": localStorage.JWT_TOKEN
    }, 
    body: JSON.stringify({
        data: JSON.stringify(playerdata),
        userID: userID
    }),
    method: "POST"
})
