# CoralLapse

**Efficient, Language-Assisted 4D Reconstruction for Measuring Coral Colony Growth from Underwater Video**

Project website for a 1FAU Seed4Solutions proposal (I-SMART + HBOI, Florida Atlantic University, 2027).
Lead PI: Ahmed Imteaj, Ph.D. (EECS, SPEED Lab).

## Publish on GitHub Pages

1. Create a new repository on GitHub (e.g. `corallapse`).
2. Upload everything in this folder (`index.html`, `assets/`, `.nojekyll`, `README.md`) to the repository root.
   - Command line:
     ```bash
     git init && git add . && git commit -m "CoralLapse project page"
     git branch -M main
     git remote add origin https://github.com/<your-username>/corallapse.git
     git push -u origin main
     ```
3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. The site will be live at `https://<your-username>.github.io/corallapse/` within a minute or two.

## Structure

```
index.html              single-page site (no build step)
assets/coralReef_SPEED_Lab.mp4  teaser video (28 MB, H.264)
assets/video-poster.jpg poster frame for the video
assets/reef_4d_reconstruction.mp4  4D reconstruction demo (11 MB)
assets/reef4d-poster.jpg  poster for the demo
assets/preliminary_results.mp4  preliminary results video (10 MB)
assets/prelim-poster.jpg  poster for the preliminary results video
assets/fig1-pipeline.jpg Figure 1 – 4D pipeline overview
assets/fig2-timeline.png Figure 2 – 2027 work plan
assets/social-card.jpg  link-preview image
```

Figures and the teaser are concept renderings, not experimental results.
