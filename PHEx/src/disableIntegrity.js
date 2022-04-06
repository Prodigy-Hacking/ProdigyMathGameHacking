function get(key) {
	return new Promise(resolve => {
		chrome.storage.local.get([key], result => {
			resolve(result[key]);
		});
	});
}

async function insertCode (redirectorDomain) {
	try {
		const request = await (await fetch(`${redirectorDomain}/game.min.js?updated=${Date.now()}`)).text()

		const script = document.createElement("script")
		script.innerHTML = request
		document.body.appendChild(script)
	} catch (error) {
		eval(await (await fetch('https://unpkg.com/sweetalert2')).text());
		if (swal) {
			swal.fire({
				title: "Oh no!",
				html: `An error occurred when trying to fetch the hacks, this usually happens when your school blocks <a href="https://hacks.prodigyhacking.com">https://hacks.prodigyhacking.com</a>.<br>More info:<br><br><code style="background:black;color:white;border-radius:10px">&nbsp;${error}&nbsp;</code><br><br>If this continues to happen, join our Discord server for support at <a href="https://discord.gg/XQDfbfq">https://discord.gg/XQDfbfq</a>.`,
				icon: "error"
			})
		} else {
			const res = confirm(`Oh No! Something went wrong while trying to connect to the server! Try reloading this page. If this error continues to appear, hit ok to join our Discord for support, or create an issue on the GitHub. More info ${error}. This is normally caused by your school or organization blocking the hacks.`);
			if (res) location = "https://discord.gg/XQDfbfq";
		}
	}
}

async function start () {
	const url = await get("url")
	const checked = await get("checked")
	const redirectorDomain = (url && checked) ? url : "https://hacks.prodigyhacking.com"

	setTimeout(insertCode, 1000, redirectorDomain)

	const pluginVersion = chrome.runtime.getManifest().version
	const supportedVersion = (await (await fetch(`${redirectorDomain}/version`)).text())

	if (pluginVersion !== supportedVersion) {
		eval(await (await fetch('https://unpkg.com/sweetalert2')).text());
		if (swal) {
			swal.fire({
				title: "Oh no!",
				html: `Your version of PHEx is outdated! Please update to the latest version to continue using PHEx.`,
				icon: "error"
			})
		} else {
			const res = confirm(`Your version of PHEx is outdated! Please update to the latest version to continue using PHEx.`);
			if (res) location = "https://github.com/Prodigy-Hacking/ProdigyMathGameHacking/wiki/How-to-Update"
		}
	}

	// Disable integrity
	console.group("integrity patches");
	[...document.getElementsByTagName("script"), ...document.getElementsByTagName("link")].forEach(v => {
		if (v.integrity) {
			console.log(v.integrity);
			v.removeAttribute("integrity");
		}
	});
	console.groupEnd()
}

if (!window.scriptIsInjected) {
	window.scriptIsInjected = true;

	start()
}
