const express = require("express");
const app = express();

app.use(express.static("dist"));

app.get("/", (req, res) => {
    res.redirect("bundle.js");
}); 


const port = 1005;
app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});