module.exports = {
    modifyData: async function(data){
        const parseJWT = require('./parsetoken').parseJWT
let userID = parseJWT(localStorage.JWT_TOKEN).content.userID
let playerdata = await (await fetch(`https://api.prodigygame.com/game-api/v1/character/${userID}?isMember=0&userID=${userID}`, {
    method: 'GET',
    credentials: 'same-origin', 
    headers: {
        'Authorization' : localStorage.JWT_TOKEN,
        
    },
})).json()

        eval(data)
        // Uses eval so index doesn't try to predefine data
        const moddedData = playerdata
        await (await fetch(`https://api.prodigygame.com/game-cortex-server/v3/characters/${userID}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
        "content-type": "application/json",
            'Authorization': localStorage.JWT_TOKEN,
        },
    body: JSON.stringify({
                userID: userID,
    data: JSON.stringify(moddedData)
            }), 
    })).text();
    }
}