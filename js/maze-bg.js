const MazeBg = (() => {
  const COLS = 32,
    ROWS = 18,
    CELL = 40;
  const W = COLS * CELL,
    H = ROWS * CELL;
  const NS = "http://www.w3.org/2000/svg";

  const GHOST_DEFS = [
    { color: "#ff3d5e", phase: 0, speed: 0.1 },
    { color: "#ff6fd6", phase: 100, speed: 0.08 },
    { color: "#3ddfff", phase: 200, speed: 0.12 },
    { color: "#ffb84d", phase: 300, speed: 0.09 },
  ];

  function buildWalls() {
    const lines = [];

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const seed = (r * 73 + c * 31) % 100;

        if (seed < 18) {
          lines.push([c * CELL, r * CELL, (c + 1) * CELL, r * CELL]);
        }
        
        if ((seed + 17) % 100 < 14) {
          lines.push([c * CELL, r * CELL, c * CELL, (r + 1) * CELL]);
        }
      }
    }

    return lines;
  }

  function buildDots() {
    const dots = [];

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if ((r + c) % 3 === 0 && (r * 11 + c * 7) % 5 !== 0) {
          dots.push({ x: c * CELL + CELL / 2, y: r * CELL + CELL / 2 });
        }
      }
    }

    return dots;
  }

  function createEl(tag, attrs) {
    const el = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    return el;
  }

  function init() {
    const svg = document.getElementById("maze-svg");
    if (!svg) return;

    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

    const defs = createEl("defs", {});

    const filter = createEl("filter", {
      id: "maze-glow",
      x: "-20%",
      y: "-20%",
      width: "140%",
      height: "140%",
    });

    const blur = createEl("feGaussianBlur", {
      stdDeviation: "1.2",
      result: "blur",
    });

    const merge = createEl("feMerge", {});
    merge.appendChild(createEl("feMergeNode", { in: "blur" }));
    merge.appendChild(createEl("feMergeNode", { in: "SourceGraphic" }));
    filter.appendChild(blur);
    filter.appendChild(merge);
    defs.appendChild(filter);
    svg.appendChild(defs);

    // Walls
    for (const [x1, y1, x2, y2] of buildWalls()) {
      svg.appendChild(
        createEl("line", {
          x1,
          y1,
          x2,
          y2,
          stroke: "#1c2bff",
          "stroke-width": "2",
          "stroke-linecap": "round",
          opacity: "0.6",
          filter: "url(#maze-glow)",
        }),
      );
    }

    // Dots
    const dotEls = buildDots().map((d) => {
      const el = createEl("circle", {
        cx: d.x,
        cy: d.y,
        r: "2",
        fill: "#ffe69a",
        opacity: "0.7",
      });

      svg.appendChild(el);
      return { el, x: d.x, y: d.y };
    });

    // Roaming ghost groups
    const ghostEls = GHOST_DEFS.map((g) => {
      const group = createEl("g", { opacity: "0.8" });
      const inner = createEl("g", { transform: "scale(0.62)" });

      inner.innerHTML = `
        <path d="M32 6 C18 6 10 16 10 30 L10 54 L14 50 L18 54 L22 50 L26 54 L30 50 L34 54 L38 50 L42 54 L46 50 L50 54 L54 50 L54 30 C54 16 46 6 32 6 Z" fill="${g.color}" opacity="0.6"/>
        <ellipse cx="24" cy="26" rx="6" ry="7" fill="#fff"/>
        <ellipse cx="40" cy="26" rx="6" ry="7" fill="#fff"/>
        <circle cx="26" cy="26" r="2.5" fill="#0a0a1a"/>
        <circle cx="42" cy="26" r="2.5" fill="#0a0a1a"/>
      `;

      group.appendChild(inner);
      svg.appendChild(group);

      return { group, ...g };
    });

    let tick = 0;
    setInterval(() => {
      tick++;

      // Flicker dots
      dotEls.forEach((d) => {
        const flicker = (d.x + d.y + tick * 4) % 400 < 20 ? 0.3 : 1;
        d.el.setAttribute("opacity", 0.7 * flicker);
      });

      // Move roaming ghosts
      ghostEls.forEach((g, i) => {
        const t = tick * g.speed + g.phase;
        const x = (Math.sin(t / 30) * 0.5 + 0.5) * W;
        const y = (Math.cos(t / 40 + i) * 0.5 + 0.5) * H;
        g.group.setAttribute("transform", `translate(${x - 20}, ${y - 20})`);
      });
    }, 60);
  }

  return { init };
})();
