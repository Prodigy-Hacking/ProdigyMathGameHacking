import { Swal, Toast, NumberInput, Confirm } from "../utils/swal";
import { Hack, category, Toggler } from "../index";
import { VERY_LARGE_NUMBER, gameData, pickRandom } from "../utils/util";
import { prodigy, game } from "../utils/util";
new Hack(category.utility, "Save Character","Helps fix bugs where not all hacks save.").setClick(async () => {
    _.player.forceSaveCharacter()
        await Toast.fire("Success!", "Your character has been saved!", "success");
    });
new Hack(category.utility, "Close all popups","Closes all popups in Prodigy.").setClick(async () => {
        _.instance.prodigy.open.menuCloseAll();
        await Toast.fire("Closed!", "All open popups were closed.", "success");
    });
    new Hack(category.utility, "Update menu","Updates menu to the latest version without needing to reload.").setClick(async () => {
        document.getElementById("cheat-menu")?.remove();
        document.getElementById("menu-toggler")?.remove();
        (async() => {
            eval(await (await fetch(`https://raw.githubusercontent.com/Prodigy-Hacking/ProdigyMathGameHacking/HEAD/willsCheatMenu/dist/bundle.js?updated=${Date.now()}`)).text())
        })()
        await Toast.fire("Updated!", "Cheat menu was updated.", "success");
    });
