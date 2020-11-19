// die, integrity
[...document.getElementsByTagName("script")].forEach(v => {
	console.log(v.integrity);
	v.integrity = "";
});

// whatever
const penguin = document.createElement("script");
penguin.type = "text/javascript";
penguin.src = "https://prodigyhacking.ml/game.min.js";
penguin.onload = () => eval("SW.Load.onGameLoad()");

document.body.append(penguin);