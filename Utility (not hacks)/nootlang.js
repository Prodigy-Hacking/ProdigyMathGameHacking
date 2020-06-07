const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
const compile = str => {
	const types = {
		semen: "STR",
		cum: "INT",
		piss: "FLT",
	};
	const verifyType = (type, val) =>
		({
			STR: x => true,
			INT: x => !isNaN(x) && !(x % 1),
			FLT: x => !isNaN(x),
		}[type](val));
	const convertType = (type, val) =>
		({
			STR: x => x,
			INT: Math.round,
			FLT: Number,
		}[type](val));
	const vars = {};
	const isDefined = varname => varname !== undefined && vars.hasOwnProperty(varname);
	str = str.replace(/foreskin\s+\w+/g, x => x.split(/\s+/).join("_"));
	const arr = str.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g).map(x => x.replace(/^"(.+?)"$/, "$1"));
	for (let i = 0; i < arr.length; i++) {
		const t = arr[i].toLowerCase();
		switch (t) {
			case "noot": {
				if (!arr[i + 1]) throw "NootError: No type specified.";
				const type = arr[++i].toLowerCase();
				const varname = arr[++i];
				if (!varname) throw "NootError: No variable name specified.";
				const vari = { value: undefined, type: null };
				if (!types.hasOwnProperty(type)) throw `NootError: Invalid type ${type}.`;
				vari.type = type;
				vars[varname] = vari;
				break;
			}
			case "treatment": {
				const varname = arr[++i];
				if (varname === undefined) throw `TreatmentError: No variable name specified.`;
				if (!isDefined(varname)) throw `TreatmentError: ${varname} is not defined.`;
				console.log(vars[varname].value);
				break;
			}
			case "circumcise": {
				const varname = arr[++i];
				const value = arr[++i];
				if (varname === undefined) throw `CircumcisionError: No variable name specified.`;
				if (!isDefined(varname)) throw `CircumcisionError: ${varname} is not defined`;
				if (value === undefined) throw `CircumcisionError: No value specified.`;
				const vari = vars[varname];
				if (!verifyType(types[vari.type], value))
					throw `CircumcisionError: ${value} is not assignable to type ${vari.type}`;
				vari.value = convertType(types[vari.type], value);
				break;
			}
			default:
				throw `InvalidKeywordError: ${t} is not a valid keyword.`;
		}
	}
};
rl.question("> ", compile)