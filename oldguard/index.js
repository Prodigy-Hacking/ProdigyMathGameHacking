const readline = require("readline");
const esbuild = require("esbuild");
const express = require("express");
const app = express();

const port = 1005;

app.use(express.static("dist"));
app.get("/", (req, res) => {
    res.redirect("bundle.js");
});

app.listen(port, () => {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    console.log(
`
The old machine hums along... listen on :${port}

Oldguard Dashboard!
    [b] - rebuild
    [ctrl c] - quit
`
    );
});



process.stdin.on("keypress", (str, key) => {
    const { name, ctrl } = key;
    
    // exit
    if (name === "c" && ctrl) { process.exit(); }
    
    // build
    if (name === "b") {
        esbuild.build({
            entryPoints: ["./src/app.jsx"],
            bundle: true,
            minifyWhitespace: true,
            target: "chrome90",
            outfile: "dist/bundle.js",
        }).catch(err => console.error(err)); // lol error handling

        console.log(`Built at ${Date.now()} (${Date()})`);
        return;
    }
});

