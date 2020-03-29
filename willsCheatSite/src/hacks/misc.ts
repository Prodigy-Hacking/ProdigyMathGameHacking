import { Swal, Toast, NumberInput, Confirm } from "../utils/swal";
import { Hack, category, Toggler } from "../index";
import _ from "lodash";
import { getBigData, updateUser, getGameData } from "../utils/api";
(async () => {
	const gameData = await getGameData();
	new Hack(category.misc, "Bobbify", "Converts your account into Bobby Fancywoman.").setClick(async () => {
		if (
			!(
				await Confirm.fire(
					"Are you sure you want your account to be turned into Bobby Fancywoman?",
					"This action is not reversable."
				)
			).value
		)
			return;
		const bigData = await getBigData();
		if (!bigData) return;
		bigData.appearance.name.nick = null;
		bigData.appearance.name.first = 44;
		bigData.appearance.name.middle = 754;
		bigData.appearance.name.last = 882;
		bigData.data.stars = -1e22;
		bigData.data.level = 69;
		bigData.appearance.gender = "male";
		bigData.appearance.eyeColor = 1;
		bigData.appearance.face = 4;
		bigData.appearance.hair.color = 1;
		bigData.appearance.hair.style = 19;
		bigData.appearance.skinColor = 1;
		bigData.equipment.follow = 19;
		bigData.equipment.hat = 19;
		bigData.equipment.boots = 19;
		bigData.equipment.outfit = 19;
		bigData.equipment.weapon = 19;
		await updateUser({ equipment: bigData.equipment, appearance: bigData.appearance });
		await Toast.fire("Bobbified!", "You are now Bobby Fancywoman.", "success");
	});
})();
