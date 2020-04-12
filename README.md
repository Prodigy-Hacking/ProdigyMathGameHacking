# Prodigy Math Game Hacks

## How to bypass anti-cheat (as of 4/12/2020)
***https://drive.google.com/file/d/1qlqIlB9URPvUMq40gf9c8s0zDS2a8MTY/view?usp=sharing***

Finally, an instructional video!
* First script: `with(console){log=dir=clear=()=>{}}` (Remember, it’s the bookmarklet.)
* Second script: `{f:sprintf}`
* Third and final script: `temp1.object.n.c[0].exports.a.instance.prodigy`  
* Bookmarklet website: https://caiorss.github.io/bookmarklet-maker/

Ok, that’s done. Exploits:
```
temp2.debugMisc.getAllPets() - Gives player all pets
temp2.player.it=true - Free membership
temp2.debugMisc.tpTowerFloor(100) - Teleports you to the last floor of the dark tower.
temp2.debugMisc.setLevel(100) - Sets your level to 100.
temp2.debugMisc.smallLoan(1000000000) - Gives you 1B gold.
temp2.debugMisc.setBattleEnergy(10) - Fills your energy in battle (ONLY USABLE IN BATTLE)

for (let PetLoopTest = 0; PetLoopTest < temp2.player.kennel.data.length; PetLoopTest++) { temp2.player.kennel.data[PetLoopTest].level=100 };
// Levels all pets to Level 100.
```
### Remeber to only use these AFTER you have completed the procedure in the video!
More to come!
# Links

-   **[Wiki](https://github.com/PatheticMustan/ProdigyMathGameHacking/wiki)**
-   **[DIY!](https://github.com/PatheticMustan/ProdigyMathGameHacking/issues/25)**
-   **[Discord](https://discord.gg/9cKMgMv)**
-   **[Cheat Dashboard](https://prodigy-cheat-dashboard.herokuapp.com/)**

## Collaborators

-   [PatheticMustan](https://github.com/PatheticMustan)
-   [Avn1114](https://github.com/Avn1114)
-   [Magmischief](https://github.com/Magmischief)
-   [RubberDuck55](https://github.com/RubberDuck55)
-   [TNThacker2015 (will)](https://github.com/TNThacker2015)
-   [LeoTheW12-4RD](https://github.com/LeoTheW12-4RD)

# Announcements


#### Notice: We are NOT trying to ruin Prodigy Math Game.

This may look like we're trying to ruin the game, but we're helping make it better. By finding exploits, we help the developers find that there is an exploit, and the developers fix it, overall helping the game. Anyone who claims that we are 'malicious' or 'ruining the game', are wrong. Please don't spread misinformation.

## We have surpassed 100k views and over 6.4k unique viewers!

Thank all of you for making this happen.

# Hacking Prodigy, the Math Game

I'm making this repository to try to get the developers to change how Prodigy handles player game data. Instead of handling everything server side, a lot of the heavy lifting is done on the player side. The server just manages multiplayer battles, and hosts data, messages, and events.

Basically any changes you make to Phaser.GAMES[0].state.states.Login.\_gameObj.player will save. Be warned, if you mess up the data TOO much, the server gets really confused, and your account is broken forever! Don't do this on your main account. I've already broken three accounts. ;)

## All Hacks In This Github Repository Is Licensed With Mozilla Public License v2

We are **NOT** liable for **_any_** damages.

> 7. Limitation of Liability
>    Under no circumstances and under no legal theory, whether tort (including negligence), contract, or otherwise, shall any Contributor, or anyone who distributes Covered Software as permitted above, be liable to You for any direct, indirect, special, incidental, or consequential damages of any character including, without limitation, damages for lost profits, loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses, even if such party shall have been informed of the possibility of such damages. This limitation of liability shall not apply to liability for death or personal injury resulting from such party’s negligence to the extent applicable law prohibits such limitation. Some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages, so this exclusion and limitation may not apply to You.

-   Mozilla Public License v2

# Disclaimer

THESE HACKS MAY OR MAY NOT BREAK YOUR ACCOUNT. DO NOT USE ANY OF THESE HACKS ON YOUR MAIN ACCOUNT, OR YOU MAY RISK YOUR ACCOUNT BECOMING IRREPERABLY BUGGED OUT, PREVENTING YOU FROM PLAYING THE GAME USING THAT ACCOUNT.
You have been warned.

# Usage

Use the command Control+Shift+I to access the console. Paste the code into the console. It's that simple.

You can also use the bookmarklet way by going to https://caiorss.github.io/bookmarklet-maker/ and pasting the code into the big box then by clicking generate you covert the code to a bookmarklet so then go to the output box and copy the converted code and save it as a bookmark and go to prodigy and excute the script by clicking on it. It's that simple.

Any questions? Join our [Discord](https://discord.gg/9cKMgMv)!

Documentation: [Docs](./docs/interfaces/_pixi_d_.pixi.md)
