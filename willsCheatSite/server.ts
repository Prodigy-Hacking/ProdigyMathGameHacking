import express from "express";
import { join } from "path";
import config from "./webpack.config";
import webpack from "webpack";
import middleware from "webpack-dev-middleware";
const app = express();
const PORT = 0xbeef;
app.use(express.json());
app.use(express.static("dist"));
app.use(
	middleware(webpack(config as any))
  );

app.get("/", (req, res) => res.redirect("/index.html"));
app.listen(PORT, async () => {
	console.log(`Site started on ${PORT}.`);
});
