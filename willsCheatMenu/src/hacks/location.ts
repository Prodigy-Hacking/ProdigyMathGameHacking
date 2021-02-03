import { Hack, category } from "../index";
import { Swal, Input, Toast, NumberInput } from "../utils/swal";
import { gameData, locations } from "../utils/util";
import { prodigy, game } from "../utils/util";
new Hack(category.location, "Teleport To Map (interactive)").setClick(
	async () => {
		const radioPopup = Swal.mixin({
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
		for (const zone of Object.keys(prodigy.world.zones)) {
			const radio = document.createElement("DIV");
			radio.classList.add("radioDiv");
			radio.setAttribute("zone", zone);
			const locationURL = locations[zone as keyof typeof locations];
			if (locationURL)
				radio.style.backgroundImage = `url(${locationURL})`;
			else radio.innerText = zone;
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
		if (!zone.value) return;
		const mapList = Object.keys(
			prodigy.world.zones[zone.value].maps
		);
		const area = await Swal.fire({
			input: "select",
			inputOptions: new Map(mapList.map(x => [x, x])),
			title: "Map",
			text: "Which map in the zone do you want to teleport to?",
		});
		if (!area.value) return;
		prodigy.world.zones[zone.value].teleport(area.value);
		await Toast.fire("Teleported", "You have been teleported!", "success");
	}
);

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
