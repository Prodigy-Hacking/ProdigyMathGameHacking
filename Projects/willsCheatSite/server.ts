import express from "express";
import { join } from "path";
const app = express();
const PORT = 0xbeef;
app.use(express.json());
app.use(express.static("dist"));
app.get("/", (req, res) => res.redirect("/index.html"));
app.listen(process.env.PORT || PORT, async () => {
	console.log(`Site started on :${PORT}.`);
});
