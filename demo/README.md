# CoralLapse interactive demo

A static, dependency-free prototype of the CoralLapse web app:
upload → SAM segmentation and classification → 4D reconstruction → novel views → change analysis → verified VLM report.

- Open `demo/index.html` locally, or visit `<project site>/demo/` once GitHub Pages is on.
- `index.html` – page markup, `style.css` – styles, `app.js` – step navigation and view toggles, `assets/` – result images.
- Deep links: `demo/#step-1` … `demo/#step-6`.

All numbers come from the preliminary study (23-frame sample clip, Pulley Ridge CPCe baseline, NOAA NCRMP East FGB plot T3 2019/2022).
The growth/loss map in step 5 is a simulated example; growth-form names on the sample clip are placeholders.
Upload, layers and survey selection are not wired to a backend yet. The planned backend is FastAPI + a GPU job queue.
