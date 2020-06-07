
const readline = require("readline");
const path = require("path");
const { readFileSync } = require("fs");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
const getInput = () => new Promise(res => rl.question(">> ", res))
const compile = async str => {
	const throwErr = (...args) => (console.error(String.raw(...args)), process.exit(1));
	const vars = {};
	const types = {
		semen: "STR",
		cum: "INT",
		piss: "FLT",
	};
	const typeDef = {
		STR: "",
		INT: 0,
		FLT: 0.0
	}
	const verifyType = (type, val) =>
		({
			STR: x => true,
			INT: x => !isNaN(x) && !(x % 1),
			FLT: x => !isNaN(x),
		}[type](vars[val] ? vars[val].value : val));
	const convertType = (type, val) =>
		({
			STR: x => x,
			INT: Math.round,
			FLT: Number,
		}[type](vars[val] ? vars[val].value : val));
	const isDefined = varname => varname !== undefined && vars.hasOwnProperty(varname);
	str = str.replace(/foreskin\s+\w+/g, x => x.split(/\s+/).join("_"));
	const arr = str.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g).map(x => x.replace(/^"(.+?)"$/, "$1"));
	for (let i = 0; i < arr.length; i++) {
		const t = arr[i].toLowerCase();
		switch (t) {
			case "noot": {
				if (!arr[i + 1]) throwErr `NootError: No type specified.`;
				const type = arr[++i].toLowerCase();
				const varname = arr[++i];
				if (!varname) throwErr `NootError: No variable name specified.`;
				if (!types.hasOwnProperty(type)) throwErr `NootError: Invalid type ${type}.`;
				vars[varname] = { value: typeDef[types[type]], type: type };
				break;
			}
			case "treatment": {
				const varname = arr[++i];
				if (varname === undefined) throwErr `TreatmentError: No variable name specified.`;
				if (!isDefined(varname)) throwErr `TreatmentError: ${varname} is not defined.`;
				console.log(vars[varname].value);
				break;
			}
			case "obtain": {
				const varname = arr[++i];
				if (varname === undefined) throwErr `ObtainmentError: No variable name specified.`;
				if (!isDefined(varname)) throwErr `ObtainmentError: ${varname} is not defined.`;
				const vari = vars[varname];
				const inp = await getInput();
				if (!verifyType(types[vari.type], inp)) throwErr `ObtainmentError: Input was not of type ${vari.type}.`;
				vari.value = convertType(types[vari.type], inp);
				break;
			}
			case "ejaculate": {
				const varname = arr[++i];
				if (varname === undefined) throwErr `EjaculationError: No variable name specified.`;
				if (!isDefined(varname)) throwErr `EjaculationError: ${varname} is not defined.`;
				const vari = vars[varname];
				if (!(["cum", "piss"].includes(vari.type))) throwErr `EjaculationError: Variable ${varname} is not piss or cum.`;
				const amount = arr[++i];
				if (amount === undefined) throwErr `EjaculationError: Amount not specified.`;
				if (!verifyType(types[vari.type], amount)) throwErr `EjaculationError: Value ${amount} is not of type ${vari.type}.`;
				vari.value += convertType(types[vari.type], amount);
				break;
			}
			case "sex": {
				const varname = arr[++i];
				if (varname === undefined) throwErr `SexError: No variable name specified.`;
				if (!isDefined(varname)) throwErr `SexError: ${varname} is not defined.`;
				const vari = vars[varname];
				if (!(["cum", "piss"].includes(vari.type))) throwErr `SexError: Variable ${varname} is not piss or cum.`;
				const amount = arr[++i];
				if (amount === undefined) throwErr `SexError: Amount not specified.`;
				if (!verifyType(types[vari.type], amount)) throwErr `SexError: Value ${amount} is not of type ${vari.type}.`;
				vari.value *= convertType(types[vari.type], amount);
				break;
			}
			case "divorce": {
				const varname = arr[++i];
				if (varname === undefined) throwErr `DivorceError: No variable name specified.`;
				if (!isDefined(varname)) throwErr `DivorceError: ${varname} is not defined.`;
				const vari = vars[varname];
				if (!(["cum", "piss"].includes(vari.type))) throwErr `DivorceError: Variable ${varname} is not piss or cum.`;
				const amount = arr[++i];
				if (amount === undefined) throwErr `DivorceError: Amount not specified.`;
				if (!verifyType(types[vari.type], amount)) throwErr `DivorceError: Value ${amount} is not of type ${vari.type}.`;
				vari.value /= convertType(types[vari.type], amount);
				break;
			}
			case "circumcise": {
				const varname = arr[++i];
				const value = arr[++i];
				if (varname === undefined) throwErr `CircumcisionError: No variable name specified.`;
				if (!isDefined(varname)) throwErr `CircumcisionError: ${varname} is not defined`;
				if (value === undefined) throwErr `CircumcisionError: No value specified.`;
				const vari = vars[varname];
				if (!verifyType(types[vari.type], value))
					throwErr `CircumcisionError: ${value} is not assignable to type ${vari.type}`;
				vari.value = convertType(types[vari.type], value);
				break;
			}
			default:
				throwErr `InvalidKeywordError: ${t} is not a valid keyword.`;
		}
	}
	console.log("<<< END OF NOOT")
	process.exit(0);
};
if (process.argv[2]) {
	const pat = process.argv[2];
	const file = path.isAbsolute(pat) ? pat : path.join(__dirname, pat);
	if (!readFileSync(file)) throw `Invalid file.`;
	compile(readFileSync(file, { encoding: "utf8" }));
} else rl.question("> ", compile)