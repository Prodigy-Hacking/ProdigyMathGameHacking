const readline = require("readline");
const esbuild = require("esbuild");


readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);


const header = () => {
    console.clear();
    console.log(
`
Oldguard Dashboard!
    [ctrl c] - quit
    [b] - rebuild
`
    );
}
header();


process.stdin.on("keypress", (str, key) => {
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
            target: "chrome90",
            outfile: "dist/bundle.js",
        }).catch(err => console.error(err));

        console.log(`Built at ${Date.now()} (${Date()})`);
        return;
    }




    console.log(`You pressed the "${str}" key\n`);
    console.log(key);
});

require("./server.js");