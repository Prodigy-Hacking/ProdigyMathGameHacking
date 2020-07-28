define(["require", "exports", "../index", "../utils/swal", "../utils/util", "../utils/util"], function (require, exports, index_1, swal_1, util_1, util_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new index_1.Hack(index_1.category.location, "Teleport To Map (interactive)").setClick(async () => {
        const radioPopup = swal_1.Swal.mixin({
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                return document
                    .querySelector(`.radioDiv[checked]`)
                    ?.getAttribute("zone");
            },
        });
        const container = document.createElement("div");
        container.classList.add("radioContainer");
        for (const zone of Object.keys(util_2.prodigy.world.zones)) {
            const radio = document.createElement("DIV");
            radio.classList.add("radioDiv");
            radio.setAttribute("zone", zone);
            const locationURL = util_1.locations[zone];
            if (locationURL)
                radio.style.backgroundImage = `url(${locationURL})`;
            else
                radio.innerText = zone;
            radio.onclick = () => {
                document
                    .querySelectorAll(`.radioDiv[checked]`)
                    .forEach(x => x.removeAttribute("checked"));
                radio.setAttribute("checked", "");
            };
            container.append(radio);
        }
        const zone = await radioPopup.fire({
            title: "Teleport Zone",
            html: container,
            customClass: {
                popup: "radioSwal",
            },
        });
        if (!zone.value)
            return;
        const mapList = Object.keys(util_2.prodigy.world.zones[zone.value].maps);
        const area = await swal_1.Swal.fire({
            input: "select",
            inputOptions: new Map(mapList.map(x => [x, x])),
            title: "Map",
            text: "Which map in the zone do you want to teleport to?",
        });
        if (!area.value)
            return;
        util_2.prodigy.world.O(`${zone.value}-${area.value}`);
        await swal_1.Toast.fire("Teleported", "You have been teleported!", "success");
    });
});
/*
new Hack(category.location, "Teleport To Dark Tower Floor").setClick(
    async () => {
        const floor = await NumberInput.fire(
            "Dark Tower Floor",
            "What floor do you want to teleport to?",
            "question"
        );
        if (floor.value === undefined) return;
        prodigy.debugMisc.tpTowerFloor(+floor.value);
        await Toast.fire(
            "Success!",
            "You have been teleport to the requested floor."
        );
    }
);

new Hack(
    category.location,
    "Unlock All Zones (school)",
    "Unlocks all the zones that are locked in school."
).setClick(async () => {
    prodigy.classModeController.lockedZones = 0;
    await Toast.fire("Success!", "All zones are now unlocked that were locked in school.", "success")
});
*/
//# sourceMappingURL=location.js.map