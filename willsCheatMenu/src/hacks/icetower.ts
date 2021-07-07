//@ts-nocheck
import { Swal, Toast, NumberInput, Input, Confirm } from "../utils/swal";
import { Hack, category } from "../index";
import { VERY_LARGE_NUMBER, gameData, pickRandom } from "../utils/util";
import { TODO } from "../../../typings/util";
import { prodigy, game } from "../utils/util";


new Hack(category.icetower, "Fix Ice Keystone").setClick(async () => {
	_.instance.prodigy.world.zones.icetower._towerData.enabled = true
_.instance.prodigy.world.zones.icetower.update()
	await Toast.fire("Success!", "Ice Keystone has been fixed.", "success");
});
