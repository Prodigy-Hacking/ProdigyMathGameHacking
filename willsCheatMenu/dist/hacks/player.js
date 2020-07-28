define(["require", "exports", "../utils/swal", "../index", "../utils/util", "../utils/util"], function (require, exports, swal_1, index_1, util_1, util_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new index_1.Hack(index_1.category.player, "Set Gold").setClick(async () => {
        const gold = await swal_1.NumberInput.fire("Gold Amount", "What number do you want to set your gold to?", "question");
        if (gold.value === undefined)
            return;
        hack.player.data.gold = +gold.value;
        util_1.savePlayer();
        await swal_1.Toast.fire("Success!", "The gold amount has been set.", "success");
    });
    new index_1.Hack(index_1.category.player, "Set Level").setClick(async () => {
        const level = await swal_1.NumberInput.fire("Level", "What number do you want to set your level to?", "question");
        if (level.value === undefined)
            return;
        hack.player.data.level = +level.value;
        hack.player.getLevel = () => hack.player.data.level;
        util_1.savePlayer();
        await swal_1.Toast.fire("Success!", "The level of your player has been set.", "success");
    });
    new index_1.Hack(index_1.category.player, "Set Bounty Points").setClick(async () => {
        const points = await swal_1.NumberInput.fire("Bounty Points", "What number do you want to set your bounty points to?", "question");
        if (points.value === undefined)
            return;
        hack.player.data.bountyScore = +points.value;
        util_1.savePlayer();
        await swal_1.Toast.fire("Success!", "The bounty points has been set.", "success");
    });
    new index_1.Hack(index_1.category.player, "Obtain Conjure Cubes").setClick(async () => {
        const cubes = await swal_1.NumberInput.fire("Conjure Cubes", "How many conjure cubes do you want to get?", "question");
        if (cubes.value === undefined)
            return;
        for (let i = 0; i < Math.min(99, +cubes.value); i++)
            util_2.prodigy.giftBoxController.receiveGiftBox(null, util_1.getItem("giftBox", 1));
        util_1.savePlayer();
        await swal_1.Toast.fire("Success!", "You have obtained the requested conjure cubes.", "success");
    });
    new index_1.Hack(index_1.category.player, "Membership").setClick(async () => {
        hack.player.P = true;
        util_1.savePlayer();
        await swal_1.Toast.fire("Success!", "Membership is now enabled!", "success");
    });
    new index_1.Hack(index_1.category.player, "Instant Kill").setClick(async () => {
        hack.player.modifiers.damage = util_1.VERY_LARGE_NUMBER;
        util_1.savePlayer();
        await swal_1.Toast.fire("Success!", "Instant kill is now enabled!", "success");
    });
    new index_1.Hack(index_1.category.player, "PVP Health").setClick(async () => {
        hack.player.pvpHP = util_1.VERY_LARGE_NUMBER;
        hack.player.getMaxHearts = () => util_1.VERY_LARGE_NUMBER;
        await swal_1.Toast.fire("Success!", "You now have lots of health!", "success");
    });
    /*
    
    let interval: unknown | null = null;
    
    new Hack(category.player, "Arena Point Increaser").setClick(async () => {
        if (interval)
            return Swal.fire(
                "Already Enabled",
                "Arena Point Increaser is already enabled.",
                "error"
            );
        interval = setInterval(async () => {
            const data = await (
                await fetch(
                    `https://api.prodigygame.com/leaderboard-api/season/${prodigy.pvpNetworkHandler.seasonID}/user/${hack.player.userID}/pvp?userID=${hack.player.userID}`,
                    {
                        headers: {
                            authorization: `Bearer ${prodigy.network.jwtAuthProvider.getToken()}`,
                            "content-type":
                                "application/x-www-form-urlencoded; charset=UTF-8",
                        },
                        body: `seasonID=${prodigy.pvpNetworkHandler.seasonID}&action=win`,
                        method: "POST",
                        mode: "cors",
                    }
                )
            ).text();
            if (data !== "") {
                const jsoned: {
                    points: number;
                    weeklyPoints: number;
                    modifiedDate: string;
                    seasonID: number;
                    numMatches: number;
                } = JSON.parse(data);
                console.log(`[API] ${jsoned.points} Points (+100)`);
            } else console.log(`[API] Failed to add points.`);
        }, 60500);
        await Swal.fire("Enabled", "Arena Point Increaser has been enabled.", "success");
    });
    */
    new index_1.Hack(index_1.category.player, "Change Name", "Change the name of your wizard.").setClick(async () => {
        const names = util_1.gameData.name;
        const div = document.createElement("div");
        const createSelect = (arr, func) => {
            const select = document.createElement("select");
            select.classList.add("selectName");
            for (const opt of arr.entries()) {
                const optt = document.createElement("option");
                optt.value = opt[0];
                optt.innerText = opt[1];
                if (func(optt.value))
                    optt.selected = true;
                select.options.add(optt);
            }
            return select;
        };
        const nameSelect = (type, func) => createSelect(new Map(names.filter(x => x.data.type === type).map(x => [x.ID.toString(), x.name])), val => func(+val));
        div.append(nameSelect(0, x => x === hack.player.name.data.firstName));
        div.append(nameSelect(1, x => x === hack.player.name.data.middleName));
        div.append(nameSelect(2, x => x === hack.player.name.data.lastName));
        div.append(createSelect(new Map([["null", "[none]"]].concat(util_1.gameData.nickname.map(x => [x.ID.toString(), x.name]))), x => +x === hack.player.name.data.nickname || String(hack.player.name.data.nickname) === x));
        const name = await swal_1.Swal.fire({
            title: "Set Player Name",
            focusConfirm: false,
            showCancelButton: true,
            html: div,
            preConfirm: () => {
                return Array.prototype.slice
                    .call(document.querySelectorAll(`.selectName`))
                    .map((x) => x.options[x.selectedIndex].value);
            },
        });
        if (name.value === undefined)
            return;
        if (name.value[3] === "null")
            name.value[3] = null;
        [
            hack.player.name.data.firstName,
            hack.player.name.data.middleName,
            hack.player.name.data.lastName,
            hack.player.name.data.nickname,
        ] = name.value.map(x => x && +x);
        await swal_1.Toast.fire("Name Changed!", "Your name was successfully changed.", "success");
    });
});
//# sourceMappingURL=player.js.map