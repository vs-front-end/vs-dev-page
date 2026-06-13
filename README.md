# VS.DEV — Portfólio

> Frontend developer portfolio with a fully playable Pac-Man game, arcade HUD, and bilingual support (PT/EN).

**Live →** [www.vsdev.app](https://www.vsdev.app)

---

## What's inside

- **Playable mini-game** — Pac-Man built from scratch on HTML Canvas with ghost AI, power pellets, score, and win/lose states
- **Arcade HUD** — persistent header with score, level, and lives that update as you play and scroll
- **Ghost profiles** — About section styled as character cards (Blinky, Pinky, Clyde, Inky), each mapping to a real skill area
- **CRT aesthetic** — scanline overlay, vignette, neon glow, animated maze background
- **i18n PT/EN** — full bilingual toggle, no dependencies
- **Mobile-ready** — on-screen D-pad for touch devices

## Stack

Vanilla HTML + CSS + JavaScript. No build step, no framework, no dependencies.

```
vs-dev-page/
├── index.html
├── styles/
│   ├── tokens.css        ← design tokens (colors, fonts, spacing)
│   ├── base.css
│   ├── layout.css
│   ├── hud.css
│   ├── hero.css
│   ├── minigame.css
│   ├── about.css
│   ├── skills.css
│   ├── projects.css
│   ├── contact.css
│   ├── components.css
│   └── responsive.css
└── js/
    ├── app.js            ← entry point, module orchestration
    ├── minigame.js       ← Pac-Man engine (Canvas, ghost AI, game loop)
    ├── hud.js            ← score, level, lives
    ├── maze-bg.js        ← animated SVG maze background
    ├── cursor.js         ← custom Pac-Man cursor
    ├── previews.js       ← project card canvas previews
    ├── audio.js          ← Web Audio API sound effects
    ├── i18n.js           ← bilingual support
    └── year.js           ← dynamic copyright year
```

## Running locally

No build needed. Just serve the root folder:

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

Then open [http://localhost:8080](http://localhost:8080).

## Author

**Vitor Silva** — Frontend Developer  
