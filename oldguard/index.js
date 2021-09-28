const readline = require("readline");
const esbuild = require("esbuild");


readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);


const header = () => {
    console.clear();
    console.log(
`Oldguard Dashboard!
    [ctrl c] - quit
    [b] - rebuild
`
    );
}
header();


process.stdin.on("keypress", (str, key) => {
    // lmao i just wanted to use break so I stuck it in a while true loop
    // idc about good practice anymore, I just wanna fish
    while (true) {
        const { name, ctrl } = key;
        header();

        if (name === "c" && ctrl) {
            process.exit();
        }

        if (name === "b") {
            esbuild.build({
                entryPoints: ["./src/index.js"],
                bundle: true,
                minifyWhitespace: true,
                outfile: "dist/bundle.js",
            }).catch(err => console.error(err));

            console.log(`Built at ${Date.now()} (${Date()})`)
            break;
        }


        console.log(`You pressed the "${str}" key\n`);
        console.log(key);


        break;
    }
});