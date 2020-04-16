console.log(Bomb.CutTheWire.toString());
console.log(
	Object.getOwnPropertyNames(global)
		.filter(x => {
			try {
				return typeof global[x] === "number";
			} catch {
				return false;
			}
		})
		.join(" ")
);
Bomb.CutTheWire(myWireVar);
