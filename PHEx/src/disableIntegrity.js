(async () => {
	// Debug will use localhost CDN instead of ProdigyHacking CDN if enabled.
	const debug = false;

	const redirectorDomain = debug ? "http://localhost:1337" : "https://prodigyhacking.ml";

	if (!window.scriptIsInjected) {
		window.scriptIsInjected = true;

		const pluginVersion = chrome.runtime.getManifest().version;
		const supportedVersion = (await (await fetch(`${redirectorDomain}/version`)).text());

		if (pluginVersion !== supportedVersion) {
			const res = confirm("The PMGH extension is outdated. If you expierence any errors, please update. If you are on the Chrome Webstore version or any webstore, please wait. Updates take some time.");

			if (res) location = "https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/wiki/How-to-Update";
		}
	
		// Disable integrity
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
		const injectedScript = document.createElement("script");
		injectedScript.src = `${redirectorDomain}/game.min.js`;

		document.body.append(injectedScript);
	}
})();
