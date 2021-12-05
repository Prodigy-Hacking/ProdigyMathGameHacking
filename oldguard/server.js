const express = require("express");
const app = express();

const port = 1005;

app.use(express.static("dist"));
app.get("/", (req, res) => {
    res.redirect("bundle.js");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});