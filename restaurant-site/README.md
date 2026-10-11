# La Fetta

Eigenständige, mehrseitige Restaurant-Website auf Basis von Express und Handlebars.

## Start

```sh
bun install
bun run dev
```

Die Website läuft standardmäßig unter <http://localhost:8080>.

## Seiten

- `/` – Startseite
- `/speisekarte` – Speisekarte
- `/anfahrt` – Anfahrt und Öffnungszeiten

Die Restaurantadresse und Kontaktdaten sind aktuell Beispielinhalte und können in `views/anfahrt.handlebars` angepasst werden.
# La Fetta

## Lokale Entwicklung

Mit Bun starten:

```sh
bun install
bun run dev
```

## Statische Website erstellen

Für GitHub Pages werden die Handlebars-Seiten als statische HTML-Dateien erzeugt:

```sh
npm install
npm run build:static
```

Die fertige Website liegt danach in `dist/`. Der GitHub-Actions-Workflow erstellt
diesen Ordner bei jedem Push auf `main` und veröffentlicht ihn über GitHub Pages.
