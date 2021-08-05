// @ts-nocheck
import { Toast } from "../utils/swal";
import { Hack, category } from "../index";
import { _ } from "../utils/util";

new Hack(category.icetower, "Fix Ice Keystone").setClick(async () => {
	_.instance.prodigy.world.zones.icetower._towerData.enabled = true;
	_.instance.prodigy.world.zones.icetower.update();
	await Toast.fire("Success!", "Ice Keystone has been fixed.", "success");
});
