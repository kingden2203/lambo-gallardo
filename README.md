# Vesper GT-1

Interactive 3D concept coupé built with **React + Vite + three.js**.

Scroll through eight chapters, configure the paint, wheels, wing, doors and
lights, then press **Drive** and take it through Tokyo: curves, ramps, traffic,
a Vision-GT style cockpit view and a "you died" restart.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs ./dist
npm run preview    # serve the production build
```

Node 18+ is required.

## Controls (Drive mode)

| Key | Action |
| --- | --- |
| `W` / `↑` | gas |
| `S` / `↓` | brake / reverse |
| `A` `D` / `←` `→` | steer |
| `Space` | handbrake |
| `C` | chase / cockpit view |
| `L` | headlights on / off |
| `Enter` / `R` | restart after dying |
| `Esc` | leave Drive mode |

On touch screens the on-screen buttons are shown automatically.

URL flags for testing: `?manual` (no auto render loop, uses `window.__vesper.step()`)
and `?noarrive` (skip the arrival cinematic).

## Project structure

```
index.html              Vite entry (fonts, meta)
public/models/vesper.glb   the car (loaded with fetch at start-up)
public/favicon.svg
src/main.jsx            React root
src/App.jsx             page markup (JSX) + mounts the engine
src/styles.css          all styles
src/engine/vesper.js    three.js engine (scene, camera rig, configurator, drive mode)
```

`App.jsx` renders the markup once. The engine then finds elements by id and
drives them imperatively, so the tree is never re-rendered and `<StrictMode>`
is intentionally not used.

## Deploy to Vercel

1. Push the repository to GitHub.
2. In Vercel choose **Add New → Project** and import the repo.
3. Framework preset: **Vite** (detected automatically). Build command
   `npm run build`, output directory `dist`.
4. If this project lives in a sub-folder of a bigger repo
   (for example `projects/vesper-gt1`), set **Root Directory** to that folder.

`vite.config.js` uses `base: "./"`, so every asset URL is relative. The build
also works when served from a sub-path such as `/projects/vesper-gt1/`.

## Notes

- three.js is pinned to `0.170.0` (the engine was authored against that release).
- The model is about 8.7 MB. It is cached by the browser and served with a long
  `Cache-Control` header (see `vercel.json`).
- WebGL 2 is required. Browsers without it show a fallback message.
