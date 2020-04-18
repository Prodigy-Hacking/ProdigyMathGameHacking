// @ts-ignore
const { exec } = require("child_process"); /* eslint-disable-line */
const { promisify } = require("util"); /* eslint-disable-line */
(async() => {
	let arg = process.argv.slice(2).join(" ");
	if (!arg) arg = "commit"

	console.log(`Pushing...`);

	const functions = ["git add -A", `git commit -m "${arg}"`, "git pull", "git push"];

	for (const f of functions) {
		try {
			const res = await promisify(exec)(f);
			console.log(res.stdout || res.stderr);
		} catch (err) {
			console.log(err.stderr);
		}
	}
})();
