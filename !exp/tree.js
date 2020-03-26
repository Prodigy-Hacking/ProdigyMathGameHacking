/**
 * @type any
 */
var targetVal = 2;
var set = new WeakSet();
/**
 * @type string[][]
 */
var result = [];
/**
 *
 * @param {any} root
 * @param {string} branch
 * @param {string[]} path
 */
// @ts-ignore
var getTree = (root = window, branch = "window", path = []) => {
	const elem = root[branch];
	const prototypes = [elem, Object.keys(elem)];
	while (prototypes[0] !== null) {
		prototypes.unshift(Object.getPrototypeOf(prototypes[0]));
	}
	const keys = prototypes
		.filter(x => x !== null)
		.flatMap(Object.getOwnPropertyNames);
	for (const key of keys) {
		if (["caller", "callee", "arguments", "globalThis"].includes(key)) continue;
		try {
			elem[key]
		} catch {
			continue;
		}
		const el = elem[key];
		if (el === targetVal) {
			result.push(path.concat(key))
		};
		if (set.has(el)) continue;
		if (
			(typeof el === "object" || typeof el === "function") &&
			el !== null
		) {
			set.add(el);
			getTree(elem, key, path.concat(key));
		}
	}
};
var getResult = () =>
	result.map(x =>
		x.join(".").replace(/\.\d+/g, x => `[${x.replace(".", "")}]`)
	);
