"use strict";

const english = {
  skip: "Skip to content",
  navFeatures: "Features",
  navStart: "Get started",
  navOpen: "Open source",
  releaseBadge: "Version 1.2.5 · Open source",
  heroTitle: "Keep the little things.",
  heroDescription1: "From a simple hello to a whole collection of moments.",
  heroDescription2:
    "Keep your conversations, photos, and everyday memories on your own computer.",
  downloadWindows: "Download for Windows",
  installer: "Windows installer",
  installerDetail: "1.2.5 · x64 · 62.9 MB",
  portable: "Windows portable",
  portableDetail: "Extract the complete folder · 74.8 MB",
  checksums: "View SHA-256 checksums",
  tryDemo: "Explore the demo",
  systemNote: "Windows 10 1809+ / 11 · x64 · For WeChat 4.x",
  sessions: "Chats",
  moments: "Moments",
  stickers: "Stickers",
  demoLabel: "Interactive preview · Fictional data",
  demoProfile: "Moect demo",
  localLibrary: "Local library",
  library: "LIBRARY",
  onDevice: "On your device",
  appearance: "Appearance",
  demoHint: "Try switching between chats, moments, and stickers",
  realScreenshots: "See the real app",
  featuresEyebrow: "FOR THE EVERYDAY WORTH KEEPING",
  featuresTitle: "More than chats. A little of life.",
  featuresDescription:
    "A lasting home for the things you already know by heart.",
  archiveTitle: "Back to that conversation",
  archiveDescription:
    "Keep text, photos, voice messages, and forwarded chats together. Open the exported HTML and revisit them offline.",
  chat1: "A walk in the mountains this weekend?",
  chat2: "Yes! I’ll bring a camera and hot coffee.",
  searchMemory: "Find a little moment",
  archiveFootnote: "Search · Filter by date · Read offline",
  exportTitle: "A format that fits your plans",
  exportDescription:
    "Readable HTML for revisiting memories. Structured data for organizing and analysis. Seven formats, more possibilities.",
  exportFootnote: "Optional ZIP archives and AES-256 encryption",
  momentsTitle: "A place for your favorites, too",
  momentsDescription:
    "Organize locally cached Moments and sticker collections. Photo grids, interactions, and tiny expressions, all in place.",
  momentText:
    "Nine little moments from the weekend. Keeping the views we love.",
  momentsFootnote: "Organize by account, date, and collection",
  personalTitle: "Made for your little preferences",
  personalDescription:
    "Eight accent colors, in light and dark. Let the app and your HTML archives feel a little more like you.",
  yourMemories: "Your memories. Your colors.",
  personalFootnote: "Try a color that feels like you",
  pauseMotion: "Pause ambient and demo animations",
  resumeMotion: "Resume ambient and demo animations",
  localEyebrow: "YOURS, RIGHT WHERE YOU ARE",
  localTitle: "Let your memories settle in.",
  localDescription:
    "Chat databases and messages are processed on your computer. The project has no server that receives chat history. Choose where to save your archives, then revisit them offline.",
  localPoint1: "Read and process on your device",
  localPoint2: "Choose your archive and cache locations",
  localPoint3: "Read exported archives offline",
  dataDetails: "How your data is handled",
  startEyebrow: "YOUR FIRST LITTLE COLLECTION",
  startTitle: "Three steps. A home for your memories.",
  step1Title: "Install and connect",
  step1Description:
    "Install Moect, sign in to desktop WeChat, and select Connect. You can also start with the app’s fictional demo data.",
  step2Title: "Choose what to keep",
  step2Description:
    "Pick chats, Moments, or stickers. Choose a format, a date range, and any archive options you need.",
  step3Title: "Open and revisit",
  step3Description:
    "Open the exported files from Tasks. Keep the HTML and resource folders together for offline reading.",
  guidePrompt: "Looking for more details?",
  guideLink: "Read the full guide",
  openTitle: "Open by nature. Better together.",
  openDescription:
    "Moect is open source under GPL-3.0. Explore the code, share feedback, or help make it a little better.",
  sourceTitle: "Start with the source",
  sourceDescription:
    "Clone the project and follow the build guide to set up your development environment.",
  buildGuide: "Build guide",
  releaseTitle: "A little better for your everyday",
  releaseDescription:
    "Chat categories, queued exports, Excel, encrypted ZIP archives, and a more comfortable reading experience.",
  releaseLink: "What’s new in this release",
  releaseDate: "Released November 6, 2026",
  viewGithub: "View on GitHub",
  feedback: "Feedback & ideas",
  support: "Support the project",
  faqTitle: "A few things before you begin.",
  moreQuestions: "Ask another question",
  faq1q: "Which systems and WeChat versions are supported?",
  faq1a:
    "Moect supports Windows 10 1809 or newer and Windows 11 x64, with Microsoft Edge WebView2. It targets Windows WeChat 4.x. WeChat updates may affect compatibility. Check the repository for current details.",
  faq2q: "Can it save every photo, video, and Moment?",
  faq2a:
    "Availability depends on local caches, available credentials, and the original files. Browse the Moments you need in WeChat first, then refresh the snapshot in Moect. Unavailable attachments show their status. Expired remote content may be unrecoverable.",
  faq3q: "How do I read exported HTML offline?",
  faq3a:
    "Keep the HTML, message chunks, and resource folders together. Open the HTML in a browser to search, filter by date, expand forwarded chats, print, or save as PDF.",
  faq4q: "What is the difference between installer and portable?",
  faq4a:
    "The installer offers an installation location and desktop shortcuts, and prepares WebView2 when needed. For the portable version, extract the complete folder, run Moect.exe, and keep the _internal folder alongside it. WebView2 must already be installed.",
  closingTitle: "A home of your own, for your memories.",
  closingDescription: "Start keeping the little things you want to keep.",
  downloadMoect: "Download Moect",
  closingMeta: "Open source · On-device processing · Windows x64",
  footerTagline: "Conversations, moments, and stickers. Yours to keep.",
  license: "License",
  credits: "Credits",
  siteSource: "Site source",
  footerNote:
    "Moect is an independent community project. Accounts, messages, landscapes, and interactive previews on this page are fictional demonstrations.",
  screenshotsTitle: "Meet the real Moect",
  galleryMoments: "Moments & stickers",
  galleryArchive: "Offline archives",
  galleryExport: "Export & organize",
  galleryNote:
    "Official Moect promotional screenshots. All content uses fictional demo data.",
  supportDescription:
    "A star, a little feedback, or a cup of coffee. Thank you for helping Moect grow.",
  supportReadme: "See support details on GitHub",
};

