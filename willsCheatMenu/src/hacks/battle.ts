//@ts-nocheck
import { Swal, Toast, NumberInput } from "../utils/swal";
import { Hack, category, Toggler } from "../index";
import { VERY_LARGE_NUMBER, gameData, pickRandom } from "../utils/util";
import { BattleState } from "../../../typings/game";
import { prodigy, game } from "../utils/util";

new Hack(category.battle, "Escape Battle", "Escape any battle!").setClick(async () => {
	const currentState = game.state.current;
	if (currentState === "PVP") game.state.states.PVP.endPVP();
	else if (currentState === "CoOp") prodigy.world.$(_.player.data.zone);
	else if (!['Battle','SecureBattle'].includes(currentState)) await Toast.fire(
		"Invalid State.",
		"You are currently not in a battle.",
		"error"
	);
	else {game.state.callbackContext.runAwayCallback();
	await Toast.fire(
		"Escaped!",
		"You have successfully escaped from the battle.",
		"success"
	);

}});

new Hack(category.battle, "Win Battle", "Instantly win a monster battle.").setClick(async () => {
	const currentState = game.state.current;
	if (currentState === "PVP" || currentState === "CoOp") {
		return Toast.fire(
			"Invalid State.",
			"PVP is not supported for this hack.",
			"error"
		);
	} else if (currentState === "Battle") {
		game.state.states.Battle.startVictory();
		await Toast.fire(
			"Victory!",
			"You have successfully won the battle.",
			"success"
		);
	} else if (currentState === "SecureBattle") {
		_.instance.game.state.states.SecureBattle.battleVictory();
		await Toast.fire(
			"Victory!",
			"You have successfully won the battle.",
			"success"
		);
	}else {
		await Toast.fire(
			"Invalid State.",
			"You are currently not in a battle.",
			"error"
		);
	}
});

new Hack(category.battle, "Set Battle Hearts", "Sets your hearts in battle. Automatically raises max hearts.").setClick(async() => {
	const hp = await NumberInput.fire("Health Amount", "How much HP do you want?", "question");
	if (hp.value === undefined) return;
	_.player.getMaxHearts = () => +hp.value;
	_.player.pvpHP = +hp.value;
	_.player.data.hp = +hp.value;
	await Toast.fire("Success!", "Your hearts have been set.", "success");
});
new Hack(category.battle, "Fill Battle Energy", "Fills up your battle energy.").setClick(async() => {
	const state  = game.state.getCurrentState();
	if (!("teams" in state)) return Toast.fire("Error", "You are currently not in a battle.", "error");
	state.teams[0].setEnergy(99);
	await Toast.fire("Success!", "Your battle energy has been filled.", "success");
});

new Toggler(category.battle, "Add arena points","Adds 100 arena points each minute or so.").setEnabled(async () => {
	let season;
Array.from( _.instance.prodigy.gameContainer.inversifyContainer._bindingDictionary._map).forEach(e => {
	// @ts-ignore
try{if( _.instance.prodigy.gameContainer.get(e[0]).seasonID){season= e[0]}
// @ts-ignore
}catch{console.log(`Error for ${e[0]}`)}
})
	const interval = setInterval(async function(){
await Swal.fire('Arena Points are being added','Check back each minute.','success')
fetch(
        ("https://api.prodigygame.com/leaderboard-api/season/" + season + "/user/" + _.player.userID + "/pvp?userID=" + _.player.userID), {
            headers: {
                "authorization": localStorage.JWT_TOKEN,
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-fetch-mode": "cors"
            },
            referrer: "https://play.prodigygame.com/",
            referrerPolicy: "no-referrer-when-downgrade",
            body: ("seasonID=" + season + "&action=win"),
            method: "POST",
            mode: "cors"
        }).then(v => v.text()).then(async v => {if(!v.points){await Swal.fire('Error','There was an error updating your arena points.','error')}})
	},60000+Math.round(Math.random()*1000))
}).setDisabled(async () => {
	clearInterval(interval)
	await Toast.fire('Success!','Arena Points are no longer being added!','success')
});