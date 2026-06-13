const I18n = (() => {
  const STORAGE_KEY = "vs_dev_lang";
  const DEFAULT_LANG = "pt-BR";

  const messages = {
    "pt-BR": {
      "meta.title": "Vitor Silva — Desenvolvedor Frontend",
      "hud.lives": "VIDAS",
      "hero.title.line2": "DEV. FRONT-END",
      "hero.tag": "DESIGN SYSTEMS · PERFORMANCE · ACESSIBILIDADE",
      "hero.subtitle":
        "Desenvolvedor front-end com 4 anos de experiência em React, React Native e TypeScript. Construo design systems, monorepos e interfaces que funcionam em web e mobile. Aberto a projetos freelance e oportunidades remotas full-time.",
      "hero.meta.basedLabel": "BASE",
      "hero.meta.basedValue": "Brasil · Remoto",
      "hero.meta.statusLabel": "STATUS",
      "hero.meta.statusValue": "● DISPONIVEL",
      "hero.cta.projects":
        '<span class="btn-icon" aria-hidden="true">▶</span>VER PROJETOS',
      "hero.cta.contact":
        'ENTRAR EM CONTATO<span class="btn-icon" aria-hidden="true">→</span>',
      "game.start.title": "DEMO<br />JOGAVEL",
      "game.start.instructions":
        'Setas / <span class="keycap">WASD</span> para mover. Coma todas as bolinhas.',
      "game.start.insertCoin": "▶ INSERIR FICHA",
      "game.over.title": "GAME<br />OVER",
      "game.over.retry": "↻ TENTAR DE NOVO",
      "game.win.title": "VOCE VENCEU!",
      "game.win.playAgain": "↻ JOGAR NOVAMENTE",
      "game.panel.reset": "RESET",
      "game.panel.start": "START",
      "stage.02": "FASE 02",
      "stage.03": "FASE 03",
      "stage.04": "FASE 04",
      "stage.05": "FASE 05",
      "about.label": "SOBRE",
      "about.title": "QUATRO FANTASMAS<br />UM DEV.",
      "about.meta.mode": "MODO",
      "about.meta.value": "PERFIS",
      "about.stat.specialty": "ESPECIALIDADE",
      "about.stat.deliveries": "ENTREGAS",
      "about.stat.focus": "FOCO",
      "about.cards.blinky.role": "Arquitetura Frontend",
      "about.cards.blinky.specialty": "UI web escalavel",
      "about.cards.blinky.deliveries": "Design systems e componentes",
      "about.cards.blinky.focus": "Consistencia visual",
      "about.cards.pinky.role": "Experiencia Mobile",
      "about.cards.pinky.specialty": "Fluxos mobile nativos",
      "about.cards.pinky.deliveries": "Telas, navegacao e estados",
      "about.cards.pinky.focus": "UX em iOS e Android",
      "about.cards.clyde.role": "Integracao de APIs",
      "about.cards.clyde.specialty": "Integracao com APIs",
      "about.cards.clyde.deliveries": "Contratos claros e dados confiaveis",
      "about.cards.clyde.focus": "Estabilidade do produto",
      "about.cards.inky.role": "Copiloto de IA",
      "about.cards.inky.specialty": "Aceleracao de entrega",
      "about.cards.inky.deliveries": "Prototipos e refino de interface",
      "about.cards.inky.focus": "Velocidade com qualidade",
      "skills.label": "POWER-UPS",
      "skills.title": "HABILIDADES / INVENTARIO",
      "skills.banner.title": "FASE BOSS LIBERADA",
      "skills.banner.subtitle":
        "Monorepo, design system e arquitetura cross-platform. Tudo junto, sem perder escala.",
      "skills.banner.cta": "COLABORAR →",
      "projects.label": "PROJETOS",
      "projects.title": "LEVELS<br />SELECIONADOS",
      "projects.counter.label": "LEVELS CONCLUIDOS",
      "projects.stellar.subtitle": "Biblioteca de componentes para interfaces",
      "projects.stellar.description":
        "Biblioteca de componentes React com foco em microanimacoes e acessibilidade. Inclui design tokens, dark mode automatico e documentacao interativa.",
      "projects.thinkcards.subtitle": "Alternativa gratuita ao Anki com FSRS",
      "projects.thinkcards.description":
        "Alternativa moderna e gratuita ao Anki. Usa o algoritmo FSRS para repeticao espacada mais inteligente. Offline-first, funciona em qualquer dispositivo, sem instalacao.",
      "projects.orbit.subtitle": "Hub pessoal de gestao financeira",
      "projects.orbit.description":
        "Carteiras multi-moeda, patrimonio consolidado, estatisticas com benchmarks e ferramentas de rebalanceamento e juros compostos.",
      "projects.actions.play": "▶ PLAY LIVE",
      "projects.actions.source": "</> SOURCE",
      "projects.soon.locked": "LOCKED",
      "projects.soon.subtitle": "Proximo level em construcao",
      "projects.soon.cta": "◌ EM BREVE…",
      "contact.label": "CONTATO",
      "contact.title": 'JOGUE <span class="wave">COMIGO</span>',
      "contact.status.label": "STATUS",
      "contact.status.value": "ABERTO A OPORTUNIDADES",
      "contact.github.label": "GITHUB",
      "contact.linkedin.label": "LINKEDIN",
      "footer.copy":
        "© <span data-current-year></span> VITOR SILVA · BUILT WITH HTML + CSS + JS + COFFEE",
      "footer.highScore": "HIGH SCORE: 999,999",
    },
    en: {
      "meta.title": "Vitor Silva — Frontend Developer",
      "hud.lives": "LIVES",
      "hero.title.line2": "FRONT-END DEV.",
      "hero.tag": "DESIGN SYSTEMS · PERFORMANCE · ACCESSIBILITY",
      "hero.subtitle":
        "Frontend developer with 4 years of experience in React, React Native, and TypeScript. I build design systems, monorepos, and interfaces that work across web and mobile. Open to freelance projects and remote full-time opportunities.",
      "hero.meta.basedLabel": "BASED IN",
      "hero.meta.basedValue": "Brazil · Remote",
      "hero.meta.statusLabel": "STATUS",
      "hero.meta.statusValue": "● AVAILABLE",
      "hero.cta.projects":
        '<span class="btn-icon" aria-hidden="true">▶</span>VIEW PROJECTS',
      "hero.cta.contact":
        'GET IN TOUCH<span class="btn-icon" aria-hidden="true">→</span>',
      "game.start.title": "PLAYABLE<br />DEMO",
      "game.start.instructions":
        'Arrow keys / <span class="keycap">WASD</span> to move. Eat all dots.',
      "game.start.insertCoin": "▶ INSERT COIN",
      "game.over.title": "GAME<br />OVER",
      "game.over.retry": "↻ RETRY",
      "game.win.title": "YOU WIN!",
      "game.win.playAgain": "↻ PLAY AGAIN",
      "game.panel.reset": "RESET",
      "game.panel.start": "START",
      "stage.02": "STAGE 02",
      "stage.03": "STAGE 03",
      "stage.04": "STAGE 04",
      "stage.05": "STAGE 05",
      "about.label": "ABOUT",
      "about.title": "FOUR GHOSTS<br />ONE DEV.",
      "about.meta.mode": "MODE",
      "about.meta.value": "GHOST PROFILES",
      "about.stat.specialty": "SPECIALTY",
      "about.stat.deliveries": "DELIVERIES",
      "about.stat.focus": "FOCUS",
      "about.cards.blinky.role": "Frontend Architecture",
      "about.cards.blinky.specialty": "Scalable web UI",
      "about.cards.blinky.deliveries": "Design systems and components",
      "about.cards.blinky.focus": "Visual consistency",
      "about.cards.pinky.role": "Mobile Experience",
      "about.cards.pinky.specialty": "Native mobile flows",
      "about.cards.pinky.deliveries": "Screens, navigation, and state",
      "about.cards.pinky.focus": "iOS and Android UX",
      "about.cards.clyde.role": "API Integration",
      "about.cards.clyde.specialty": "API integration",
      "about.cards.clyde.deliveries": "Clear contracts and reliable data",
      "about.cards.clyde.focus": "Product stability",
      "about.cards.inky.role": "AI Copilot",
      "about.cards.inky.specialty": "Delivery acceleration",
      "about.cards.inky.deliveries": "Prototypes and interface refinement",
      "about.cards.inky.focus": "Speed with quality",
      "skills.label": "POWER-UPS",
      "skills.title": "SKILLS / INVENTORY",
      "skills.banner.title": "BOSS STAGE UNLOCKED",
      "skills.banner.subtitle":
        "Monorepo, design system, and cross-platform architecture. All together without losing scale.",
      "skills.banner.cta": "COLLAB →",
      "projects.label": "SELECTED WORK",
      "projects.title": "SELECTED<br />LEVELS",
      "projects.counter.label": "LEVELS CLEARED",
      "projects.stellar.subtitle": "Component library for cosmic interfaces",
      "projects.stellar.description":
        "React component library focused on micro-animations and accessibility. Includes design tokens, automatic dark mode, and interactive documentation.",
      "projects.thinkcards.subtitle": "Free Anki alternative with FSRS",
      "projects.thinkcards.description":
        "A modern and free alternative to Anki. Uses the FSRS algorithm for smarter spaced repetition. Offline-first, works on any device, no installation required.",
      "projects.orbit.subtitle": "Personal finance management hub",
      "projects.orbit.description":
        "Multi-currency portfolios, consolidated net worth, stats with benchmarks, and rebalancing and compound interest tools.",
      "projects.actions.play": "▶ PLAY LIVE",
      "projects.actions.source": "</> SOURCE",
      "projects.soon.locked": "LOCKED",
      "projects.soon.subtitle": "Next level under construction",
      "projects.soon.cta": "◌ COMING SOON…",
      "contact.label": "CONTACT",
      "contact.title": 'PLAY <span class="wave">WITH ME</span>',
      "contact.status.label": "STATUS",
      "contact.status.value": "OPEN FOR WORK",
      "contact.github.label": "GITHUB",
      "contact.linkedin.label": "LINKEDIN",
      "footer.copy":
        "© <span data-current-year></span> VITOR SILVA · BUILT WITH HTML + CSS + JS + COFFEE",
      "footer.highScore": "HIGH SCORE: 999,999",
    },
  };

  function getMessage(lang, key) {
    const table = messages[lang] || messages[DEFAULT_LANG];
    return table[key] ?? messages[DEFAULT_LANG][key] ?? "";
  }

  function setLangButtons(lang) {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.title = getMessage(lang, "meta.title");

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (key) el.textContent = getMessage(lang, key);
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.dataset.i18nHtml;
      if (key) el.innerHTML = getMessage(lang, key);
    });

    if (window.YearSync?.update) YearSync.update();

    setLangButtons(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}
  }

  function resolveInitialLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && messages[saved]) return saved;
    } catch (_) {}
    const browser = (navigator.language || "").toLowerCase();
    return browser.startsWith("pt") ? "pt-BR" : "en";
  }

  function init() {
    const initial = resolveInitialLang();
    applyLanguage(initial);

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const nextLang = btn.dataset.lang;
        if (!messages[nextLang]) return;
        applyLanguage(nextLang);
      });
    });
  }

  return { init, applyLanguage };
})();
