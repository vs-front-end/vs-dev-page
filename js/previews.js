const Previews = (() => {
  function drawStellar(ctx, w, h, t, color) {
    ctx.fillStyle = "#02020a";
    ctx.fillRect(0, 0, w, h);

    // Stars
    for (let i = 0; i < 60; i++) {
      const x = (i * 37) % w;
      const y = (i * 53) % h;
      const twinkle = (i + t) % 40 < 20 ? 0.4 : 1;
      ctx.fillStyle = `rgba(255,255,255,${0.6 * twinkle})`;
      const r = (i % 3) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glow center
    const cx = w / 2,
      cy = h / 2;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
    grad.addColorStop(0, color + "AA");
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, 80, 0, Math.PI * 2);
    ctx.fill();

    // Core
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(cx, cy, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Orbits
    [50, 75, 100].forEach((r, i) => {
      const angle = (t * (i + 1) * 0.8 * Math.PI) / 180;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.strokeStyle = color + "55";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, r, r * 0.3, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(r, 0, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    ctx.fillStyle = color + "99";
    ctx.font = "10px monospace";
    ctx.fillText("STELLAR_UI.EXE", 16, h - 10);
  }

  function drawThink(ctx, w, h, t, color) {
    ctx.fillStyle = "#02020a";
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2,
      cy = h / 2;
    [-2, -1, 0, 1, 2].forEach((i) => {
      const flip = Math.sin((t + i * 20) / 15);
      const rot = ((i * 8 + flip * 4) * Math.PI) / 180;
      const x = cx + i * 38;
      ctx.save();
      ctx.translate(x, cy);
      ctx.rotate(rot);
      const isCenter = i === 0;
      ctx.fillStyle = isCenter ? color : "#0a0a1a";
      ctx.strokeStyle = color;
      ctx.lineWidth = isCenter ? 2 : 1;
      ctx.globalAlpha = isCenter ? 1 : 0.7;
      roundRect(ctx, -35, -50, 70, 100, 6);
      ctx.fill();
      ctx.stroke();

      if (isCenter) {
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = color + "99";
        ctx.globalAlpha = 0.6;
        ctx.font = "28px monospace";
        ctx.textAlign = "center";
        ctx.fillText("?", 0, 10);
        ctx.textAlign = "left";
      }

      ctx.globalAlpha = 1;
      ctx.restore();
    });

    ctx.fillStyle = color + "99";
    ctx.font = "10px monospace";
    ctx.fillText("THINK_CARDS.EXE", 16, h - 10);
  }

  function drawSoon(ctx, w, h, t, color) {
    ctx.fillStyle = "#02020a";
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = color + "26";
    ctx.lineWidth = 1;

    for (let x = 0; x < w; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    for (let y = 0; y < h; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const cx = w / 2,
      cy = h / 2 - 10;
    const blink = t % 30 < 15;

    // Spinning dashed ring
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((t * 0.8 * Math.PI) / 180);
    ctx.strokeStyle = color + (blink ? "FF" : "66");
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(0, 0, 44, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Core coin
    ctx.fillStyle = color + (blink ? "CC" : "AA");
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = "#000";
    ctx.font = "bold 16px 'Press Start 2P', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("?", cx, cy);

    ctx.fillStyle = color + (t % 24 < 12 ? "FF" : "4D");
    ctx.font = "11px 'Press Start 2P', monospace";
    ctx.fillText("EM BREVE...", cx, cy + 60);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    ctx.fillStyle = color + "99";
    ctx.font = "10px monospace";
    ctx.fillText("LOADING_NEXT_LEVEL.EXE", 16, h - 10);
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function init() {
    const canvases = document.querySelectorAll("[data-preview]");
    if (!canvases.length) return;

    const dpr = window.devicePixelRatio || 1;

    // Size each canvas to its container
    canvases.forEach((canvas) => {
      const parent = canvas.parentElement;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr || 400 * dpr;
      canvas.height = rect.height * dpr || 250 * dpr;
    });

    let t = 0;
    
    setInterval(() => {
      t++;
      canvases.forEach((canvas) => {
        const type = canvas.dataset.preview;
        const color = canvas.dataset.color || "#00f0ff";
        const ctx = canvas.getContext("2d");
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;

        ctx.save();
        ctx.scale(dpr, dpr);
        if (type === "stellar") drawStellar(ctx, w, h, t, color);
        else if (type === "think") drawThink(ctx, w, h, t, color);
        else if (type === "soon") drawSoon(ctx, w, h, t, color);
        ctx.restore();
      });
    }, 60);
  }

  return { init };
})();
