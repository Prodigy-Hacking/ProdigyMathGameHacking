module.exports = {
    getPlayerData: async function(){
        const parseJWT = require('./parsetoken').parseJWT
let userID = parseJWT(localStorage.JWT_TOKEN).content.userID
await (await fetch(`https://api.prodigygame.com/game-api/v1/character/${userID}?isMember=0&userID=${userID}`, {
    method: 'GET',
    credentials: 'same-origin', 
    headers: {
        'Authorization' : localStorage.JWT_TOKEN,
        
    },
})).json()
    }
}