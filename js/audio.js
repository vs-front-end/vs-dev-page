const Audio = (() => {
  let ctx = null;
  let enabled = true;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  function play(kind) {
    if (!enabled) return;
    try {
      const ac = getCtx();
      const o = ac.createOscillator();
      const g = ac.createGain();

      o.connect(g);
      g.connect(ac.destination);
      o.type = "square";
      
      const now = ac.currentTime;

      if (kind === "eat") {
        g.gain.setValueAtTime(0.05, now);
        o.frequency.setValueAtTime(660, now);
        o.frequency.exponentialRampToValueAtTime(880, now + 0.06);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        o.start(now);
        o.stop(now + 0.1);
      } else if (kind === "power") {
        g.gain.setValueAtTime(0.05, now);
        o.frequency.setValueAtTime(220, now);
        o.frequency.exponentialRampToValueAtTime(660, now + 0.3);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        o.start(now);
        o.stop(now + 0.35);
      } else if (kind === "ghost") {
        g.gain.setValueAtTime(0.05, now);
        o.frequency.setValueAtTime(880, now);
        o.frequency.exponentialRampToValueAtTime(220, now + 0.3);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        o.start(now);
        o.stop(now + 0.35);
      } else if (kind === "die") {
        g.gain.setValueAtTime(0.05, now);
        o.frequency.setValueAtTime(440, now);
        o.frequency.exponentialRampToValueAtTime(55, now + 0.8);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        o.start(now);
        o.stop(now + 0.85);
      } else if (kind === "start") {
        [523, 659, 784, 1046].forEach((freq, i) => {
          const oo = ac.createOscillator();
          const gg = ac.createGain();
          oo.connect(gg);
          gg.connect(ac.destination);
          oo.type = "square";
          oo.frequency.setValueAtTime(freq, now + i * 0.08);
          gg.gain.setValueAtTime(0.04, now + i * 0.08);
          gg.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.1);
          oo.start(now + i * 0.08);
          oo.stop(now + i * 0.08 + 0.12);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  function setEnabled(v) {
    enabled = !!v;
  }

  return { play, setEnabled };
})();
