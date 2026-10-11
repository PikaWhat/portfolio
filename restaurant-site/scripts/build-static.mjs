import express from "express";
import { engine } from "express-handlebars";
import { copyFile, cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const viewsDir = path.join(projectDir, "views");
const staticDir = path.join(projectDir, "static");
const outputDir = path.join(projectDir, "dist");

const app = express();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", viewsDir);

function render(view, data) {
  return new Promise((resolve, reject) => {
    app.render(view, data, (error, html) => {
      if (error) reject(error);
      else resolve(html);
    });
  });
}

const pages = [
  { view: "home", output: "index.html", data: { title: "La Fetta – Pizza, Pasta, Vino", isHome: true } },
  { view: "speisekarte", output: "speisekarte/index.html", data: { title: "Speisekarte – La Fetta", isMenu: true } },
  { view: "anfahrt", output: "anfahrt/index.html", data: { title: "Anfahrt – La Fetta", isVisit: true } },
  { view: "nicht-gefunden", output: "404.html", data: { title: "Seite nicht gefunden – La Fetta" } },
];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const page of pages) {
  const html = await render(page.view, page.data);
  const destination = path.join(outputDir, page.output);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html, "utf8");
  console.log(`Generated ${page.output}`);
}

await cp(staticDir, outputDir, { recursive: true });
await copyFile(path.join(projectDir, "CNAME"), path.join(outputDir, "CNAME"));
console.log("Copied static assets to dist/");
