import { Swal, Toast, NumberInput } from "../utils/swal";
import { Hack, category } from "../index";
import { getAccount, updateUser } from "../utils/api";
import { USER_UPDATE } from "../utils/urls";
new Hack(category.player, "Set Gold", "Set your gold amount.").setClick(async () => {
	const amount = await NumberInput.fire("Gold Amount", "What do you want to set your gold to?", "question");
	if (amount.value === undefined) return;
	(await updateUser({ data: { gold: +amount.value } }))
		? await Toast.fire("Successfully updated!", "Your gold has been set!", "success")
		: await Toast.fire("Failed to update.", "Something went wrong.", "error");
});
new Hack(category.player, "Set Level", "Set your level.").setClick(async () => {
	const amount = await NumberInput.fire("Level", "What do you want to set your level to?", "question");
	if (amount.value === undefined) return;
	(await updateUser({ data: { level: +amount.value } }))
		? await Toast.fire("Successfully updated!", "Your level has been set!", "success")
		: await Toast.fire("Failed to update.", "Something went wrong.", "error");
});
new Hack(category.player, "Set Bounty Points", "Set your bounty points.").setClick(async () => {
	const amount = await NumberInput.fire("Bounty Point Amount", "What do you want to set your bounty points to?", "question");
	if (amount.value === undefined) return;
	(await updateUser({ data: { bountyScore: +amount.value } }))
		? await Toast.fire("Successfully updated!", "Your bounty points has been set!", "success")
		: await Toast.fire("Failed to update.", "Something went wrong.", "error");
});
new Hack(category.player, "Set Health", "Set your player's health.").setClick(async() => {
	const amount = await NumberInput.fire("Bounty Point Amount", "What do you want to set your health to?", "question");
	if (amount.value === undefined) return;
	(await updateUser({ data: { hp: +amount.value } }))
		? await Toast.fire("Successfully updated!", "Your health has been set!", "success")
		: await Toast.fire("Failed to update.", "Something went wrong.", "error");
})