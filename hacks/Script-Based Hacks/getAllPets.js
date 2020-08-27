function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

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
let petdata = await (await fetch('https://cdn.prodigygame.com/game/data/dev/data.json')).json();
playerdata.pets = []
for (i = 0; i < petdata.pet.length; i++) {
let pet = {
ID : petdata.pet[i].ID,
catchDate: Date.now(),
levelCaught: 1,
Level: 1e+69,
foreignSpells: [petdata.pet[i].data.foreignSpellPools[0][0],petdata.pet[i].data.foreignSpellPools[1][0]]
}
playerdata.pets.push(pet)
}
await (await fetch(`https://api.prodigygame.com/game-cortex-server/v3/characters/${userID}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
    "content-type": "application/json",
        'Authorization': localStorage.JWT_TOKEN,
    },
body: JSON.stringify({
            userID: userID,
data: JSON.stringify(playerdata)
        }), 
})).text();