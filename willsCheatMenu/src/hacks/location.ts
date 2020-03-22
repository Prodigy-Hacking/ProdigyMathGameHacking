import { Hack, category } from "../index";
import { Swal, Input, Toast, NumberInput } from "../utils/swal";
import { gameData, locations } from "../utils/util";
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
		for (const zone of Object.keys(PIXI.game.prodigy.world.zones)) {
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
			PIXI.game.prodigy.world.zones[zone.value].maps
		);
		const area = await Swal.fire({
			input: "select",
			inputOptions: Object.fromEntries(mapList.map(x => [x, x])),
			title: "Map",
			text: "Which map in the zone do you want to teleport to?"
		});
		if (!area.value) return;
		PIXI.game.prodigy.world.$(`${zone.value}-${area.value}`);
		await Toast.fire("Teleported", "You have been teleported!", "success")
	}
);
new Hack(category.location, "Teleport To Dark Tower Floor").setClick(async() => {
	const floor = await NumberInput.fire("Dark Tower Floor", "What floor do you want to teleport to?", "question");
	if (floor.value === undefined) return;
	PIXI.game.prodigy.debugMisc.tpTowerFloor(+floor.value);
	await Toast.fire("Success!", "You have been teleport to the requested floor.")
})