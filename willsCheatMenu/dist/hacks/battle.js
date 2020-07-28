define(["require", "exports", "../utils/swal", "../index", "../utils/util"], function (require, exports, swal_1, index_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new index_1.Hack(index_1.category.battle, "Escape Battle", "Escape any battle!").setClick(async () => {
        const currentState = util_1.game.state.current;
        if (currentState === "PVP")
            util_1.game.state.states.PVP.endPVP();
        else if (currentState === "CoOp")
            util_1.prodigy.world.$(hack.player.data.zone);
        else
            util_1.game.state.callbackContext.runAwayCallback();
        await swal_1.Toast.fire("Escaped!", "You have successfully escaped from the battle.", "success");
    });
    new index_1.Hack(index_1.category.battle, "Win Battle", "Instantly win a monster battle.").setClick(async () => {
        const currentState = util_1.game.state.current;
        if (currentState === "PVP" || currentState === "CoOp")
            return swal_1.Toast.fire("Invalid State.", "PVP is not supported for this hack.", "error");
        else if (currentState === "Battle") {
            util_1.game.state.states.Battle.startVictory();
            await swal_1.Toast.fire("Victory!", "You have successfully won the battle.", "success");
        }
        else
            await swal_1.Toast.fire("Invalid State.", "You are currently not in a battle.", "error");
    });
    let maxHearts = util_1.game;
    new index_1.Hack(index_1.category.battle, "Set Battle Hearts", "Sets your hearts in battle. Automatically raises max hearts.")
        .setClick(async () => {
        const hp = await swal_1.NumberInput.fire("Health Amount", "How much HP do you want?", "question");
        if (hp.value === undefined)
            return;
        hack.player.getMaxHearts = () => +hp.value;
        hack.player.pvpHP = +hp.value;
        hack.player.data.hp = +hp.value;
        await swal_1.Toast.fire("Success!", "Your hearts have been set.", "success");
    });
    new index_1.Hack(index_1.category.battle, "Fill Battle Energy", "Fills up your battle energy.")
        .setClick(async () => {
        const state = util_1.game.state.getCurrentState();
        if (!("teams" in state))
            return swal_1.Toast.fire("Error", "You are currently not in a battle.", "error");
        state.teams[0].setEnergy(99);
        await swal_1.Toast.fire("Success!", "Your battle energy has been filled.", "success");
    });
    new index_1.Toggler(index_1.category.battle, "test", "test")
        .setEnabled(() => console.log(1))
        .setDisabled(() => console.log(0));
});
//# sourceMappingURL=battle.js.map