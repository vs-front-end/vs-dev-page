document.addEventListener("DOMContentLoaded", () => {
  I18n.init();
  if (window.YearSync?.update) YearSync.update();
  
  HUD.init();
  MazeBg.init();
  Cursor.init();
  MiniGame.init();
  Previews.init();

  const sections = document.querySelectorAll("section[data-screen-label]");

  function onScroll() {
    let current = 1;
    const y = window.scrollY + window.innerHeight / 2;

    sections.forEach((s, i) => {
      const top = s.getBoundingClientRect().top + window.scrollY;
      if (y >= top) current = i + 1;
    });

    HUD.setLevel(current);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});
