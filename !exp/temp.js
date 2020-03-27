"use strict";
(SW.Utility = {}),
	(SW.Utility.getUrlVars = function() {
		var e = {};
		decodeURIComponent(window.location.href).replace(
			/[?&]+([^=&]+)=([^&]*)/gi,
			function(n, t, a) {
				e[t] = a.replace(/\+/g, " ");
			}
		);
		return e;
	}),
	(SW.Utility.getUrlVar = function(e) {
		var n = SW.Utility.getUrlVars();
		for (var t in n) if (t == e) return n[t];
		return !1;
	}),
	(SW.Device = {}),
	(SW.Device.getOS = function() {
		var e = window.navigator.userAgent,
			n = window.navigator.platform,
			t = "Unknown";
		return (
			-1 !== ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].indexOf(n)
				? (t = "macOS")
				: -1 !== ["iPhone", "iPad", "iPod"].indexOf(n)
				? (t = "iOS")
				: -1 !== ["Win32", "Win64", "Windows", "WinCE"].indexOf(n)
				? (t = "Windows")
				: /Android/.test(e)
				? (t = "Android")
				: !t && /Linux/.test(n) && (t = "Linux"),
			t
		);
	}),
	(SW.Device.isTablet = function() {
		return (
			SW.Device.isIpad() ||
			(/Android/.test(navigator.userAgent) &&
				!/Mobile/.test(navigator.userAgent))
		);
	}),
	(SW.Device.isIpad = function() {
		return null != navigator.userAgent.match(/iPad/i);
	}),
	(SW.Device.isNativeApp = function() {
		return (
			"1" === SW.Utility.getUrlVar("iosApp") ||
			"1" === SW.Utility.getUrlVar("nativeApp")
		);
	}),
	(SW.LoadGameBundle = {}),
	(SW.LoadGameBundle.initialize = function() {
		SW.LoadGameBundle.loadDependencyRequirements(function(e, n) {
			var t = [];
			(window.dependenciesCount = 0),
				(window.dependenciesLength = n.length),
				n.forEach(function(e) {
					t.push(function(n) {
						SW.LoadGameBundle.loadDependencies(e, n);
					});
				}),
				async.series(t, function() {
					SW.LoadGameBundle.updateProgressBar(90),
						WebFont.load({
							custom: {
								families: [
									"Fredoka One",
									"Luckiest Guy",
									"Paytone One",
									"ABeeZee",
								],
							},
						});
					var e = document.createElement("script");
					(e.type = "text/javascript"),
						(e.src = window.gameCodeFile),
						document.head.appendChild(e),
						(e.onload = function() {
							var e = document.createElement("script");
							(e.type = "text/javascript"),
								(e.src =
									"https://apis.google.com/js/platform.js?onload=onGooglePlatformLoad"),
								(e.async = !0),
								document.head.appendChild(e),
								SW.LoadGameBundle.updateProgressBar(100),
								Boot.init(),
								SW.Load.setLoadingVisible(!0),
								_.delay(function() {
									window.prodigyLoadComplete
										? SW.Load.setLoadingVisible(!1)
										: (window.prodigyLoadComplete = !0);
								}, 1e3),
								(window.hideGameLoader = function() {
									window.prodigyLoadComplete
										? SW.Load.setLoadingVisible(!1)
										: (window.prodigyLoadComplete = !0);
								});
						});
				});
		});
	}),
	(SW.LoadGameBundle.updateProgressBar = function(e) {
		document.querySelector(".ed-progress-bar").style.width = "".concat(
			e,
			"%"
		);
	}),
	(SW.LoadGameBundle.getGamePaths = function() {
		var e = [],
			n = window.gameApiStatusData;
		return (
			(e[0] = [
				{ url: n.gameLibPath + "easystar-0.2.0.min.js", async: !1 },
				{
					url: n.gameLibPath + "inversify/inversify.min.js",
					async: !1,
				},
				{ url: n.gameLibPath + "inversify/Reflect.min.js", async: !1 },
				{ url: n.gameLibPath + "webfont-1-5-10.js", async: !1 },
				{ url: n.gameLibPath + "crypto/core-min.js", async: !1 },
			]),
			(e[1] = [
				{
					url: n.gameLibPath + "sentry/5.5.0/bundle.min.js",
					async: !1,
				},
				{ url: n.gameLibPath + "phaser-spine-1.min.js", async: !1 },
				{
					url: n.gameLibPath + "particle-storm-prodigy-2.min.js",
					async: !1,
				},
				{ url: n.gameLibPath + "crypto/enc-base64-min.js", async: !1 },
				{ url: n.gameLibPath + "crypto/md5-min.js", async: !1 },
				{ url: n.gameLibPath + "lz-string.min.js", async: !1 },
			]),
			e
		);
	}),
	(SW.LoadGameBundle.loadDependencyRequirements = function(e) {
		if (SW.Load.isErrorScreen())
			console.log(
				"Do not loadDependencyRequirements because error screen is displaying."
			);
		else {
			if (window.gameApiStatusData.maintenance)
				return (
					SW.Load.setErrorScreenText(
						"Maintenance",
						window.gameApiStatusData.maintenanceMessage
					),
					void SW.Load.toggleErrorScreen(!0)
				);
			var n,
				t = SW.LoadGameBundle.getGamePaths(),
				a = t.length,
				i = [];
			for (n = 0; n < a; n += 1)
				i.length === n && (i[n] = []),
					t.length > n && (i[n] = i[n].concat(t[n]));
			SW.LoadGameBundle.updateProgressBar(25), e(null, i);
		}
	}),
	(SW.LoadGameBundle.loadDependencies = function(e, n) {
		var t = [];
		e.forEach(function(e) {
			var n = $.ajax.call($, {
				url: e.url,
				dataType: "script",
				cache: !0,
				success: function(e, n) {},
				error: function(n, t, a) {
					console.log(
						"loadDependencies failed for request: "
							.concat(e.url, " with status: ")
							.concat(t, " and error: ")
							.concat(a)
					),
						SW.Load.setErrorScreenText(),
						SW.Load.toggleErrorScreen(!0);
				},
			});
			e.async || t.push(n);
		}),
			$.when.apply($, t).done(function() {
				window.dependenciesCount++,
					SW.LoadGameBundle.updateProgressBar(
						25 +
							(50 * window.dependenciesCount) /
								window.dependenciesLength
					),
					n();
			});
	}),
	(SW.Storage = {}),
	(SW.Storage.get = function(e) {
		return JSON.parse(localStorage.getItem(e));
	}),
	(SW.Storage.set = function(e, n) {
		localStorage.setItem(e, JSON.stringify(n));
	}),
	(function() {
		var e,
			n = new Image();
		Object.defineProperty(n, "id", {
			get: function() {
				e = !0;
			},
		})
	})();