const chinese = Object.fromEntries(
  [...document.querySelectorAll("[data-i18n]")].map((element) => [
    element.dataset.i18n,
    element.textContent,
  ]),
);
chinese.resumeMotion = "继续背景与演示动效";

const demoText = {
  zh: {
    search: "搜索会话名称…",
    allChats: "全部会话",
    recent: "最近",
    noResults: "没有找到匹配的演示会话",
    group: "群聊 · 3 条演示会话",
    friend: "好友 · 演示会话",
    export: "导出 HTML 示例",
    localNote: "演示界面 · 示例可导出为独立的离线 HTML",
    momentHeading: "我的朋友圈",
    momentSubheading: "把喜欢的风景，留在自己这里。",
    collectionNote: "此处展示虚构内容，实际软件读取本机缓存。",
    stickersHeading: "收藏的小表情",
    stickersSubheading: "有些心情，一个小表情就刚刚好。",
    stickerGroups: ["我收藏的表情", "自定义表情", "快乐充电站"],
    stickerUnit: "张表情",
    downloadReady: "已准备好示例归档，可离线打开",
    copied: "命令已复制",
    copyFailed: "复制未完成，请手动选择命令",
    accent: "当前预览",
    themeDark: "切换为深色演示",
    themeLight: "切换为浅色演示",
  },
  en: {
    search: "Search demo chats…",
    allChats: "All chats",
    recent: "Recent",
    noResults: "No matching demo chats",
    group: "Group · 3 demo conversations",
    friend: "Friend · Demo conversation",
    export: "Export sample HTML",
    localNote: "Fictional preview · Export a standalone, offline HTML sample",
    momentHeading: "My Moments",
    momentSubheading: "Keeping a few favorite views close.",
    collectionNote:
      "This is fictional content. The desktop app reads your local cache.",
    stickersHeading: "A few favorite expressions",
    stickersSubheading: "Sometimes a little expression says it all.",
    stickerGroups: [
      "Favorite stickers",
      "Custom stickers",
      "A little recharge",
    ],
    stickerUnit: "stickers",
    downloadReady: "Your sample archive is ready to open offline",
    copied: "Command copied",
    copyFailed: "Please select and copy the command manually",
    accent: "Preview color",
    themeDark: "Switch demo to dark mode",
    themeLight: "Switch demo to light mode",
  },
};

