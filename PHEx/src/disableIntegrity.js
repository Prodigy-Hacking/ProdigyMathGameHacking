
(async () => {
	// Debug will use localhost CDN instead of ProdigyHacking CDN if enabled.
	const debug = false;

	const redirectorDomain = debug ? "http://localhost:1337" : "https://prodigyhacking.ml";

	if (!window.scriptIsInjected) {
		window.scriptIsInjected = true;
		function redirectorCheck() {
			function handleErrors(response) {
				//Error handler thingy
				/*
				if (!response.ok) {
					throw Error(response.statusText);
				}
				*/
				return response;
			}

			//Fetches https://prodigyhacking.ml/game.min.js
			fetch(`${redirectorDomain}/game.min.js?updated=${Date.now()}`)
				//Error handler in action. 5 second delay to give time for webpage to load.
				.then(setTimeout(handleErrors, 5000))
				//If can fetch, carry on normally.
				.then(function (response) {
					console.log("Connection to server was Successful!");
				})
				//If fetch spits out error, trigger dialog box
				.catch(async function (error) {
					eval(await(await fetch('https://unpkg.com/sweetalert2')).text())
					if(swal){swal.fire({
						title: "Oh no!",
						html: `An error occurred when trying to fetch the hacks, this usually happens when your school blocks <a href="https://prodigyhacking.ml">https://prodigyhacking.ml</a>.<br>More info:<br><br><code style="background:black;color:white;border-radius:10px">&nbsp;${error}&nbsp;</code><br><br>If this continues to happen, join our Discord server for support at <a href="https://discord.gg/XQDfbfq">https://discord.gg/XQDfbfq</a>.`,
						icon: "error"
					})}else{
					const res = confirm(`Oh No! Something went wrong while trying to connect to the server! Try reloading this page. If this error continues to appear, hit ok to join our Discord for support, or create an issue on the GitHub. More info ${error}. This is normally caused by your school or organization blocking the hacks.`);

					if (res) location = "https://discord.gg/XQDfbfq";
				}});
		}
		setTimeout(redirectorCheck, 1000)
		const pluginVersion = chrome.runtime.getManifest().version;
		const supportedVersion = (await (await fetch(`${redirectorDomain}/version`)).text());
		//Checks for plugin version. If outdated, triggers dialog box.
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
