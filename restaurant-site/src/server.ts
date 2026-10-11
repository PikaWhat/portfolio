import express from "express";
import { engine } from "express-handlebars";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(Bun.env.PORT) || 8080;
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(currentDir, "..");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(projectDir, "views"));
app.use(express.static(path.join(projectDir, "static")));

app.get("/", (_req, res) => {
  res.render("home", { title: "La Fetta – Pizza, Pasta, Vino", isHome: true });
});

app.get("/speisekarte", (_req, res) => {
  res.render("speisekarte", { title: "Speisekarte – La Fetta", isMenu: true });
});

app.get("/anfahrt", (_req, res) => {
  res.render("anfahrt", { title: "Anfahrt – La Fetta", isVisit: true });
});

app.use((_req, res) => {
  res.status(404).render("nicht-gefunden", { title: "Seite nicht gefunden – La Fetta" });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`La Fetta läuft unter http://localhost:${port}`);
});