const conversations = [
  {
    id: "weekend",
    avatar: "周",
    color: "#6d568e",
    group: true,
    zh: {
      name: "周末出走计划",
      time: "周五",
      preview: "把这些小小的日常，好好留下来。",
      sender: "林间",
    },
    en: {
      name: "Weekend escape",
      time: "Fri",
      preview: "Let’s keep these little everyday moments.",
      sender: "Lin",
    },
    messages: {
      zh: [
        { text: "周末去山里走走吧，天气正好。" },
        { text: "好呀，带上相机和热咖啡。", me: true },
        { image: true },
        { text: "把这些小小的日常，好好留下来。", me: true },
      ],
      en: [
        { text: "A walk in the mountains this weekend?" },
        { text: "Yes! I’ll bring a camera and hot coffee.", me: true },
        { image: true },
        { text: "Let’s keep these little everyday moments.", me: true },
      ],
    },
  },
  {
    id: "lin",
    avatar: "林",
    color: "#506d63",
    group: false,
    zh: {
      name: "林间",
      time: "周四",
      preview: "等你下次来，再一起慢慢走。",
      sender: "林间",
    },
    en: {
      name: "Lin",
      time: "Thu",
      preview: "Another slow walk next time you visit.",
      sender: "Lin",
    },
    messages: {
      zh: [
        { text: "今天回来的路上，晚霞特别好看。" },
        { image: true },
        { text: "收到一份今天的小美好。", me: true },
        { text: "等你下次来，再一起慢慢走。" },
      ],
      en: [
        { text: "The sunset on my way home was lovely." },
        { image: true },
        { text: "A little piece of today. Thank you.", me: true },
        { text: "Another slow walk next time you visit." },
      ],
    },
  },
  {
    id: "coffee",
    avatar: "咖",
    color: "#795c48",
    group: true,
    zh: {
      name: "咖啡与散步",
      time: "周三",
      preview: "好，那我们周六上午见。",
      sender: "小满",
    },
    en: {
      name: "Coffee & a walk",
      time: "Wed",
      preview: "Saturday morning it is.",
      sender: "Mia",
    },
    messages: {
      zh: [
        { text: "周末那家小店，听说开了新的窗边座位。" },
        { text: "想去。再点一份热乎乎的可颂。", me: true },
        { text: "咖啡、散步，还有一个不用赶时间的下午。" },
        { text: "好，那我们周六上午见。", me: true },
      ],
      en: [
        { text: "The little café has new window seats." },
        { text: "Let’s go. And get a warm croissant.", me: true },
        { text: "Coffee, a walk, and no reason to rush." },
        { text: "Saturday morning it is.", me: true },
      ],
    },
  },
];

function readPreference(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Preferences are optional. */
  }
}

const state = {
  language: readPreference("moect-site-language") === "en" ? "en" : "zh",
  tab: "sessions",
  conversation: "weekend",
  query: "",
  demoTheme: readPreference("moect-demo-theme") === "light" ? "light" : "dark",
  motionPaused: readPreference("moect-motion-paused") === "true",
};
const panel = document.querySelector("#demo-panel");
const appWindow = document.querySelector(".app-window");
const downloadToggle = document.querySelector("#download-toggle");
const downloadMenu = document.querySelector("#download-menu");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const narrowScreen = matchMedia("(max-width: 760px)");
let toastTimeout;

function translation(key) {
  return (
    (state.language === "en" ? english : chinese)[key] || chinese[key] || key
  );
}

