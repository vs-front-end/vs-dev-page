const HUD = (() => {
  let score = 0;
  let highScore = 13370;
  let lives = 3;
  let level = 1;

  function pad(n, len) {
    return String(n).padStart(len, "0");
  }

  function render() {
    const s = document.getElementById("hud-score");
    const h = document.getElementById("hud-high");
    const l = document.getElementById("hud-level");

    if (s) s.textContent = pad(score, 6);
    if (h) h.textContent = pad(highScore, 6);
    if (l) l.textContent = pad(level, 2);

    for (let i = 0; i < 3; i++) {
      const pip = document.getElementById("life-" + i);
      if (pip) pip.classList.toggle("lost", i >= lives);
    }
  }

  function addScore(delta) {
    score += delta;
    if (score > highScore) {
      highScore = score;

      try {
        localStorage.setItem("vs_highscore", String(highScore));
      } catch (error) {
        console.error(error);
      }
    }

    render();
  }

  function setLevel(n) {
    level = n;
    render();
  }

  function loseLife() {
    if (lives > 0) {
      lives--;
      render();
    }
  }

  function init() {
    try {
      const stored = parseInt(
        localStorage.getItem("vs_highscore") || "13370",
        10,
      );

      if (!isNaN(stored)) highScore = stored;
    } catch (error) {
      console.error(error);
    }

    render();
  }

  return { init, addScore, setLevel, loseLife };
})();
