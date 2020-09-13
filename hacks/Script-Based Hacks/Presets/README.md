# Since that these hacks are stored from a particular datafile, you can use any data you want!
## Because of this, you can load your data, using the below script:
```js
function parseJwt(token){var base64Url=token.split('.')[1];var base64=base64Url.replace(/-/g,'+').replace(/_/g,'/');var jsonPayload=decodeURIComponent(atob(base64).split('').map(function(c){return'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)}).join(''));return JSON.parse(jsonPayload)};let userID=parseJwt(localStorage.JWT_TOKEN).content.userID
let playerdata=await(await fetch(`https://api.prodigygame.com/game-api/v1/character/${userID}?isMember=0&userID=${userID}`,{method:'GET',credentials:'same-origin',headers:{'Authorization':localStorage.JWT_TOKEN,},})).json();console.log(JSON.stringify(playerdata))
```
## So if you have an account that is already hacked, you can submit a preset in a pull request, and other people will be able to get your inventory, pets, level, stars, and more!

## To use a preset: 
#### Go to your selected preset file
#### Click the "raw" button, it should take you to a plain text file.
#### Copy and paste the code below into your Chrome console on Prodigy:
```js
let data=await(await fetch(prompt('Put your URL below:'))).json();function parseJwt(token){var base64Url=token.split('.')[1];var base64=base64Url.replace(/-/g,'+').replace(/_/g,'/');var jsonPayload=decodeURIComponent(atob(base64).split('').map(function(c){return'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)}).join(''));return JSON.parse(jsonPayload)};let userID=parseJwt(localStorage.JWT_TOKEN).content.userID
await(await fetch(`https://api.prodigygame.com/game-cortex-server/v3/characters/${userID}`,{method:'POST',credentials:'same-origin',headers:{"content-type":"application/json",'Authorization':localStorage.JWT_TOKEN,},body:JSON.stringify({userID:userID,data:JSON.stringify(data)}),})).text()
```
#### Copy and paste the raw text file URL into the resulting box that appears.
#### Reload your page.

### Note: This also contains their look, so you will have to change your avatar to your desired look.