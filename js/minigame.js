const MiniGame = (() => {
  const COLS = 15,
    ROWS = 15,
    CELL = 28;

  const SPEED = 4.5,
    GHOST_SPEED = 3.5,
    SCARED_SPEED = 2.2;

  const INITIAL_MAP = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 2, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  const DIR_VEC = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  const OPPOSITE = { up: "down", down: "up", left: "right", right: "left" };

  function dirVec(d) {
    return DIR_VEC[d] || [0, 0];
  }

  function isWall(map, x, y) {
    if (x < 0 || y < 0 || x >= COLS || y >= ROWS) return true;
    return map[y][x] === 1;
  }

  let state = null;
  let started = false;
  let gameOver = false;
  let won = false;
  let focused = false;
  let activeKey = null;
  let raf = null;

  function resetState() {
    let dotsLeft = 0;
    const map = INITIAL_MAP.map((row) => row.slice());

    for (const row of map)
      for (const v of row) if (v === 0 || v === 3) dotsLeft++;

    state = {
      map,
      pac: { x: 7, y: 9, dir: "left", nextDir: "left", sub: 0, mouth: 0 },
      ghosts: [
        {
          x: 7,
          y: 7,
          color: "#ff3d5e",
          dir: "up",
          sub: 0,
          scared: 0,
          home: { x: 7, y: 7 },
        },
        {
          x: 6,
          y: 7,
          color: "#ff6fd6",
          dir: "down",
          sub: 0,
          scared: 0,
          home: { x: 6, y: 7 },
        },
        {
          x: 8,
          y: 7,
          color: "#3ddfff",
          dir: "left",
          sub: 0,
          scared: 0,
          home: { x: 8, y: 7 },
        },
      ],
      score: 0,
      dotsLeft,
      lastFrame: 0,
    };
  }

  function showOverlay(id) {
    ["game-overlay-start", "game-overlay-over", "game-overlay-win"].forEach(
      (oid) => {
        const el = document.getElementById(oid);
        if (el) el.style.display = oid === id ? "flex" : "none";
      },
    );
  }

  function setDpadActive(dir) {
    ["up", "down", "left", "right"].forEach((d) => {
      const btn = document.getElementById("dpad-" + d);
      if (btn) btn.classList.toggle("active", d === dir);
    });

    const readout = document.getElementById("key-readout");
    if (readout) readout.textContent = dir ? dir.toUpperCase() : "---";
  }

  function pressDir(dir) {
    if (state) state.pac.nextDir = dir;
    activeKey = dir;

    setDpadActive(dir);

    setTimeout(() => {
      if (activeKey === dir) {
        activeKey = null;
        setDpadActive(null);
      }
    }, 200);
  }

  function startGame() {
    if (!started) {
      started = true;
      Audio.play("start");
    }

    focused = true;
    document.getElementById("arcade-cabinet").classList.add("is-focused");

    showOverlay(null);
    if (!raf) runLoop();
  }

  function doReset() {
    cancelAnimationFrame(raf);

    raf = null;

    resetState();
    gameOver = false;
    won = false;

    if (started) {
      showOverlay(null);
      runLoop();
    }
  }

  function runLoop() {
    const canvas = document.getElementById("game-canvas");
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = COLS * CELL * dpr;
    canvas.height = ROWS * CELL * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    function step(ts) {
      const s = state;
      if (!s || gameOver || won) return;
      if (!s.lastFrame) s.lastFrame = ts;

      const dt = Math.min((ts - s.lastFrame) / 1000, 0.1);
      s.lastFrame = ts;

      // --- Pac update ---
      const p = s.pac;
      p.mouth = (p.mouth + dt * 8) % (Math.PI * 2);
      const [nx, ny] = dirVec(p.nextDir);
      if (!isWall(s.map, p.x + nx, p.y + ny)) p.dir = p.nextDir;

      const [dx, dy] = dirVec(p.dir);
      if (!isWall(s.map, p.x + dx, p.y + dy)) {
        p.sub += SPEED * dt;
        while (p.sub >= 1) {
          p.sub -= 1;
          p.x += dx;
          p.y += dy;

          const cell = s.map[p.y][p.x];

          if (cell === 0) {
            s.map[p.y][p.x] = 2;
            s.score += 10;
            s.dotsLeft--;
            HUD.addScore(10);
            Audio.play("eat");
          } else if (cell === 3) {
            s.map[p.y][p.x] = 2;
            s.score += 50;
            s.dotsLeft--;
            s.ghosts.forEach((g) => {
              g.scared = 6;
            });
            HUD.addScore(50);
            Audio.play("power");
          }
        }
      } else {
        p.sub = 0;
      }

      // --- Ghosts update ---
      s.ghosts.forEach((g) => {
        if (g.scared > 0) g.scared = Math.max(0, g.scared - dt);

        if (g.sub < 0.05) {
          const options = ["up", "down", "left", "right"].filter((d) => {
            const [vx, vy] = dirVec(d);
            return !isWall(s.map, g.x + vx, g.y + vy) && d !== OPPOSITE[g.dir];
          });

          if (options.length > 0) {
            let best = options[0],
              bestScore = -Infinity;

            for (const o of options) {
              const [vx, vy] = dirVec(o);
              const dist = Math.abs(g.x + vx - p.x) + Math.abs(g.y + vy - p.y);
              const sc = (g.scared > 0 ? dist : -dist) + Math.random() * 2;

              if (sc > bestScore) {
                bestScore = sc;
                best = o;
              }
            }
            g.dir = best;
          } else {
            g.dir = OPPOSITE[g.dir] || "up";
          }
        }
        const [gx, gy] = dirVec(g.dir);
        if (!isWall(s.map, g.x + gx, g.y + gy)) {
          const spd = g.scared > 0 ? SCARED_SPEED : GHOST_SPEED;

          g.sub += spd * dt;

          while (g.sub >= 1) {
            g.sub -= 1;
            g.x += gx;
            g.y += gy;
          }
        } else {
          g.sub = 0;
        }
      });

      // Collision
      for (const g of s.ghosts) {
        if (Math.abs(g.x - p.x) + Math.abs(g.y - p.y) < 1) {
          if (g.scared > 0) {
            g.x = g.home.x;
            g.y = g.home.y;
            g.sub = 0;
            g.scared = 0;
            s.score += 200;
            HUD.addScore(200);
            Audio.play("ghost");
          } else {
            gameOver = true;
            HUD.loseLife();
            Audio.play("die");
            const el = document.getElementById("game-over-score");
            if (el) el.textContent = "Score: " + s.score;
            showOverlay("game-overlay-over");
            return;
          }
        }
      }

      if (s.dotsLeft <= 0) {
        won = true;
        const el = document.getElementById("game-win-score");
        if (el) el.textContent = "Score: " + s.score;

        showOverlay("game-overlay-win");
        return;
      }

      // --- Render ---
      ctx.fillStyle = "#04040e";
      ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);

      // Walls
      ctx.shadowColor = "#1c2bff";
      ctx.shadowBlur = 6;

      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (s.map[y][x] === 1) {
            ctx.fillStyle = "#0a0d33";
            ctx.strokeStyle = "#1c2bff";
            ctx.lineWidth = 2;
            ctx.fillRect(x * CELL + 4, y * CELL + 4, CELL - 8, CELL - 8);
            ctx.strokeRect(x * CELL + 4, y * CELL + 4, CELL - 8, CELL - 8);
          }
        }
      }
      ctx.shadowBlur = 0;

      // Dots + power pellets
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const v = s.map[y][x];

          if (v === 0) {
            ctx.fillStyle = "#ffe69a";
            ctx.beginPath();
            ctx.arc(
              x * CELL + CELL / 2,
              y * CELL + CELL / 2,
              2,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          } else if (v === 3) {
            const pulse = 4 + Math.sin(ts / 200) * 2;
            ctx.fillStyle = "#ffd400";
            ctx.shadowColor = "#ffd400";
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(
              x * CELL + CELL / 2,
              y * CELL + CELL / 2,
              pulse,
              0,
              Math.PI * 2,
            );
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // Pac-man
      const px = (p.x + dirVec(p.dir)[0] * p.sub) * CELL + CELL / 2;
      const py = (p.y + dirVec(p.dir)[1] * p.sub) * CELL + CELL / 2;
      const mouthA = Math.abs(Math.sin(p.mouth)) * 0.55;

      const rot =
        { right: 0, down: Math.PI / 2, left: Math.PI, up: -Math.PI / 2 }[
          p.dir
        ] || 0;

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(rot);
      ctx.fillStyle = "#ffd400";
      ctx.shadowColor = "#ffd400";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, CELL * 0.42, mouthA, Math.PI * 2 - mouthA);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      ctx.shadowBlur = 0;

      // Ghosts
      for (const g of s.ghosts) {
        const gxp = (g.x + dirVec(g.dir)[0] * g.sub) * CELL + CELL / 2;
        const gyp = (g.y + dirVec(g.dir)[1] * g.sub) * CELL + CELL / 2;

        const color =
          g.scared > 0
            ? g.scared < 2 && Math.floor(ts / 150) % 2 === 0
              ? "#fff"
              : "#2a44ff"
            : g.color;

        const gs = CELL * 0.42;
        ctx.save();
        ctx.translate(gxp, gyp);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, -gs * 0.2, gs, Math.PI, 0);
        ctx.lineTo(gs, gs * 0.9);

        for (let i = 0; i < 4; i++) {
          const xx = gs - (i + 0.5) * ((gs * 2) / 4);
          const xx2 = gs - (i + 1) * ((gs * 2) / 4);
          ctx.lineTo(xx, gs * 0.6);
          ctx.lineTo(xx2, gs * 0.9);
        }

        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(-gs * 0.35, -gs * 0.25, gs * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(gs * 0.35, -gs * 0.25, gs * 0.25, 0, Math.PI * 2);
        ctx.fill();
        const [ex, ey] = dirVec(g.dir);
        ctx.fillStyle = g.scared > 0 ? "#fff" : "#0a0a1a";
        ctx.beginPath();
        ctx.arc(
          -gs * 0.35 + ex * gs * 0.1,
          -gs * 0.25 + ey * gs * 0.1,
          gs * 0.12,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          gs * 0.35 + ex * gs * 0.1,
          -gs * 0.25 + ey * gs * 0.1,
          gs * 0.12,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
  }

  function init() {
    resetState();

    const cabinet = document.getElementById("arcade-cabinet");

    // Click cabinet to focus
    cabinet.addEventListener("click", () => {
      if (!started) return;
      focused = true;
      cabinet.classList.add("is-focused");
    });

    // Click outside to unfocus
    document.addEventListener("mousedown", (e) => {
      if (focused && !cabinet.contains(e.target)) {
        focused = false;
        cabinet.classList.remove("is-focused");
      }
    });

    // Keyboard input
    const keyMap = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      w: "up",
      a: "left",
      s: "down",
      d: "right",
      W: "up",
      A: "left",
      S: "down",
      D: "right",
    };
    window.addEventListener("keydown", (e) => {
      if (!started || !focused) return;
      const dir = keyMap[e.key];
      if (!dir) return;
      e.preventDefault();
      if (state) state.pac.nextDir = dir;
      activeKey = dir;
      setDpadActive(dir);
    });
    window.addEventListener("keyup", (e) => {
      const dir = keyMap[e.key];
      if (dir && activeKey === dir) {
        activeKey = null;
        setDpadActive(null);
      }
    });

    // D-pad buttons
    ["up", "down", "left", "right"].forEach((dir) => {
      const btn = document.getElementById("dpad-" + dir);
      if (btn)
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          pressDir(dir);
          if (started) {
            focused = true;
            cabinet.classList.add("is-focused");
          }
        });
    });

    // Overlay buttons
    document
      .getElementById("btn-insert-coin")
      ?.addEventListener("click", (e) => {
        e.stopPropagation();
        startGame();
      });
    document
      .getElementById("btn-retry")
      ?.addEventListener("click", () => doReset());
    document
      .getElementById("btn-play-again")
      ?.addEventListener("click", () => doReset());
    document.getElementById("btn-reset")?.addEventListener("click", () => {
      if (started) doReset();
    });
    document.getElementById("btn-start")?.addEventListener("click", (e) => {
      e.stopPropagation();
      startGame();
    });
  }

  return { init };
})();
