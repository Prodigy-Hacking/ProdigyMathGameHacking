// @ts-nocheck
import { Toast } from "../utils/swal";
import { Hack, category } from "../index";
import { _ } from "../utils/util";

new Hack(category.icetower, "Fix Ice Keystone").setClick(async () => {
	_.instance.prodigy.world.zones.icetower._towerData.enabled = true;
	_.instance.prodigy.world.zones.icetower.update();
	await Toast.fire("Success!", "Ice Keystone has been fixed.", "success");
});
new Hack(category.icetower, "Fix Storm Keystone").setClick(async () => {
	_.instance.prodigy.world.zones.stormtower._towerData.enabled = true;
	_.instance.prodigy.world.zones.stormtower.update();
	await Toast.fire("Success!", "Storm Keystone has been fixed.", "success");
});
new Hack(category.icetower, "Fix Fire Keystone").setClick(async () => {
	_.instance.prodigy.world.zones.firetower._towerData.enabled = true;
	_.instance.prodigy.world.zones.firetower.update();
	await Toast.fire("Success!", "Fire Keystone has been fixed.", "success");
});
new Hack(category.icetower, "Fix Water Keystone").setClick(async () => {
	_.instance.prodigy.world.zones.watertower._towerData.enabled = true;
	_.instance.prodigy.world.zones.watertower.update();
	await Toast.fire("Success!", "Ice Keystone has been fixed.", "success");
});
