import { Swal, Toast, NumberInput } from "../utils/swal";
import { Hack, category } from "../index";
import { getAccount, updateUser, getGameData, getBigData } from "../utils/api";
import { USER_UPDATE } from "../utils/urls";
(async () => {
	const gameData = await getGameData();
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
		const amount = await NumberInput.fire(
			"Bounty Point Amount",
			"What do you want to set your bounty points to?",
			"question"
		);
		if (amount.value === undefined) return;
		(await updateUser({ data: { bountyScore: +amount.value } }))
			? await Toast.fire("Successfully updated!", "Your bounty points has been set!", "success")
			: await Toast.fire("Failed to update.", "Something went wrong.", "error");
	});
	new Hack(category.player, "Set Health", "Set your player's health.").setClick(async () => {
		const amount = await NumberInput.fire(
			"Bounty Point Amount",
			"What do you want to set your health to?",
			"question"
		);
		if (amount.value === undefined) return;
		(await updateUser({ data: { hp: +amount.value } }))
			? await Toast.fire("Successfully updated!", "Your health has been set!", "success")
			: await Toast.fire("Failed to update.", "Something went wrong.", "error");
	});
	new Hack(category.player, "Change Name", "Change the name of your wizard.").setClick(async () => {
		const bigData = await getBigData();
		if (!bigData) return;
		const names = gameData.name;
		const div = document.createElement("div");
		const createSelect = (arr: Map<string, string>, func: (str: string) => boolean) => {
			const select = document.createElement("select");
			select.classList.add("selectName");
			select.classList.add("swal2-select");
			for (const opt of arr.entries()) {
				const optt = document.createElement("option");
				optt.value = opt[0];
				optt.innerText = opt[1];
				if (func(optt.value)) optt.selected = true;
				select.options.add(optt);
			}
			return select;
		};
		const nameSelect = (type: number, func: (num: number) => boolean) =>
			createSelect(new Map(names.filter(x => x.data.type === type).map(x => [x.ID.toString(), x.name])), val =>
				func(+val)
			);
		div.append(nameSelect(0, x => x === bigData.appearance.name.first));
		div.append(nameSelect(1, x => x === bigData.appearance.name.middle));
		div.append(nameSelect(2, x => x === bigData.appearance.name.last));
		div.append(
			createSelect(
				new Map(
					[["null", "[none]"]].concat(gameData.nickname.map(x => [x.ID.toString(), x.name])) as [
						string,
						string
					][]
				),
				x => +x === bigData.appearance.name.nick || String(bigData.appearance.name.nick) === x
			)
		);
		const name = await Swal.fire({
			title: "Set Player Name",
			focusConfirm: false,
			showCancelButton: true,
			html: div,
			preConfirm: () => {
				return Array.prototype.slice
					.call(document.querySelectorAll(`.selectName`))
					.map((x: HTMLSelectElement) => x.options[x.selectedIndex].value);
			},
		});
		if (name.value === undefined) return;
		if (name.value[3] === "null") name.value[3] = null;
		[
			bigData.appearance.name.first,
			bigData.appearance.name.middle,
			bigData.appearance.name.last,
			bigData.appearance.name.nick,
		] = (name.value as string[]).map(x => ((x as unknown) as number) && +x);
		await updateUser({ appearance: { name: bigData.appearance.name } });
		await Toast.fire("Name Changed!", "Your name was successfully changed.", "success");
	});
})();
