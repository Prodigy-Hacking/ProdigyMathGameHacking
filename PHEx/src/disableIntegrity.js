(async () => {
	const debug = false;

	const redirectorDomain = debug ? "http://localhost:1337" : "https://prodigyhacking.ml"

	if (!window.abortion) {
		// only run inject script once on the page, even if game.min is requested multiple times
		window.abortion = "Hey, we've injected the thingy";

		// check for outdated plugin
		const pluginVersion = chrome.runtime.getManifest().version;
		const supportedVersion = (await (await fetch(`${redirectorDomain}/version`)).text());

		if (pluginVersion !== supportedVersion) {
			const res = confirm("Outdated plugin version! Hacks are not guaranteed to work! If you would like to update, please click 'OK'");

			if (res) location = "https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/wiki/How-to-Update";
		}
	
		// die, integrity
		[...document.getElementsByTagName("script"), ...document.getElementsByTagName("link")].forEach(v => {
			if (v.integrity) {
				console.log(v.integrity);
				v.removeAttribute("integrity");
			}
		});
		// <link rel="preload" href="https://code.prodigygame.com/code/3-13-0/game.min.js?v=3-13-0" as="script" crossorigin="anonymous"></link>
		/*
		const prelly = document.createElement("link");
		prelly.rel = "preload";
		prelly.href = `${redirectorDomain}/game.min.js`;
		*/

		// <script src="https://code.prodigygame.com/code/3-13-0/game.min.js?v=3-13-0" onload="SW.Load.onGameLoad();" crossorigin="anonymous"></script>
		// we cancel the real game.min, and just append ours
		// a messy solution for sure, but this should only be a bandaid on a bulletwound
		const penguin = document.createElement("script");
		penguin.src = `${redirectorDomain}/game.min.js`;

		document.body.append(penguin);
	}
})();