function icon(name) {
  return `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
}

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("is-visible"), 3500);
}

function setDownloadMenu(open, restoreFocus = false) {
  downloadToggle.setAttribute("aria-expanded", String(open));
  downloadMenu.hidden = !open;
  if (restoreFocus) downloadToggle.focus();
}

downloadToggle.addEventListener("click", () =>
  setDownloadMenu(downloadMenu.hidden),
);
downloadToggle.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    setDownloadMenu(true);
    downloadMenu.querySelector("a").focus();
  }
});
downloadMenu.addEventListener("keydown", (event) => {
  const links = [...downloadMenu.querySelectorAll("a")];
  const index = links.indexOf(document.activeElement);
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const offset = event.key === "ArrowDown" ? 1 : -1;
    links[(index + offset + links.length) % links.length].focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".download-wrap")) setDownloadMenu(false);
  if (!event.target.closest(".site-header")) closeMobileMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!downloadMenu.hidden) setDownloadMenu(false, true);
    if (!mobileNav.hidden) {
      closeMobileMenu();
      mobileMenuToggle.focus();
    }
  }
});
downloadMenu.addEventListener("focusout", (event) => {
  if (
    event.relatedTarget &&
    !document.querySelector(".download-wrap").contains(event.relatedTarget)
  ) {
    setDownloadMenu(false);
  }
});

function closeMobileMenu() {
  mobileNav.hidden = true;
  mobileMenuToggle.setAttribute("aria-expanded", "false");
}

mobileMenuToggle.addEventListener("click", () => {
  const open = mobileNav.hidden;
  mobileNav.hidden = !open;
  mobileMenuToggle.setAttribute("aria-expanded", String(open));
});
mobileNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMobileMenu();
});
function updateHeader() {
  document
    .querySelector("#site-header")
    .classList.toggle("is-scrolled", scrollY > 72);
}
addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

function renderSessions() {
  const copy = demoText[state.language];
  panel.innerHTML = `<div class="session-view">
    <div class="session-list">
      <label class="session-search">${icon("search")}<input id="session-search" type="search" aria-label="${copy.search}" placeholder="${copy.search}" value="${escapeHtml(state.query)}" autocomplete="off"></label>
      <div class="session-list-caption"><span>${copy.allChats}</span><span>${copy.recent}</span></div>
      <div id="session-items"></div>
    </div>
    <div id="conversation" class="conversation"></div>
  </div>`;
  renderSessionItems();
  renderConversation();
  document
    .querySelector("#session-search")
    .addEventListener("input", (event) => {
      state.query = event.target.value;
      renderSessionItems();
    });
}

function renderSessionItems() {
  const query = state.query.trim().toLocaleLowerCase();
  const filtered = conversations.filter((chat) =>
    `${chat.zh.name} ${chat.en.name}`.toLocaleLowerCase().includes(query),
  );
  const list = document.querySelector("#session-items");
  list.innerHTML =
    filtered
      .map((chat) => {
        const detail = chat[state.language];
        return `<button class="session-item" type="button" data-conversation="${chat.id}" aria-pressed="${state.conversation === chat.id}">
      <span class="avatar" style="background:${chat.color}">${chat.avatar}</span>
      <span><span class="session-name">${detail.name}<small>${detail.time}</small></span><span class="session-last">${detail.preview}</span></span>
    </button>`;
      })
      .join("") ||
    `<p class="session-empty">${demoText[state.language].noResults}</p>`;
  list.querySelectorAll("[data-conversation]").forEach((button) => {
    button.addEventListener("click", () => {
      state.conversation = button.dataset.conversation;
      list.querySelectorAll("[data-conversation]").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      renderConversation();
    });
  });
}

function renderConversation() {
  const chat = conversations.find((item) => item.id === state.conversation);
  const detail = chat[state.language];
  const copy = demoText[state.language];
  const me = state.language === "en" ? "Me" : "我";
  document.querySelector("#conversation").innerHTML = `
    <div class="conversation-head"><div><strong>${detail.name}</strong><small>${chat.group ? copy.group : copy.friend}</small></div><button type="button" class="demo-export" data-export>${icon("download")}<span>${copy.export}</span></button></div>
    <div class="messages"><div class="chat-date">2026 / 10 / 30</div>${chat.messages[
      state.language
    ]
      .map(
        (message) => `
      <div class="chat-row${message.me ? " is-me" : ""}">
        <span class="avatar" style="background:${message.me ? "#506d63" : chat.color}">${message.me ? me : detail.sender[0]}</span>
        <div class="chat-content">${message.me ? "" : `<small>${detail.sender}</small>`}${message.image ? `<img class="chat-photo" src="assets/weekend.svg" width="188" height="103" alt="${state.language === "en" ? "Illustrated mountain sunset" : "虚构的山间日落插画"}">` : `<span class="chat-bubble">${message.text}</span>`}</div>
      </div>`,
      )
      .join("")}</div>
    <div class="conversation-footer">${icon("shield")}<span>${copy.localNote}</span></div>`;
  document
    .querySelector("[data-export]")
    .addEventListener("click", exportSample);
}

function landscapeGrid() {
  return `<div class="landscape-grid">${Array.from({ length: 9 }, (_, index) => `<img src="assets/weekend.svg" width="85" height="85" alt="${state.language === "en" ? "Fictional landscape" : "虚构风景"} ${index + 1}">`).join("")}</div>`;
}

function renderMoments() {
  const copy = demoText[state.language];
  panel.innerHTML = `<div class="collection-view">
    <div class="collection-heading"><div><h3>${copy.momentHeading}</h3><p>${copy.momentSubheading}</p></div>${icon("grid")}</div>
    <div class="demo-moment-card"><div class="moment-author"><span class="avatar">林</span><div><strong>${state.language === "en" ? "Lin" : "林间"}</strong><small>2026.11.01</small></div></div>
    <p>${translation("momentText")}</p>${landscapeGrid()}<div class="moment-likes">${icon("heart")}<span>${state.language === "en" ? "Chen, Mia, River, Yu" : "陈一、小满、沈河、阿柚"}</span></div></div>
    <p class="collection-note">${copy.collectionNote}</p>
  </div>`;
}

function renderStickers() {
  const copy = demoText[state.language];
  const faces = [": )", "^ · ^", "( ˘ ˘ )"];
  const colors = ["#c4a1d3", "#b3bc95", "#d1ad83"];
  const counts = [86, 42, 32];
  panel.innerHTML = `<div class="collection-view">
    <div class="collection-heading"><div><h3>${copy.stickersHeading}</h3><p>${copy.stickersSubheading}</p></div>${icon("smile")}</div>
    <div class="sticker-collections">${copy.stickerGroups.map((name, index) => `<article class="sticker-set"><div class="sticker-face" style="--sticker-color:${colors[index]}" aria-hidden="true">${faces[index]}</div><strong>${name}</strong><small>${counts[index]} ${copy.stickerUnit}</small></article>`).join("")}</div>
    <p class="collection-note">${copy.collectionNote}</p>
  </div>`;
}

function renderDemo() {
  document.querySelector("#app-page-title").textContent = translation(
    state.tab,
  );
  panel.setAttribute("aria-labelledby", `tab-${state.tab}`);
  document.querySelectorAll("[data-tab]").forEach((button) => {
    const selected = button.dataset.tab === state.tab;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  if (state.tab === "sessions") renderSessions();
  if (state.tab === "moments") renderMoments();
  if (state.tab === "stickers") renderStickers();
}

document.querySelectorAll("[data-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    state.tab = button.dataset.tab;
    renderDemo();
  });
  button.addEventListener("keydown", (event) => {
    const previousKeys = ["ArrowLeft", "ArrowUp"];
    const nextKeys = ["ArrowRight", "ArrowDown"];
    if (![...previousKeys, ...nextKeys, "Home", "End"].includes(event.key))
      return;
    event.preventDefault();
    const tabs = [...document.querySelectorAll("[data-tab]")];
    const index = tabs.indexOf(button);
    let destination =
      (index + (previousKeys.includes(event.key) ? -1 : 1) + tabs.length) %
      tabs.length;
    if (event.key === "Home") destination = 0;
    if (event.key === "End") destination = tabs.length - 1;
    state.tab = tabs[destination].dataset.tab;
    renderDemo();
    tabs[destination].focus();
  });
});

function updateTabOrientation() {
  document
    .querySelector(".app-tabs")
    .setAttribute(
      "aria-orientation",
      narrowScreen.matches ? "horizontal" : "vertical",
    );
  if (!narrowScreen.matches) closeMobileMenu();
}
narrowScreen.addEventListener("change", updateTabOrientation);
updateTabOrientation();

function setDemoTheme(theme) {
  state.demoTheme = theme;
  appWindow.dataset.demoTheme = theme;
  const toggle = document.querySelector("#demo-theme-toggle");
  toggle.setAttribute(
    "aria-label",
    demoText[state.language][theme === "dark" ? "themeLight" : "themeDark"],
  );
  toggle.innerHTML = icon(theme === "dark" ? "sun" : "moon");
  savePreference("moect-demo-theme", theme);
}
document.querySelector("#demo-theme-toggle").addEventListener("click", () => {
  setDemoTheme(state.demoTheme === "dark" ? "light" : "dark");
});

const accentNamesEnglish = [
  "Wisteria",
  "Blue sky",
  "Sea salt",
  "Forest",
  "Autumn",
  "Rose",
  "Sunset",
  "Mountain",
];
document.querySelectorAll("[data-accent]").forEach((button, index) => {
  button.addEventListener("click", () => {
    document.documentElement.style.setProperty(
      "--accent",
      button.dataset.accent,
    );
    document
      .querySelectorAll("[data-accent]")
      .forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
    const name =
      state.language === "en"
        ? accentNamesEnglish[index]
        : button.dataset.accentName;
    document.querySelector("#accent-label").textContent =
      `${demoText[state.language].accent} · ${name}`;
  });
});

function updateMotion() {
  document.body.classList.toggle(
    "motion-paused",
    state.motionPaused || reducedMotion.matches,
  );
  const button = document.querySelector("#motion-toggle");
  button.setAttribute("aria-pressed", String(state.motionPaused));
  button.querySelector("span").textContent = translation(
    state.motionPaused ? "resumeMotion" : "pauseMotion",
  );
  button
    .querySelector("use")
    .setAttribute("href", state.motionPaused ? "#i-play" : "#i-pause");
  button.hidden = reducedMotion.matches;
}
document.querySelector("#motion-toggle").addEventListener("click", () => {
  state.motionPaused = !state.motionPaused;
  savePreference("moect-motion-paused", String(state.motionPaused));
  updateMotion();
});
reducedMotion.addEventListener("change", updateMotion);

function setLanguage(language) {
  state.language = language;
  document.documentElement.lang = language === "en" ? "en" : "zh-CN";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translation(element.dataset.i18n);
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.language === language),
    );
  });
  document.title =
    language === "en"
      ? "Moect · Keep the little things"
      : "Moect · 把日常，好好留下来";
  const labels =
    language === "en"
      ? {
          ".mobile-menu-toggle": "Toggle navigation",
          "#download-toggle": "More download options",
          "#demo-panel": "Interactive demo panel",
          ".app-window": "Interactive Moect preview with fictional data",
          ".desktop-nav": "Primary navigation",
          "#mobile-nav": "Mobile navigation",
          ".app-tabs": "Demo categories",
          ".accent-picker": "Preview accent colors",
          ".gallery-tabs": "App screenshots",
          "[data-copy]": "Copy Git clone command",
          "#gallery-dialog .dialog-close": "Close screenshot preview",
          "#support-dialog .dialog-close": "Close support dialog",
        }
      : {
          ".mobile-menu-toggle": "展开或收起导航",
          "#download-toggle": "其他下载选项",
          "#demo-panel": "交互演示面板",
          ".app-window": "Moect 交互演示，所有数据均为虚构",
          ".desktop-nav": "主导航",
          "#mobile-nav": "手机导航",
          ".app-tabs": "演示分类",
          ".accent-picker": "预览主题色",
          ".gallery-tabs": "软件截图",
          "[data-copy]": "复制 Git 克隆命令",
          "#gallery-dialog .dialog-close": "关闭截图预览",
          "#support-dialog .dialog-close": "关闭支持窗口",
        };
  Object.entries(labels).forEach(([selector, label]) =>
    document.querySelector(selector).setAttribute("aria-label", label),
  );
  document.querySelectorAll("[data-accent]").forEach((button, index) => {
    button.setAttribute(
      "aria-label",
      language === "en" ? accentNamesEnglish[index] : button.dataset.accentName,
    );
  });
  renderDemo();
  setDemoTheme(state.demoTheme);
  updateMotion();
  savePreference("moect-site-language", language);
}
document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      showToast(demoText[state.language].copied);
    } catch {
      showToast(demoText[state.language].copyFailed);
    }
  });
});

const gallery = document.querySelector("#gallery-dialog");
document
  .querySelector("#show-screenshots")
  .addEventListener("click", () => gallery.showModal());
document
  .querySelector("#support-button")
  .addEventListener("click", () =>
    document.querySelector("#support-dialog").showModal(),
  );
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    const outside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;
    if (event.target === dialog && outside) dialog.close();
  });
});
document.querySelectorAll("[data-gallery]").forEach((button) => {
  button.addEventListener("click", () => {
    const image = document.querySelector("#gallery-image");
    image.src = `assets/features-${button.dataset.gallery}.webp`;
    image.alt = `${translation("screenshotsTitle")} · ${button.textContent} · ${translation("demoLabel")}`;
    document
      .querySelectorAll("[data-gallery]")
      .forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
  });
});

function exportSample() {
  const chat = conversations.find((item) => item.id === state.conversation);
  const detail = chat[state.language];
  const landscape =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 440"><defs><linearGradient id="s" x2="0" y2="1"><stop stop-color="#7773b4"/><stop offset="1" stop-color="#f5d0af"/></linearGradient></defs><path fill="url(#s)" d="M0 0h800v440H0z"/><circle cx="550" cy="180" r="46" fill="#fff0c9"/><path d="M0 300 140 202 310 305 438 247 620 337 800 230V440H0Z" fill="#777d9c"/><path d="M0 370 175 293 340 374 550 282 800 360V440H0Z" fill="#4d526f"/></svg>';
  const image = `data:image/svg+xml,${encodeURIComponent(landscape)}`;
  const demoNote =
    state.language === "en"
      ? "Fictional Moect website demo. This file is self-contained and can be read offline."
      : "Moect 网站虚构演示归档。本文件自包含，可离线阅读。";
  const me = state.language === "en" ? "Me" : "我";
  const messages = chat.messages[state.language]
    .map(
      (message) =>
        `<article class="message${message.me ? " me" : ""}"><small>${escapeHtml(message.me ? me : detail.sender)}</small>${message.image ? `<img src="${image}" alt="${state.language === "en" ? "Mountain illustration" : "山间日落插画"}">` : `<p>${escapeHtml(message.text)}</p>`}</article>`,
    )
    .join("");
  const html = `<!doctype html><html lang="${state.language === "en" ? "en" : "zh-CN"}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(detail.name)} · Moect</title><style>body{margin:0;background:#f7f5fa;color:#352d41;font:15px/1.8 system-ui,sans-serif}main{max-width:650px;margin:auto;padding:40px 24px}h1{font-size:24px;font-weight:500}header>p,footer{font-size:12px;color:#8e809a}header{border-bottom:1px solid #e6dfec;padding-bottom:20px;margin-bottom:28px}.message{margin:22px 0;max-width:85%}.message small{color:#96859f;font-size:11px}.message p{background:#ede7f3;padding:12px 16px;border-radius:3px 13px 13px;margin:7px 0}.message.me{margin-left:auto}.message.me small{display:block;text-align:right}.message.me p{background:#e1d9f0;border-radius:13px 3px 13px 13px}.message img{display:block;width:280px;max-width:100%;border-radius:12px;margin-top:7px}footer{margin-top:40px;border-top:1px solid #e6dfec;padding-top:20px}a{color:#8b6cb2}</style><main><header><h1>${escapeHtml(detail.name)}</h1><p>2026 / 10 / 30 · Moect</p></header>${messages}<footer>${demoNote}<br><a href="https://mofan6.github.io/">Moect</a></footer></main></html>`;
  const url = URL.createObjectURL(
    new Blob([html], { type: "text/html;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download =
    state.language === "en"
      ? "Moect-sample-archive.html"
      : "Moect-示例归档.html";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
  showToast(demoText[state.language].downloadReady);
}

if ("IntersectionObserver" in window && !reducedMotion.matches) {
  document.documentElement.classList.add("js-motion");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((element) => observer.observe(element));
}

setLanguage(state.language);
