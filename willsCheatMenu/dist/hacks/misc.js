define(["require", "exports", "../utils/swal", "../index", "../utils/util", "../utils/util"], function (require, exports, swal_1, index_1, util_1, util_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new index_1.Hack(index_1.category.misc, "Skip Tutorial").setClick(async () => {
        hack.functions.completeTutorial();
    });
    /*
    new Hack(category.misc, "Disable Timeout Dialog").setClick(async () => {
        prodigy.debugMisc.disableTimeoutDialogue();
    });
    */
    let viber = null;
    new index_1.Toggler(index_1.category.misc, "Clothing Vibe")
        .setEnabled(async () => {
        viber = window.setInterval(() => {
            const rand = (arr) => util_1.pickRandom(arr).ID;
            hack.player.equipment.setOutfit(rand(util_1.gameData.outfit));
            hack.player.equipment.setBoots(rand(util_1.gameData.boots));
            hack.player.equipment.setHat(rand(util_1.gameData.hat));
            util_2.prodigy.user.reload();
        }, 1000);
    })
        .setDisabled(() => {
        if (viber)
            clearInterval(viber);
    });
    new index_1.Hack(index_1.category.misc, "Bobbify", "Converts your account into Bobby Fancywoman.").setClick(async () => {
        if (!(await swal_1.Confirm.fire("Are you sure you want your account to be turned into Bobby Fancywoman?", "This action is not reversable.")).value)
            return;
        // prodigy.debugQuests.completeTutorial();
        hack.player.name.data.nickname = null;
        hack.player.name.data.firstName = 44;
        hack.player.name.data.middleName = 754;
        hack.player.name.data.lastName = 882;
        hack.player.data.stars = -1e22;
        hack.player.data.level = 69;
        hack.player.forceSaveCharacter();
        hack.player.appearance.setGender("male");
        hack.player.appearance.setEyeColor(1);
        hack.player.appearance.setFace(4);
        hack.player.appearance.setHair(19, 1);
        hack.player.appearance.setSkinColor(1);
        hack.player.equipment.setFollow(19);
        hack.player.equipment.setHat(19);
        hack.player.equipment.setBoots(19);
        hack.player.equipment.setOutfit(19);
        hack.player.equipment.setWeapon(19);
        hack.player.forceSaveCharacter();
        await swal_1.Toast.fire("Bobbified!", "You are now Bobby Fancywoman.", "success");
    });
    let snowball = [];
    new index_1.Toggler(index_1.category.misc, "Snowball Crasher", "Crash everyone's game near you with snowballs.")
        .setEnabled(async () => {
        for (let i = 0; i < 10000; i++)
            snowball.push(setInterval(() => hack.network.emitMessage({
                action: "fx",
                data: {
                    type: 3 + i % 2,
                    userID: hack.player.userID,
                    x: Math.floor(Math.random() * 1280),
                    y: Math.floor(Math.random() * 720),
                },
            })));
        console.log(snowball);
    })
        .setDisabled(async () => snowball.map(clearInterval));
});
//# sourceMappingURL=misc.js.map