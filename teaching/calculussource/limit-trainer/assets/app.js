(function () {
  "use strict";

  const STORAGE_KEY = "limit_method_trainer_v1";
  const APP_VERSION = 1;
  const DIFFICULTY = {
    1: { label: "基础", className: "difficulty--1" },
    2: { label: "提高", className: "difficulty--2" },
    3: { label: "挑战", className: "difficulty--3" }
  };

  const guide = window.LIMIT_METHODS && typeof window.LIMIT_METHODS === "object"
    ? window.LIMIT_METHODS
    : { methods: [], decision: [], comparisons: [] };
  const methods = Array.isArray(guide.methods) ? guide.methods : [];
  const methodById = new Map(methods.map((method) => [method.id, method]));
  const problems = Array.isArray(window.LIMIT_PROBLEMS) ? window.LIMIT_PROBLEMS : [];
  const problemById = new Map(problems.map((problem) => [problem.id, problem]));

  const practiceView = document.getElementById("view-practice");
  const methodsView = document.getElementById("view-methods");
  const statsView = document.getElementById("view-stats");
  const progressLabel = document.getElementById("progress-label");
  const progressFill = document.getElementById("progress-fill");
  const mathWarning = document.getElementById("math-warning");
  const toastEl = document.getElementById("toast");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let state = defaultState();
  let storageOk = true;
  let toastTimer = 0;
  let mathReady = false;
  let mathWarningShown = false;
  let mathQueue = Promise.resolve();

  const ui = {
    view: "practice",
    practiceScreen: "home",
    hintOpen: false,
    focusFeedback: false,
    scrollAfterNext: false
  };

  function defaultState() {
    const methodStats = {};
    methods.forEach((method) => {
      methodStats[method.id] = { attempts: 0, correct: 0 };
    });
    return {
      version: APP_VERSION,
      session: null,
      seen: {},
      methodStats,
      wrongIds: [],
      completedSessions: 0,
      updatedAt: null
    };
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, (character) => {
      switch (character) {
        case "&": return "&amp;";
        case "<": return "&lt;";
        case ">": return "&gt;";
        case "\"": return "&quot;";
        default: return "&#39;";
      }
    });
  }

  function shuffle(items) {
    const copy = items.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      const item = copy[index];
      copy[index] = copy[swapIndex];
      copy[swapIndex] = item;
    }
    return copy;
  }

  function hashString(text) {
    let hash = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function seededShuffle(items, seedText) {
    const copy = items.slice();
    let seed = hashString(seedText) || 1;
    function random() {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    }
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(random() * (index + 1));
      const item = copy[index];
      copy[index] = copy[swapIndex];
      copy[swapIndex] = item;
    }
    return copy;
  }

  function optionOrder(question) {
    if (!question) {
      return [];
    }
    const seed = state.session ? state.session.startedAt : 0;
    return seededShuffle(question.options, question.id + ":" + seed);
  }

  function activeSession() {
    return state.session && !state.session.completed ? state.session : null;
  }

  function currentQuestion() {
    const session = activeSession();
    if (!session) {
      return null;
    }
    return problemById.get(session.ids[session.index]) || null;
  }

  function methodFor(id) {
    return methodById.get(id) || { id, name: id, verb: "" };
  }

  function difficultyFor(value) {
    return DIFFICULTY[value] || DIFFICULTY[1];
  }

  function formatPercent(correct, attempts) {
    if (!attempts) {
      return "—";
    }
    return Math.round((correct / attempts) * 100) + "%";
  }

  function prefersReducedMotion() {
    return reducedMotion && reducedMotion.matches;
  }

  function toast(message) {
    window.clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.hidden = false;
    toastTimer = window.setTimeout(() => {
      toastEl.hidden = true;
    }, 2800);
  }

  function storageAvailable() {
    try {
      const probe = STORAGE_KEY + "__probe";
      window.localStorage.setItem(probe, "1");
      window.localStorage.removeItem(probe);
      return true;
    } catch (error) {
      return false;
    }
  }

  function normalizeSeen(rawSeen) {
    const result = {};
    if (!rawSeen || typeof rawSeen !== "object") {
      return result;
    }
    Object.keys(rawSeen).forEach((id) => {
      if (!problemById.has(id)) {
        return;
      }
      const record = rawSeen[id];
      if (!record || typeof record !== "object") {
        return;
      }
      const attempts = Math.max(0, Math.floor(Number(record.attempts) || 0));
      const correct = Math.max(0, Math.min(attempts, Math.floor(Number(record.correct) || 0)));
      result[id] = {
        attempts,
        correct,
        lastAt: Number(record.lastAt) || 0
      };
    });
    return result;
  }

  function normalizeSession(rawSession) {
    if (!rawSession || typeof rawSession !== "object" || !Array.isArray(rawSession.ids)) {
      return null;
    }
    const ids = [];
    const seenIds = new Set();
    rawSession.ids.forEach((id) => {
      if (typeof id === "string" && problemById.has(id) && !seenIds.has(id)) {
        ids.push(id);
        seenIds.add(id);
      }
    });
    if (!ids.length) {
      return null;
    }

    const rawResults = Array.isArray(rawSession.results) ? rawSession.results : [];
    const results = [];
    const resultIds = new Set();
    rawResults.forEach((result) => {
      if (!result || typeof result !== "object" || !ids.includes(result.id) || resultIds.has(result.id)) {
        return;
      }
      const question = problemById.get(result.id);
      if (!question || !question.options.includes(result.selected)) {
        return;
      }
      results.push({
        id: result.id,
        selected: result.selected,
        correct: result.selected === question.method
      });
      resultIds.add(result.id);
    });

    let index = Math.min(Math.max(0, Math.floor(Number(rawSession.index) || 0)), ids.length);
    const completed = Boolean(rawSession.completed) || index >= ids.length;
    let currentChoice = null;

    if (!completed && ids[index]) {
      const question = problemById.get(ids[index]);
      const rawChoice = rawSession.currentChoice;
      if (rawChoice && question && question.options.includes(rawChoice.methodId)) {
        currentChoice = {
          methodId: rawChoice.methodId,
          correct: rawChoice.methodId === question.method
        };
      } else {
        const existing = results.find((result) => result.id === ids[index]);
        if (existing) {
          currentChoice = {
            methodId: existing.selected,
            correct: existing.correct
          };
        }
      }
    }

    const methodId = typeof rawSession.methodId === "string" && methodById.has(rawSession.methodId)
      ? rawSession.methodId
      : null;

    return {
      mode: ["mixed10", "all", "wrong", "method"].includes(rawSession.mode) ? rawSession.mode : "mixed10",
      label: typeof rawSession.label === "string" && rawSession.label ? rawSession.label.slice(0, 80) : "综合练习",
      methodId,
      ids,
      index,
      results,
      currentChoice,
      completed,
      startedAt: Number(rawSession.startedAt) || Date.now(),
      completedAt: Number(rawSession.completedAt) || null
    };
  }

  function normalizeState(raw) {
    const normalized = defaultState();
    if (!raw || typeof raw !== "object") {
      return normalized;
    }

    normalized.seen = normalizeSeen(raw.seen);
    if (raw.methodStats && typeof raw.methodStats === "object") {
      methods.forEach((method) => {
        const record = raw.methodStats[method.id];
        if (!record || typeof record !== "object") {
          return;
        }
        const attempts = Math.max(0, Math.floor(Number(record.attempts) || 0));
        const correct = Math.max(0, Math.min(attempts, Math.floor(Number(record.correct) || 0)));
        normalized.methodStats[method.id] = { attempts, correct };
      });
    }

    if (Array.isArray(raw.wrongIds)) {
      normalized.wrongIds = Array.from(new Set(raw.wrongIds.filter((id) => problemById.has(id))));
    }
    normalized.completedSessions = Math.max(0, Math.floor(Number(raw.completedSessions) || 0));
    normalized.updatedAt = Number(raw.updatedAt) || null;
    normalized.session = normalizeSession(raw.session);
    return normalized;
  }

  function loadState() {
    if (!storageAvailable()) {
      storageOk = false;
      return defaultState();
    }
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return defaultState();
      }
      return normalizeState(JSON.parse(raw));
    } catch (error) {
      return defaultState();
    }
  }

  function saveState() {
    state.updatedAt = Date.now();
    if (!storageOk) {
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      storageOk = false;
      toast("本地存储不可用，本次进度只在当前页面保留。");
    }
  }

  function updateHeader() {
    const seenCount = Object.keys(state.seen).length;
    const total = problems.length || 60;
    progressLabel.textContent = "已练 " + seenCount + " / " + total;
    const ratio = total ? Math.min(1, seenCount / total) : 0;
    progressFill.style.width = (ratio * 100).toFixed(2) + "%";
  }

  function showMathWarning() {
    if (mathWarningShown) {
      return;
    }
    mathWarningShown = true;
    mathWarning.hidden = false;
  }

  function typesetActiveView() {
    if (!mathReady || !window.MathJax || !window.MathJax.typesetPromise) {
      return;
    }
    mathQueue = mathQueue
      .then(() => {
        const active = document.querySelector(".view-panel:not([hidden])");
        if (!active) {
          return null;
        }
        return window.MathJax.typesetPromise([active]);
      })
      .catch((error) => {
        console.warn("MathJax typeset failed:", error);
      });
  }

  function activateMath() {
    if (!window.MathJax) {
      showMathWarning();
      return;
    }
    const startup = window.MathJax.startup && window.MathJax.startup.promise;
    if (!startup || typeof startup.then !== "function") {
      showMathWarning();
      return;
    }
    startup
      .then(() => {
        mathReady = true;
        typesetActiveView();
      })
      .catch((error) => {
        console.warn("MathJax startup failed:", error);
        showMathWarning();
      });
  }

  function setActiveTab(view) {
    document.querySelectorAll(".view-tab").forEach((button) => {
      const active = button.dataset.view === view;
      button.classList.toggle("is-active", active);
      if (active) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    });
  }

  function setView(view) {
    if (!["practice", "methods", "stats"].includes(view)) {
      return;
    }
    ui.view = view;
    setActiveTab(view);
    practiceView.hidden = view !== "practice";
    methodsView.hidden = view !== "methods";
    statsView.hidden = view !== "stats";
    renderCurrentView();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function renderCurrentView() {
    if (ui.view === "practice") {
      renderPracticeRoot();
    } else if (ui.view === "methods") {
      renderMethods();
    } else {
      renderStats();
    }
  }

  function renderPracticeRoot() {
    if (ui.practiceScreen === "summary" && state.session && state.session.completed) {
      renderSummary();
      return;
    }
    if (ui.practiceScreen === "session" && activeSession()) {
      renderPractice();
      return;
    }
    ui.practiceScreen = "home";
    renderHome();
  }

  function renderHome() {
    const session = activeSession();
    const resume = session
      ? `
        <section class="resume-panel" aria-label="未完成的练习">
          <div>
            <span class="resume-label">未完成</span>
            <h2>${esc(session.label)}</h2>
            <p>已完成 ${session.results.length} / ${session.ids.length} 题，可以接着上次继续。</p>
          </div>
          <div class="resume-actions">
            <button class="btn btn-primary" type="button" data-action="resume-session">继续练习</button>
            <button class="btn" type="button" data-action="drop-session">放弃本组</button>
          </div>
        </section>`
      : "";

    const wrongCount = state.wrongIds.length;

    practiceView.innerHTML = `
      <section class="home-hero">
        <div class="hero-content">
          <p class="eyebrow">高等数学（I）· 第一章 函数与极限</p>
          <h1 class="hero-title">先选方法，<br><em>再算极限。</em></h1>
          <p class="hero-lede">同一道极限，方法选对了，两三步就能结束；选错了，不是算不出来，而是从一开始就走错了方向。这里先让你判断结构、选择方法，再对照完整推导。</p>
          <div class="step-strip" aria-label="练习流程">
            <div class="hero-step"><span>01 看结构</span><strong>极限过程与形式</strong><p>先判断代入后是确定值、0/0、∞/∞，还是 1<sup>∞</sup>。</p></div>
            <div class="hero-step"><span>02 选方法</span><strong>选择一条能走通的路</strong><p>从当题的三个方法中选一个，不需要先报答案。</p></div>
            <div class="hero-step"><span>03 看诊断</span><strong>错因与正确路径</strong><p>选错时说明为什么卡住，并给出完整步骤和讲义依据。</p></div>
          </div>
        </div>
      </section>

      ${resume}

      <div class="section-head">
        <div>
          <h2>开始练习</h2>
          <p>${problems.length} 道题，覆盖 ${methods.length} 类方法；每题只需要做一次方法判断。</p>
        </div>
      </div>

      <div class="mode-grid">
        <article class="mode-card mode-card--primary">
          <p class="mode-kicker">推荐 · 约 10 题</p>
          <h3>综合练习</h3>
          <p>九类方法各出现一次，再随机补一题。优先抽还没练过的题，适合每天一组。</p>
          <button class="btn btn-light" type="button" data-action="start-mode" data-mode="mixed10">开始综合练习</button>
        </article>

        <article class="mode-card">
          <p class="mode-kicker">完整题库</p>
          <h3>全部 ${problems.length} 题</h3>
          <p>把整份题库打散，完整走一遍。适合期末复习或想系统检查方法判断的时候。</p>
          <button class="btn btn-primary" type="button" data-action="start-mode" data-mode="all">开始全部题库</button>
        </article>

        <article class="mode-card">
          <p class="mode-kicker">针对错题</p>
          <h3>错题重练</h3>
          <p>${wrongCount ? "当前有 " + wrongCount + " 道错题。答对后会从错题列表里移除。" : "做错的方法选择题会自动收进这里；目前还没有错题。"}</p>
          <button class="btn" type="button" data-action="start-mode" data-mode="wrong" ${wrongCount ? "" : "disabled"}>重练错题</button>
        </article>

        <article class="mode-card mode-card--quiet">
          <p class="mode-kicker">先看工具，再做题</p>
          <h3>方法手册</h3>
          <p>按“看过程 → 看形式 → 看结构”的顺序整理九类方法，也可以从方法卡进入专项练习。</p>
          <button class="btn" type="button" data-view="methods">打开方法手册</button>
        </article>
      </div>

      <p class="scope-note"><strong>范围说明：</strong>内容依据 2026-10-27 最新讲义，覆盖到连续函数的代值法；不使用洛必达法则、泰勒展开、导数与积分。题库独立于正式习题文件，不改动已有作业与 PDF。</p>
    `;

    typesetActiveView();
  }

  function renderPractice() {
    const session = activeSession();
    const question = currentQuestion();
    if (!session || !question) {
      ui.practiceScreen = "home";
      renderHome();
      return;
    }

    const choice = session.currentChoice;
    const meta = difficultyFor(question.difficulty);
    const options = optionOrder(question);
    const optionHtml = options.map((methodId, index) => {
      const method = methodFor(methodId);
      const selected = choice && choice.methodId === methodId;
      const isCorrect = choice && methodId === question.method;
      const isWrong = selected && !choice.correct;
      const classes = ["option"];
      if (isCorrect) {
        classes.push("is-correct");
      } else if (isWrong) {
        classes.push("is-wrong");
      } else if (choice) {
        classes.push("is-dim");
      }
      let badge = "";
      if (isCorrect) {
        badge = '<span class="option-badge badge-correct">正确方法</span>';
      } else if (isWrong) {
        badge = '<span class="option-badge badge-wrong">你的选择</span>';
      }
      return `
        <button class="${classes.join(" ")}" type="button" data-choice="${esc(methodId)}" ${choice ? "disabled" : ""} aria-pressed="${selected ? "true" : "false"}">
          <span class="option-index" aria-hidden="true">${index + 1}</span>
          <span class="option-body">
            <span class="option-name">${esc(method.name)}</span>
            <span class="option-verb">${esc(method.verb)}</span>
          </span>
          ${badge}
        </button>`;
    }).join("");

    const progressPercent = (session.index / session.ids.length) * 100;
    const questionLabel = "第 " + (session.index + 1) + " / " + session.ids.length + " 题";

    practiceView.innerHTML = `
      <div class="session-toolbar">
        <button class="link-button" type="button" data-action="practice-home">← 练习首页</button>
        <span class="session-pill" title="${esc(session.label)}">${esc(session.label)}</span>
        <span class="session-count">${questionLabel}</span>
      </div>
      <div class="session-progress" aria-hidden="true"><span style="width:${Math.max(2, progressPercent)}%"></span></div>

      <article class="question-card" data-problem-id="${esc(question.id)}">
        <div class="question-meta">
          <span>第 ${session.index + 1} 题</span>
          <span class="difficulty ${meta.className}">${meta.label}</span>
          ${choice ? `<span>· ${esc(question.form)}</span>` : ""}
        </div>

        <div class="formula-box">
          <p class="formula-kicker">${question.form === "递推数列" ? "求该递推数列的极限" : "求下列极限"}</p>
          \\[${esc(question.formula)}\\]
        </div>

        <h2 class="prompt">先判断：这道题应该先采用哪种方法？</h2>
        <p class="question-help">不用先报答案。先看极限过程和函数结构，选一条能走通的路。</p>

        <div class="options" role="group" aria-label="选择方法">
          ${optionHtml}
        </div>

        <div class="hint-row">
          <button class="hint-button" type="button" data-action="toggle-hint" aria-expanded="${ui.hintOpen ? "true" : "false"}">${ui.hintOpen ? "收起提示" : "给我一个结构提示"}</button>
          <span class="keyboard-note">可按 1 / 2 / 3 选择方法</span>
        </div>
        <div class="hint-panel" ${ui.hintOpen ? "" : "hidden"}>${esc(question.hint)}</div>

        <div id="feedback">${choice ? renderFeedback(question, choice) : ""}</div>
      </article>
    `;

    typesetActiveView();
    handlePracticeRender();
  }

  function renderFeedback(question, choice) {
    const correctMethod = methodFor(question.method);
    const chosenMethod = methodFor(choice.methodId);
    const isCorrect = choice.correct;
    const title = isCorrect ? "方法判断正确。" : "这个方法在本题会卡住。";

    const diagnosis = isCorrect
      ? ""
      : `<div class="diagnosis">
          <p class="chosen-method">你的选择：${esc(chosenMethod.name)}</p>
          <p>${esc(question.wrongWhy[choice.methodId] || "这个选项与本题的结构不匹配，换一条路再试。")}</p>
        </div>`;

    const signalItems = question.signals.map((signal) => `<li>${esc(signal)}</li>`).join("");
    const stepItems = question.steps.map((step, index) => `
      <li class="step-item">
        <span class="step-number" aria-hidden="true">${index + 1}</span>
        <div class="step-body">
          <p class="step-title">${esc(step.title)}</p>
          <p class="step-text">${esc(step.text)}</p>
        </div>
      </li>`).join("");

    const isLast = state.session && state.session.index === state.session.ids.length - 1;

    return `
      <section class="feedback ${isCorrect ? "is-ok" : "is-bad"}" aria-live="polite">
        <div class="feedback-head">
          <span class="verdict-icon" aria-hidden="true">${isCorrect ? "✓" : "!"}</span>
          <div>
            <p class="kicker">方法反馈</p>
            <h3 id="feedback-title" tabindex="-1">${title}</h3>
          </div>
        </div>

        ${diagnosis}

        <div class="correct-route">
          <div class="route-top">
            <span>本题应该这样走</span>
            <strong class="method-chip">${esc(correctMethod.name)}</strong>
          </div>
          <p class="route-why">${esc(question.correctWhy)}</p>

          <div class="signals">
            <p class="signals-label">题目给你的信号</p>
            <ul class="signal-list">${signalItems}</ul>
          </div>

          <ol class="steps">${stepItems}</ol>

          <div class="answer-box">
            <span class="answer-label">答案</span>
            <span class="answer-value">${esc(question.answer)}</span>
          </div>

          <p class="pitfall"><strong>易错提醒：</strong>${esc(question.pitfall)}</p>

          <details class="source-details">
            <summary>讲义依据</summary>
            <p>${esc(question.source)}</p>
          </details>
        </div>

        <div class="feedback-actions">
          <button class="btn btn-ghost" type="button" data-action="practice-home">先回首页</button>
          <button class="btn btn-primary" type="button" data-action="next-question">${isLast ? "查看本组总结" : "下一题 →"}</button>
        </div>
      </section>
    `;
  }

  function handlePracticeRender() {
    const shouldFocus = ui.focusFeedback;
    ui.focusFeedback = false;
    if (shouldFocus) {
      window.requestAnimationFrame(() => {
        const heading = document.getElementById("feedback-title");
        if (heading) {
          heading.focus({ preventScroll: true });
        }
        const feedback = document.getElementById("feedback");
        if (feedback) {
          window.setTimeout(() => {
            feedback.scrollIntoView({
              behavior: prefersReducedMotion() ? "auto" : "smooth",
              block: "start"
            });
          }, 140);
        }
      });
    }
    if (ui.scrollAfterNext) {
      ui.scrollAfterNext = false;
      window.requestAnimationFrame(() => {
        const card = document.querySelector(".question-card");
        if (card) {
          card.scrollIntoView({
            behavior: prefersReducedMotion() ? "auto" : "smooth",
            block: "start"
          });
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      });
    }
  }

  function rankedPool(pool) {
    const fresh = shuffle(pool.filter((question) => !state.seen[question.id]));
    const seen = pool
      .filter((question) => Boolean(state.seen[question.id]))
      .slice()
      .sort((left, right) => {
        const a = state.seen[left.id] || { attempts: 0, lastAt: 0 };
        const b = state.seen[right.id] || { attempts: 0, lastAt: 0 };
        if (a.attempts !== b.attempts) {
          return a.attempts - b.attempts;
        }
        return (a.lastAt || 0) - (b.lastAt || 0);
      });
    return fresh.concat(seen);
  }

  function chooseBalancedIds(count) {
    const selected = new Set();
    const methodOrder = shuffle(methods.map((method) => method.id));
    methodOrder.forEach((methodId) => {
      const pick = rankedPool(problems.filter((question) => question.method === methodId))[0];
      if (pick) {
        selected.add(pick.id);
      }
    });
    const remainder = rankedPool(problems.filter((question) => !selected.has(question.id)));
    for (const question of remainder) {
      if (selected.size >= count) {
        break;
      }
      selected.add(question.id);
    }
    return shuffle(Array.from(selected)).slice(0, count);
  }

  function buildSessionIds(mode, methodId) {
    if (mode === "mixed10") {
      return chooseBalancedIds(10);
    }
    if (mode === "all") {
      return shuffle(problems.map((question) => question.id));
    }
    if (mode === "wrong") {
      return shuffle(Array.from(new Set(state.wrongIds)).filter((id) => problemById.has(id)));
    }
    if (mode === "method") {
      if (!methodById.has(methodId)) {
        return [];
      }
      return rankedPool(problems.filter((question) => question.method === methodId))
        .map((question) => question.id);
    }
    return [];
  }

  function confirmReplaceSession() {
    if (!activeSession()) {
      return true;
    }
    return window.confirm("当前还有一组练习没有完成。开始新的练习会放弃本组进度，确定继续吗？");
  }

  function startMode(mode, methodId) {
    if (mode === "wrong" && !state.wrongIds.length) {
      toast("当前还没有错题。");
      return;
    }
    const ids = buildSessionIds(mode, methodId);
    if (!ids.length) {
      toast("这个范围暂时没有可练习的题目。");
      return;
    }
    if (!confirmReplaceSession()) {
      return;
    }

    let label = "综合练习";
    let resolvedMethodId = null;
    if (mode === "all") {
      label = "全部题库";
    } else if (mode === "wrong") {
      label = "错题重练";
    } else if (mode === "method") {
      const method = methodById.get(methodId);
      label = "专项练习 · " + (method ? method.name : "指定方法");
      resolvedMethodId = methodId;
    }

    state.session = {
      mode,
      label,
      methodId: resolvedMethodId,
      ids,
      index: 0,
      results: [],
      currentChoice: null,
      completed: false,
      startedAt: Date.now(),
      completedAt: null
    };
    ui.practiceScreen = "session";
    ui.hintOpen = false;
    ui.focusFeedback = false;
    saveState();
    updateHeader();
    setView("practice");
  }

  function resumeSession() {
    if (!state.session) {
      return;
    }
    if (state.session.completed) {
      ui.practiceScreen = "summary";
    } else {
      ui.practiceScreen = "session";
      ui.hintOpen = false;
    }
    setView("practice");
  }

  function practiceHome() {
    if (state.session && state.session.completed) {
      summaryHome();
      return;
    }
    ui.practiceScreen = "home";
    ui.hintOpen = false;
    setView("practice");
  }

  function dropSession() {
    if (!activeSession()) {
      return;
    }
    if (!window.confirm("确定放弃本组练习吗？本组已经作答记录仍会保留在学习记录里。")) {
      return;
    }
    state.session = null;
    ui.practiceScreen = "home";
    ui.hintOpen = false;
    saveState();
    updateHeader();
    setView("practice");
  }

  function summaryHome() {
    state.session = null;
    ui.practiceScreen = "home";
    ui.hintOpen = false;
    saveState();
    updateHeader();
    setView("practice");
  }

  function chooseMethod(methodId) {
    const session = activeSession();
    const question = currentQuestion();
    if (!session || !question || session.currentChoice) {
      return;
    }
    if (!question.options.includes(methodId)) {
      return;
    }

    const correct = methodId === question.method;
    session.currentChoice = { methodId, correct };
    session.results.push({ id: question.id, selected: methodId, correct });

    const seenRecord = state.seen[question.id] || { attempts: 0, correct: 0, lastAt: 0 };
    seenRecord.attempts += 1;
    if (correct) {
      seenRecord.correct += 1;
    }
    seenRecord.lastAt = Date.now();
    state.seen[question.id] = seenRecord;

    const methodStats = state.methodStats[question.method] || { attempts: 0, correct: 0 };
    methodStats.attempts += 1;
    if (correct) {
      methodStats.correct += 1;
    }
    state.methodStats[question.method] = methodStats;

    const wrongSet = new Set(state.wrongIds);
    if (correct) {
      wrongSet.delete(question.id);
    } else {
      wrongSet.add(question.id);
    }
    state.wrongIds = Array.from(wrongSet);

    ui.hintOpen = false;
    ui.focusFeedback = true;
    saveState();
    updateHeader();
    renderPractice();
  }

  function nextQuestion() {
    const session = activeSession();
    if (!session || !session.currentChoice) {
      return;
    }
    if (session.index >= session.ids.length - 1) {
      session.completed = true;
      session.completedAt = Date.now();
      session.currentChoice = null;
      state.completedSessions += 1;
      ui.practiceScreen = "summary";
      ui.hintOpen = false;
      saveState();
      updateHeader();
      setView("practice");
      return;
    }
    session.index += 1;
    session.currentChoice = null;
    ui.hintOpen = false;
    ui.scrollAfterNext = true;
    saveState();
    setView("practice");
  }

  function renderSummary() {
    const session = state.session;
    if (!session) {
      ui.practiceScreen = "home";
      renderHome();
      return;
    }

    const results = session.results.filter((result) => problemById.has(result.id));
    const correctCount = results.filter((result) => result.correct).length;
    const total = session.ids.length;
    const ratio = total ? Math.round((correctCount / total) * 100) : 0;

    const groups = methods.map((method) => {
      const items = results.filter((result) => {
        const question = problemById.get(result.id);
        return question && question.method === method.id;
      });
      return {
        method,
        total: items.length,
        correct: items.filter((result) => result.correct).length
      };
    }).filter((group) => group.total > 0);

    const breakdown = groups.map((group) => {
      const groupRatio = group.total ? Math.round((group.correct / group.total) * 100) : 0;
      return `
        <div class="breakdown-row">
          <span class="breakdown-name">${esc(group.method.name)}</span>
          <span class="breakdown-rail" aria-hidden="true"><span style="width:${groupRatio}%"></span></span>
          <span class="breakdown-value">${group.correct} / ${group.total}</span>
        </div>`;
    }).join("");

    const weak = groups
      .slice()
      .sort((left, right) => {
        const leftRatio = left.total ? left.correct / left.total : 0;
        const rightRatio = right.total ? right.correct / right.total : 0;
        if (leftRatio !== rightRatio) {
          return leftRatio - rightRatio;
        }
        return right.total - left.total;
      })[0];
    const weakCopy = weak && weak.correct < weak.total
      ? `本组里「${esc(weak.method.name)}」还有 ${weak.total - weak.correct} 题判断错。可以回到方法卡读一遍适用信号，再做一个专项短练。`
      : "本组所有方法判断都正确。可以继续换一组综合练习，检查方法判断是否稳定。";

    const wrongCount = state.wrongIds.length;
    practiceView.innerHTML = `
      <section class="summary-card">
        <p class="summary-eyebrow">本组完成 · ${esc(session.label)}</p>
        <h1 class="summary-score">${correctCount} / ${total}<span>次方法判断正确</span></h1>
        <p class="summary-copy">这里统计的是“先选方法”这一步，不统计数值答案。选错的方法已经把题目收进错题列表，之后可以重练。</p>

        <div class="summary-grid">
          <div class="summary-stat"><strong>${ratio}%</strong><span>本组方法判断正确率</span></div>
          <div class="summary-stat"><strong>${total}</strong><span>本组题目数</span></div>
          <div class="summary-stat"><strong>${wrongCount}</strong><span>当前累计错题</span></div>
        </div>

        <div class="summary-section">
          <h2>本组方法表现</h2>
          <div class="breakdown">${breakdown || '<p class="summary-copy">本组还没有可统计的记录。</p>'}</div>
        </div>

        <div class="summary-section">
          <h2>下一步</h2>
          <div class="weak-card">${weakCopy}</div>
        </div>

        <div class="summary-actions">
          <button class="btn btn-primary" type="button" data-action="start-mode" data-mode="mixed10">再来一组</button>
          <button class="btn" type="button" data-action="start-mode" data-mode="wrong" ${wrongCount ? "" : "disabled"}>重练错题${wrongCount ? "（" + wrongCount + "）" : ""}</button>
          ${weak && weak.correct < weak.total ? `<button class="btn" type="button" data-action="start-method" data-method-id="${esc(weak.method.id)}">专项练「${esc(weak.method.name)}」</button>` : ""}
          <button class="btn btn-ghost" type="button" data-action="summary-home">回到首页</button>
        </div>
      </section>
    `;

    typesetActiveView();
  }

  function renderMethods() {
    const decisionHtml = guide.decision.map((step, index) => `
      <li class="decision-step">
        <span>0${index + 1}</span>
        <h3>${esc(step.title)}</h3>
        <p>${esc(step.text)}</p>
      </li>`).join("");

    const methodHtml = methods.map((method, index) => {
      const questionCount = problems.filter((problem) => problem.method === method.id).length;
      const stats = state.methodStats[method.id] || { attempts: 0, correct: 0 };
      const statText = stats.attempts
        ? "已练 " + stats.attempts + " 次 · 判断正确率 " + formatPercent(stats.correct, stats.attempts)
        : "尚未练习";
      return `
        <article class="method-card">
          <div class="method-top">
            <span class="method-dot" aria-hidden="true"></span>
            <span class="method-number">方法 ${String(index + 1).padStart(2, "0")}</span>
            <span class="method-badge">${questionCount} 题</span>
          </div>
          <h2>${esc(method.name)}</h2>
          <p class="method-summary">${esc(method.summary)}</p>
          <ul class="method-when">
            ${method.when.map((item) => `<li>${esc(item)}</li>`).join("")}
          </ul>
          <details class="method-details">
            <summary>标准步骤、条件与常见错法</summary>
            <h3>标准步骤</h3>
            <ol>${method.steps.map((item) => `<li>${esc(item)}</li>`).join("")}</ol>
            <h3>使用条件</h3>
            <ul>${method.conditions.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
            <h3>常见错法</h3>
            <ul>${method.cautions.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
            <p class="method-source">依据：${esc(method.source)}</p>
          </details>
          <div class="method-footer">
            <button class="btn" type="button" data-action="start-method" data-method-id="${esc(method.id)}">专项练习（${questionCount} 题）</button>
            <span class="method-source">${statText}</span>
          </div>
        </article>`;
    }).join("");

    const compareHtml = guide.comparisons.map((item) => `
      <div class="compare-item">
        <strong>${esc(item.left)} <span aria-hidden="true">／</span> ${esc(item.right)}</strong>
        <p>${esc(item.difference)}</p>
      </div>`).join("");

    methodsView.innerHTML = `
      <p class="eyebrow">方法手册 · 先识别，再选择</p>
      <h1 class="page-heading">看见结构，<br>再选工具。</h1>
      <p class="page-lede">极限题不是先动笔算，而是先判断形式和结构。下面这张流程表不是要你背结论，而是训练你在三个方法选项里排除错误方向。</p>

      <section class="decision-card" aria-labelledby="decision-title">
        <h2 id="decision-title">方法选择流程</h2>
        <p class="page-lede" style="margin-top:4px;font-size:0.85rem;">每一步都先问：现在能不能直接做？如果不能，缺的条件是什么？</p>
        <ol class="decision-list">${decisionHtml}</ol>
      </section>

      <div class="section-head" style="margin-top:30px;">
        <div>
          <h2>九类方法</h2>
          <p>每张卡都能进入该方法的专项练习。</p>
        </div>
      </div>
      <div class="method-grid">${methodHtml}</div>

      <section class="compare-box" aria-labelledby="compare-title">
        <h2 id="compare-title">最容易混的几组</h2>
        <p class="page-lede" style="margin-top:4px;font-size:0.85rem;">先分清工具边界，再谈计算速度。</p>
        <div class="compare-grid">${compareHtml}</div>
      </section>

      <p class="scope-box"><strong>范围提醒</strong>训练器只使用当前讲义已经讲到的工具。洛必达法则和泰勒展开在讲义中被列为后续内容，本训练器不把它们作为方法选项；正式习题与题库也没有被改动。</p>
    `;

    typesetActiveView();
  }

  function renderStats() {
    const seenCount = Object.keys(state.seen).length;
    const records = Object.values(state.seen);
    const attempts = records.reduce((sum, record) => sum + record.attempts, 0);
    const correct = records.reduce((sum, record) => sum + record.correct, 0);
    const wrongCount = state.wrongIds.length;
    const session = activeSession();

    const barHtml = methods.map((method) => {
      const stats = state.methodStats[method.id] || { attempts: 0, correct: 0 };
      const width = stats.attempts ? Math.round((stats.correct / stats.attempts) * 100) : 0;
      return `
        <div class="bar-row">
          <span class="bar-label">${esc(method.name)}</span>
          <span class="bar-track" aria-hidden="true"><span class="bar-fill" style="width:${width}%"></span></span>
          <span class="bar-value">${stats.attempts ? formatPercent(stats.correct, stats.attempts) + " · " + stats.correct + "/" + stats.attempts : "未练"}</span>
        </div>`;
    }).join("");

    const noRecord = attempts === 0;
    statsView.innerHTML = `
      <div class="stats-intro">
        <div>
          <p class="eyebrow">学习记录 · 方法判断</p>
          <h1 class="page-heading" style="font-size:clamp(1.9rem,4vw,2.7rem);">你选择了哪些路？</h1>
          <p class="page-lede">这里记录“方法判断”的正确率，而不是数值答案的得分。错题会在答对后自动移出。</p>
        </div>
        <div class="stats-actions">
          ${session ? `<button class="btn btn-primary" type="button" data-action="resume-session">继续本组</button>` : `<button class="btn btn-primary" type="button" data-action="start-mode" data-mode="mixed10">开始一组</button>`}
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card"><span class="stat-value">${seenCount}</span><span class="stat-label">已练题目 / ${problems.length}</span></div>
        <div class="stat-card"><span class="stat-value">${attempts}</span><span class="stat-label">累计方法判断</span></div>
        <div class="stat-card"><span class="stat-value">${formatPercent(correct, attempts)}</span><span class="stat-label">方法判断正确率</span></div>
        <div class="stat-card"><span class="stat-value">${wrongCount}</span><span class="stat-label">待重练错题</span></div>
      </div>

      ${noRecord ? `
        <div class="empty-state" style="margin-top:18px;">
          <strong>还没有练习记录</strong>
          先做一组综合练习，这里会按方法显示你的选择情况。
          <br><button class="btn btn-primary" type="button" data-action="start-mode" data-mode="mixed10">开始第一组</button>
        </div>` : `
        <section class="stats-panel" aria-labelledby="method-stats-title">
          <div class="stats-panel-head">
            <h2 id="method-stats-title">分方法表现</h2>
            <p>按题目所属方法统计，不是按你选中的错误选项统计</p>
          </div>
          <div class="method-bars">${barHtml}</div>
        </section>
      `}

      <div class="wrong-summary">
        <div>
          <p><strong>${wrongCount}</strong> 道错题在等待重练。重练答对后会从列表移除。</p>
          <p class="storage-note">${storageOk ? "进度保存在本机浏览器。" : "当前浏览器禁止本地存储，进度只在本次打开有效。"}</p>
        </div>
        <button class="btn" type="button" data-action="start-mode" data-mode="wrong" ${wrongCount ? "" : "disabled"}>重练错题</button>
      </div>

      <div class="danger-zone">
        <p>想重新开始全部统计？这会清空进度和错题，不会删除题库。</p>
        <button class="btn btn-danger" type="button" data-action="reset-progress">清空学习记录</button>
      </div>
    `;

    typesetActiveView();
  }

  function resetProgress() {
    if (!window.confirm("确定清空所有练习记录吗？此操作不可撤销。")) {
      return;
    }
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      storageOk = false;
    }
    state = defaultState();
    ui.practiceScreen = "home";
    ui.hintOpen = false;
    ui.focusFeedback = false;
    updateHeader();
    setView("practice");
    toast("学习记录已清空。");
  }

  function handleClick(event) {
    const viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      event.preventDefault();
      setView(viewButton.dataset.view);
      return;
    }

    const option = event.target.closest("[data-choice]");
    if (option && !option.disabled) {
      chooseMethod(option.dataset.choice);
      return;
    }

    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) {
      return;
    }

    const action = actionButton.dataset.action;
    switch (action) {
      case "start-mode":
        startMode(actionButton.dataset.mode);
        break;
      case "start-method":
        startMode("method", actionButton.dataset.methodId);
        break;
      case "resume-session":
        resumeSession();
        break;
      case "practice-home":
        practiceHome();
        break;
      case "drop-session":
        dropSession();
        break;
      case "summary-home":
        summaryHome();
        break;
      case "next-question":
        nextQuestion();
        break;
      case "toggle-hint": {
        ui.hintOpen = !ui.hintOpen;
        actionButton.textContent = ui.hintOpen ? "收起提示" : "给我一个结构提示";
        actionButton.setAttribute("aria-expanded", ui.hintOpen ? "true" : "false");
        const panel = document.querySelector(".hint-panel");
        if (panel) {
          panel.hidden = !ui.hintOpen;
        }
        break;
      }
      case "reset-progress":
        resetProgress();
        break;
      default:
        break;
    }
  }

  function handleKeydown(event) {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }
    if (ui.view !== "practice" || ui.practiceScreen !== "session") {
      return;
    }
    const session = activeSession();
    const question = currentQuestion();
    if (!session || !question) {
      return;
    }
    if (session.currentChoice) {
      if (event.key === "n" || event.key === "N") {
        event.preventDefault();
        nextQuestion();
      }
      return;
    }
    if (!/^[1-3]$/.test(event.key)) {
      return;
    }
    const order = optionOrder(question);
    const methodId = order[Number(event.key) - 1];
    if (methodId) {
      event.preventDefault();
      chooseMethod(methodId);
    }
  }

  function bindEvents() {
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);
  }

  function boot() {
    if (!methods.length || !problems.length) {
      practiceView.innerHTML = `
        <div class="empty-state">
          <strong>题库没有加载成功</strong>
          请确认 <code>data/methods.js</code> 和 <code>data/problems.js</code> 文件完整，再重新打开页面。
        </div>`;
      showMathWarning();
      return;
    }

    state = loadState();
    if (state.session && state.session.completed) {
      ui.practiceScreen = "summary";
    } else {
      ui.practiceScreen = "home";
    }
    bindEvents();
    updateHeader();
    setView("practice");
    activateMath();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
