const YearSync = (() => {
  function update() {
    const currentYear = String(new Date().getFullYear());

    document.querySelectorAll("[data-current-year]").forEach((el) => {
      el.textContent = currentYear;
    });
  }

  return { update };
})();
