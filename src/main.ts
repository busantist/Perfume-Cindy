import "./style.css";

type Perfume = {
  id: string;
  name: string;
  brand: string;
  category: string;
  notes: string[];
  colors: string[];
};

type RecordEntry = {
  perfumeId: string;
  name: string;
  gradient: string;
};

type StoredData = {
  perfumes: Perfume[];
  records: Record<string, RecordEntry>;
};

const STORAGE_KEY = "perfume_cindy_data_v1";

const defaultPerfumes: Perfume[] = [
  {
    id: "khamrah-lattafa",
    name: "Khamrah (Lattafa)",
    brand: "Lattafa",
    category: "Gourmand",
    notes: [
      "Cinnamon",
      "Nutmeg",
      "Bergamot",
      "Dates",
      "Praline",
      "Tuberose",
      "Mahonial",
      "Vanilla",
      "Tonka Bean",
      "Amberwood",
      "Myrrh",
      "Benzoin",
      "Akigalawood",
    ],
    colors: [],
  },
  {
    id: "liquid-brun",
    name: "Liquid Brun (French Avenue)",
    brand: "French Avenue",
    category: "Gourmand",
    notes: [
      "Cinnamon",
      "Orange Blossom",
      "Cardamom",
      "Bergamot",
      "Bourbon Vanilla",
      "Elemi",
      "Praline",
      "Ambroxan",
      "Guaiac Wood",
      "Musk",
    ],
    colors: [],
  },
  {
    id: "swy-intensely",
    name: "Stronger With You Intensely (Giorgio Armani)",
    brand: "Giorgio Armani",
    category: "Oriental",
    notes: [
      "Pink Pepper",
      "Juniper",
      "Violet",
      "Toffee",
      "Cinnamon",
      "Lavender",
      "Sage",
      "Vanilla",
      "Amber",
      "Tonka Bean",
      "Suede",
    ],
    colors: [],
  },
  {
    id: "khamrah-qahwa",
    name: "Khamrah Qahwa (Lattafa)",
    brand: "Lattafa",
    category: "Gourmand",
    notes: [
      "Cinnamon",
      "Cardamom",
      "Ginger",
      "Praline",
      "Candied Fruits",
      "White Flowers",
      "Vanilla",
      "Coffee",
      "Tonka Bean",
      "Benzoin",
      "Musk",
    ],
    colors: [],
  },
  {
    id: "le-male-elixir",
    name: "Le Male Elixir (Jean Paul Gaultier)",
    brand: "Jean Paul Gaultier",
    category: "Oriental",
    notes: ["Lavender", "Mint", "Vanilla", "Benzoin", "Honey", "Tonka Bean", "Tobacco"],
    colors: [],
  },
  {
    id: "angels-share",
    name: "Angels' Share (By Kilian)",
    brand: "Kilian",
    category: "Gourmand",
    notes: [
      "Cognac",
      "Cinnamon",
      "Tonka Bean",
      "Oak",
      "Hedione",
      "Vanilla",
      "Praline",
      "Sandalwood",
      "Candied Almond",
    ],
    colors: [],
  },
  {
    id: "le-male-le-parfum",
    name: "Le Male Le Parfum (Jean Paul Gaultier)",
    brand: "Jean Paul Gaultier",
    category: "Oriental",
    notes: ["Cardamom", "Lavender", "Iris", "Vanilla", "Oriental Notes", "Woodsy Notes"],
    colors: [],
  },
  {
    id: "imagination-lv",
    name: "Imagination (Louis Vuitton)",
    brand: "Louis Vuitton",
    category: "Fresh",
    notes: [
      "Citron",
      "Calabrian Bergamot",
      "Sicilian Orange",
      "Tunisian Neroli",
      "Nigerian Ginger",
      "Ceylon Cinnamon",
      "Chinese Black Tea",
      "Ambroxan",
      "Guaiac Wood",
      "Olibanum",
    ],
    colors: [],
  },
  {
    id: "y-edp",
    name: "Y Eau de Parfum (Yves Saint Laurent)",
    brand: "Yves Saint Laurent",
    category: "Aromatic",
    notes: [
      "Apple",
      "Ginger",
      "Bergamot",
      "Sage",
      "Juniper Berries",
      "Geranium",
      "Amberwood",
      "Tonka Bean",
      "Cedar",
      "Vetiver",
      "Olibanum",
    ],
    colors: [],
  },
  {
    id: "naxos",
    name: "XJ 1861 Naxos (Xerjoff)",
    brand: "Xerjoff",
    category: "Oriental",
    notes: [
      "Lavender",
      "Bergamot",
      "Lemon",
      "Honey",
      "Cinnamon",
      "Cashmeran",
      "Jasmine Sambac",
      "Tobacco Leaf",
      "Vanilla",
      "Tonka Bean",
    ],
    colors: [],
  },
  {
    id: "by-the-fireplace",
    name: "By the Fireplace (Maison Margiela)",
    brand: "Maison Margiela",
    category: "Woody",
    notes: [
      "Cloves",
      "Pink Pepper",
      "Orange Blossom",
      "Chestnut",
      "Guaiac Wood",
      "Juniper",
      "Vanilla",
      "Peru Balsam",
      "Cashmeran",
    ],
    colors: [],
  },
  {
    id: "club-de-nuit-intense",
    name: "Club de Nuit Intense Man (Armaf)",
    brand: "Armaf",
    category: "Woody",
    notes: [
      "Lemon",
      "Pineapple",
      "Bergamot",
      "Black Currant",
      "Apple",
      "Birch",
      "Jasmine",
      "Rose",
      "Musk",
      "Ambergris",
      "Patchouli",
      "Vanilla",
    ],
    colors: [],
  },
  {
    id: "bianco-latte",
    name: "Bianco Latte (Giardini Di Toscana)",
    brand: "Giardini Di Toscana",
    category: "Gourmand",
    notes: ["Caramel", "Coumarin", "Honey", "Vanilla", "White Musk"],
    colors: [],
  },
  {
    id: "jazz-club",
    name: "Jazz Club (Maison Margiela)",
    brand: "Maison Margiela",
    category: "Woody",
    notes: [
      "Pink Pepper",
      "Neroli",
      "Lemon",
      "Rum",
      "Java Vetiver Oil",
      "Clary Sage",
      "Tobacco Leaf",
      "Vanilla Bean",
      "Styrax",
    ],
    colors: [],
  },
  {
    id: "althair",
    name: "Althaïr (Parfums de Marly)",
    brand: "Parfums de Marly",
    category: "Gourmand",
    notes: [
      "Cinnamon",
      "Cardamom",
      "Orange Blossom",
      "Bergamot",
      "Bourbon Vanilla",
      "Elemi",
      "Praline",
      "Musk",
      "Ambroxan",
      "Guaiac Wood",
      "Tonka",
      "Candied Almond",
    ],
    colors: [],
  },
  {
    id: "tobacco-vanille",
    name: "Tobacco Vanille (Tom Ford)",
    brand: "Tom Ford",
    category: "Oriental",
    notes: [
      "Tobacco Leaf",
      "Spicy Notes",
      "Vanilla",
      "Cacao",
      "Tonka Bean",
      "Tobacco Blossom",
      "Dried Fruits",
      "Woody Notes",
    ],
    colors: [],
  },
  {
    id: "eclaire",
    name: "Eclaire (Lattafa)",
    brand: "Lattafa",
    category: "Gourmand",
    notes: ["Caramel", "Milk", "Sugar", "Honey", "White Flowers", "Vanilla", "Praline", "Musk"],
    colors: [],
  },
  {
    id: "le-beau-le-parfum",
    name: "Le Beau Le Parfum (Jean Paul Gaultier)",
    brand: "Jean Paul Gaultier",
    category: "Fresh",
    notes: [
      "Pineapple",
      "Iris",
      "Ginger",
      "Cypress",
      "Coconut",
      "Woodsy Notes",
      "Tonka Bean",
      "Sandalwood",
      "Amber",
      "Ambergris",
    ],
    colors: [],
  },
  {
    id: "born-in-roma-intense",
    name: "Valentino Uomo Born In Roma Intense",
    brand: "Valentino",
    category: "Aromatic",
    notes: ["Vanilla", "Lavender", "Vetiver"],
    colors: [],
  },
  {
    id: "goddess-burberry",
    name: "Goddess (Burberry)",
    brand: "Burberry",
    category: "Gourmand",
    notes: ["Vanilla", "Lavender", "Cacao", "Ginger", "Vanilla Caviar", "Vanilla Absolute"],
    colors: [],
  },
];

const NOTE_COLORS: Record<string, string> = {
  vanilla: "#f4e1c1",
  "vanilla caviar": "#f0d8b8",
  "vanilla absolute": "#ead2b2",
  "bourbon vanilla": "#f0d6b3",
  tonka: "#d2a46f",
  "tonka bean": "#d2a46f",
  amber: "#d28b3f",
  amberwood: "#c7843f",
  ambergris: "#b38c6a",
  ambroxan: "#b98b54",
  benzoin: "#c69c6d",
  myrrh: "#6b3e2e",
  praline: "#c87f5b",
  caramel: "#d48c5a",
  sugar: "#f3dcc2",
  honey: "#f6c453",
  cacao: "#5a3b2e",
  coffee: "#3b2a1a",
  tobacco: "#7a4e2f",
  "tobacco leaf": "#7a4e2f",
  "tobacco blossom": "#b0765d",
  suede: "#8a5a44",
  leather: "#8a5a44",
  cinnamon: "#b04a2a",
  cardamom: "#7fb069",
  ginger: "#d98b3c",
  pink: "#e06d7b",
  "pink pepper": "#e06d7b",
  cloves: "#7a2f2a",
  nutmeg: "#9a5a32",
  bergamot: "#f0d25b",
  lemon: "#f2dc5d",
  orange: "#f5a623",
  citron: "#f1e06a",
  "sicilian orange": "#f5a623",
  "calabrian bergamot": "#f0d25b",
  pineapple: "#f7d64b",
  apple: "#b5d776",
  "black currant": "#4a2f63",
  "candied fruits": "#f28e8e",
  "dried fruits": "#b5654d",
  lavender: "#b79ad8",
  iris: "#b3a1d6",
  violet: "#8e7bbf",
  rose: "#e58c9f",
  jasmine: "#f7f2e7",
  "jasmine sambac": "#f7f2e7",
  neroli: "#f7f3d7",
  "orange blossom": "#f7f3d7",
  tuberose: "#f3e4f0",
  "white flowers": "#f5f5f0",
  geranium: "#d87093",
  sage: "#9abf9a",
  juniper: "#5e8f7a",
  cypress: "#356b4a",
  vetiver: "#4f6b3a",
  patchouli: "#5a4a36",
  sandalwood: "#c8a277",
  cedar: "#8b6b4f",
  "guaiac wood": "#7a5b45",
  "woodsy notes": "#7a5b45",
  oak: "#8c6a4f",
  "cashmeran": "#6b5a46",
  "peru balsam": "#7a4d3a",
  "black tea": "#5a4a3a",
  "chinese black tea": "#5a4a3a",
  olibanum: "#c9a27a",
  "candied almond": "#e3c09d",
  coconut: "#f0e2c6",
  milk: "#f6efe3",
  coumarin: "#bfa58a",
  rum: "#8f5a3d",
  "java vetiver oil": "#4f6b3a",
  "clary sage": "#9abf9a",
  "styrax": "#6a3f2b",
  dates: "#b06b3f",
  mahonial: "#f0c7c7",
  hedione: "#f7f5e6",
  cognac: "#a3653a",
};

const state = {
  perfumes: [] as Perfume[],
  records: {} as Record<string, RecordEntry>,
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};

const perfumeSelect = document.getElementById("perfumeSelect") as HTMLSelectElement;
const notePreview = document.getElementById("notePreview") as HTMLDivElement;
const saveTodayBtn = document.getElementById("saveToday") as HTMLButtonElement;
const clearTodayBtn = document.getElementById("clearToday") as HTMLButtonElement;
const newNameInput = document.getElementById("newName") as HTMLInputElement;
const newBrandInput = document.getElementById("newBrand") as HTMLInputElement;
const newCategoryInput = document.getElementById("newCategory") as HTMLInputElement;
const newNotesInput = document.getElementById("newNotes") as HTMLInputElement;
const newColorsInput = document.getElementById("newColors") as HTMLInputElement;
const addPerfumeBtn = document.getElementById("addPerfume") as HTMLButtonElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const suggestionList = document.getElementById("perfumeSuggestions") as HTMLDataListElement;
const brandFilter = document.getElementById("brandFilter") as HTMLSelectElement;
const categoryFilter = document.getElementById("categoryFilter") as HTMLSelectElement;
const clearFiltersBtn = document.getElementById("clearFilters") as HTMLButtonElement;
const exportBtn = document.getElementById("exportData") as HTMLButtonElement;
const importBtn = document.getElementById("importData") as HTMLButtonElement;
const dataBox = document.getElementById("dataBox") as HTMLTextAreaElement;
const calendarGrid = document.getElementById("calendarGrid") as HTMLDivElement;
const monthLabel = document.getElementById("monthLabel") as HTMLHeadingElement;
const prevMonthBtn = document.getElementById("prevMonth") as HTMLButtonElement;
const nextMonthBtn = document.getElementById("nextMonth") as HTMLButtonElement;
const todayLabel = document.getElementById("todayLabel") as HTMLDivElement;
const streakLabel = document.getElementById("streakLabel") as HTMLDivElement;

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    state.perfumes = defaultPerfumes.map(normalizePerfume);
    state.records = {};
    return;
  }
  try {
    const parsed = JSON.parse(raw) as StoredData;
    const incoming = parsed.perfumes?.length ? parsed.perfumes : defaultPerfumes;
    state.perfumes = incoming.map(normalizePerfume);
    state.records = parsed.records || {};
  } catch {
    state.perfumes = defaultPerfumes.map(normalizePerfume);
    state.records = {};
  }
}

function saveData() {
  const payload: StoredData = { perfumes: state.perfumes, records: state.records };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function formatDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function normalizeNote(note: string) {
  return note.trim().toLowerCase();
}

function colorForNote(note: string): string | null {
  const key = normalizeNote(note);
  if (NOTE_COLORS[key]) return NOTE_COLORS[key];

  const contains = (fragment: string) => key.includes(fragment);

  if (contains("vanilla")) return NOTE_COLORS.vanilla;
  if (contains("tonka")) return NOTE_COLORS["tonka bean"];
  if (contains("amber")) return NOTE_COLORS.amber;
  if (contains("benzoin")) return NOTE_COLORS.benzoin;
  if (contains("myrrh")) return NOTE_COLORS.myrrh;
  if (contains("praline")) return NOTE_COLORS.praline;
  if (contains("caramel")) return NOTE_COLORS.caramel;
  if (contains("sugar")) return NOTE_COLORS.sugar;
  if (contains("honey")) return NOTE_COLORS.honey;
  if (contains("cacao") || contains("cocoa") || contains("chocolate")) return NOTE_COLORS.cacao;
  if (contains("coffee")) return NOTE_COLORS.coffee;
  if (contains("tobacco")) return NOTE_COLORS.tobacco;
  if (contains("suede") || contains("leather")) return NOTE_COLORS.suede;
  if (contains("cinnamon")) return NOTE_COLORS.cinnamon;
  if (contains("cardamom")) return NOTE_COLORS.cardamom;
  if (contains("ginger")) return NOTE_COLORS.ginger;
  if (contains("pepper")) return NOTE_COLORS["pink pepper"];
  if (contains("clove")) return NOTE_COLORS.cloves;
  if (contains("nutmeg")) return NOTE_COLORS.nutmeg;
  if (contains("bergamot")) return NOTE_COLORS.bergamot;
  if (contains("lemon")) return NOTE_COLORS.lemon;
  if (contains("orange")) return NOTE_COLORS.orange;
  if (contains("citron")) return NOTE_COLORS.citron;
  if (contains("pineapple")) return NOTE_COLORS.pineapple;
  if (contains("apple")) return NOTE_COLORS.apple;
  if (contains("currant")) return NOTE_COLORS["black currant"];
  if (contains("candied")) return NOTE_COLORS["candied fruits"];
  if (contains("dried fruits")) return NOTE_COLORS["dried fruits"];
  if (contains("lavender")) return NOTE_COLORS.lavender;
  if (contains("iris")) return NOTE_COLORS.iris;
  if (contains("violet")) return NOTE_COLORS.violet;
  if (contains("rose")) return NOTE_COLORS.rose;
  if (contains("jasmine")) return NOTE_COLORS.jasmine;
  if (contains("neroli")) return NOTE_COLORS.neroli;
  if (contains("orange blossom")) return NOTE_COLORS["orange blossom"];
  if (contains("tuberose")) return NOTE_COLORS.tuberose;
  if (contains("white flowers")) return NOTE_COLORS["white flowers"];
  if (contains("geranium")) return NOTE_COLORS.geranium;
  if (contains("sage")) return NOTE_COLORS.sage;
  if (contains("juniper")) return NOTE_COLORS.juniper;
  if (contains("cypress")) return NOTE_COLORS.cypress;
  if (contains("vetiver")) return NOTE_COLORS.vetiver;
  if (contains("patchouli")) return NOTE_COLORS.patchouli;
  if (contains("sandalwood")) return NOTE_COLORS.sandalwood;
  if (contains("cedar")) return NOTE_COLORS.cedar;
  if (contains("wood")) return NOTE_COLORS["woodsy notes"];
  if (contains("oak")) return NOTE_COLORS.oak;
  if (contains("cashmeran")) return NOTE_COLORS.cashmeran;
  if (contains("balsam")) return NOTE_COLORS["peru balsam"];
  if (contains("tea")) return NOTE_COLORS["black tea"];
  if (contains("olibanum")) return NOTE_COLORS.olibanum;
  if (contains("almond")) return NOTE_COLORS["candied almond"];
  if (contains("coconut")) return NOTE_COLORS.coconut;
  if (contains("milk")) return NOTE_COLORS.milk;
  if (contains("coumarin")) return NOTE_COLORS.coumarin;
  if (contains("rum")) return NOTE_COLORS.rum;
  if (contains("styrax")) return NOTE_COLORS.styrax;
  if (contains("dates")) return NOTE_COLORS.dates;

  return null;
}

function buildColors(notes: string[]) {
  const colors: string[] = [];
  for (const note of notes) {
    const color = colorForNote(note);
    if (color && !colors.includes(color)) {
      colors.push(color);
    }
    if (colors.length >= 3) break;
  }

  const fallback = ["#f1e7d2", "#d8c3a5", "#bfa58a"];
  while (colors.length < 3) {
    colors.push(fallback[colors.length]);
  }
  return colors;
}

function deriveCategoryFromNotes(notes: string[]) {
  const normalized = notes.map((note) => note.trim().toLowerCase());
  const has = (fragment: string) =>
    normalized.some((note) => note.includes(fragment));

  if (has("vanilla") || has("caramel") || has("praline") || has("honey") || has("tonka")) {
    return "Gourmand";
  }
  if (has("citrus") || has("bergamot") || has("lemon") || has("orange") || has("neroli")) {
    return "Fresh";
  }
  if (has("lavender") || has("sage") || has("geranium") || has("aromatic")) {
    return "Aromatic";
  }
  if (has("wood") || has("cedar") || has("sandalwood") || has("vetiver") || has("patchouli")) {
    return "Woody";
  }
  if (has("amber") || has("benzoin") || has("myrrh") || has("resin") || has("incense")) {
    return "Oriental";
  }
  return "Other";
}

function normalizePerfume(perfume: Perfume): Perfume {
  const colors = perfume.colors?.length ? perfume.colors : buildColors(perfume.notes);
  const brand = perfume.brand?.trim() || "Unknown";
  const category =
    perfume.category?.trim() || deriveCategoryFromNotes(perfume.notes);
  return { ...perfume, colors, brand, category };
}

function buildPerfumeOptions() {
  const query = searchInput.value.trim().toLowerCase();
  perfumeSelect.innerHTML = "";
  state.perfumes
    .filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query);
      const matchesBrand =
        brandFilter.value === "all" || p.brand === brandFilter.value;
      const matchesCategory =
        categoryFilter.value === "all" || p.category === categoryFilter.value;
      return matchesQuery && matchesBrand && matchesCategory;
    })
    .forEach((perfume) => {
      const option = document.createElement("option");
      option.value = perfume.id;
      option.textContent = perfume.name;
      perfumeSelect.appendChild(option);
    });
  updateNotePreview();
}

function buildSuggestionList() {
  suggestionList.innerHTML = "";
  state.perfumes.forEach((perfume) => {
    const option = document.createElement("option");
    option.value = `${perfume.name} — ${perfume.brand}`;
    suggestionList.appendChild(option);
  });
}

function buildFilterOptions() {
  const brands = Array.from(new Set(state.perfumes.map((p) => p.brand))).sort();
  const categories = Array.from(new Set(state.perfumes.map((p) => p.category))).sort();

  brandFilter.querySelectorAll("option:not([value=\"all\"])").forEach((el) => el.remove());
  categoryFilter
    .querySelectorAll("option:not([value=\"all\"])")
    .forEach((el) => el.remove());

  brands.forEach((brand) => {
    const option = document.createElement("option");
    option.value = brand;
    option.textContent = brand;
    brandFilter.appendChild(option);
  });

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function updateNotePreview() {
  const perfume = state.perfumes.find((p) => p.id === perfumeSelect.value);
  if (!perfume) {
    notePreview.textContent = "향수를 선택하세요";
    notePreview.style.background = "transparent";
    return;
  }
  const colors = perfume.colors.length ? perfume.colors : buildColors(perfume.notes);
  const gradient = `linear-gradient(120deg, ${colors.join(", ")})`;
  notePreview.style.background = gradient;
  notePreview.textContent = perfume.notes.join(" · ");
}

function createPerfumeFromInput(): Perfume | null {
  const name = newNameInput.value.trim();
  if (!name) return null;
  const brand = newBrandInput.value.trim() || "Unknown";
  const category = newCategoryInput.value.trim();
  const notes = newNotesInput.value
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);
  const colors = newColorsInput.value
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  if (notes.length === 0) return null;

  return {
    id: `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
    name,
    brand,
    category: category || deriveCategoryFromNotes(notes),
    notes,
    colors: colors.length ? colors : buildColors(notes),
  };
}

function renderCalendar() {
  calendarGrid.innerHTML = "";
  const firstDay = new Date(state.year, state.month, 1);
  const lastDay = new Date(state.year, state.month + 1, 0);
  const startWeekday = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const todayKey = formatDateKey(new Date());

  monthLabel.textContent = `${state.year}년 ${state.month + 1}월`;
  todayLabel.textContent = `오늘: ${todayKey}`;

  const cells = startWeekday + totalDays;
  const rows = Math.ceil(cells / 7) * 7;

  for (let i = 0; i < rows; i += 1) {
    const dayCell = document.createElement("div");
    dayCell.className = "day";

    const date = i - startWeekday + 1;
    if (date <= 0 || date > totalDays) {
      dayCell.classList.add("inactive");
      calendarGrid.appendChild(dayCell);
      continue;
    }

    const dateObj = new Date(state.year, state.month, date);
    const dateKey = formatDateKey(dateObj);
    const record = state.records[dateKey];

    if (dateKey === todayKey) dayCell.classList.add("today");

    const dateLabel = document.createElement("div");
    dateLabel.className = "date";
    dateLabel.textContent = String(date);
    dayCell.appendChild(dateLabel);

    if (record) {
      const perfumeLabel = document.createElement("div");
      perfumeLabel.className = "perfume";
      perfumeLabel.textContent = record.name;
      dayCell.appendChild(perfumeLabel);

      const chip = document.createElement("div");
      chip.className = "color-chip";
      chip.style.background = record.gradient;
      dayCell.appendChild(chip);
    }

    dayCell.addEventListener("click", () => {
      if (!record) return;
      if (confirm(`${dateKey} 기록을 삭제할까요?`)) {
        delete state.records[dateKey];
        saveData();
        renderCalendar();
        updateStreak();
      }
    });

    calendarGrid.appendChild(dayCell);
  }
}

function updateStreak() {
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 366; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const key = formatDateKey(date);
    if (state.records[key]) {
      streak += 1;
    } else {
      break;
    }
  }
  streakLabel.textContent = `연속 기록: ${streak}일`;
}

function saveToday() {
  const perfume = state.perfumes.find((p) => p.id === perfumeSelect.value);
  if (!perfume) return;
  const todayKey = formatDateKey(new Date());
  const colors = perfume.colors.length ? perfume.colors : buildColors(perfume.notes);
  const gradient = `linear-gradient(120deg, ${colors.join(", ")})`;
  state.records[todayKey] = {
    perfumeId: perfume.id,
    name: perfume.name,
    gradient,
  };
  saveData();
  renderCalendar();
  updateStreak();
}

function clearToday() {
  const todayKey = formatDateKey(new Date());
  delete state.records[todayKey];
  saveData();
  renderCalendar();
  updateStreak();
}

function exportData() {
  dataBox.value = JSON.stringify(
    {
      perfumes: state.perfumes,
      records: state.records,
    },
    null,
    2
  );
}

function importData() {
  if (!dataBox.value.trim()) return;
  try {
    const parsed = JSON.parse(dataBox.value) as StoredData;
    if (!parsed.perfumes || !parsed.records) return;
    state.perfumes = parsed.perfumes.map(normalizePerfume);
    state.records = parsed.records;
    saveData();
    buildFilterOptions();
    buildSuggestionList();
    buildPerfumeOptions();
    renderCalendar();
    updateStreak();
  } catch {
    alert("JSON 형식이 올바르지 않습니다.");
  }
}

function bindEvents() {
  perfumeSelect.addEventListener("change", updateNotePreview);
  saveTodayBtn.addEventListener("click", saveToday);
  clearTodayBtn.addEventListener("click", clearToday);
  addPerfumeBtn.addEventListener("click", () => {
    const perfume = createPerfumeFromInput();
    if (!perfume) return;
    state.perfumes.push(normalizePerfume(perfume));
    newNameInput.value = "";
    newBrandInput.value = "";
    newCategoryInput.value = "";
    newNotesInput.value = "";
    newColorsInput.value = "";
    saveData();
    buildFilterOptions();
    buildSuggestionList();
    buildPerfumeOptions();
  });
  searchInput.addEventListener("input", () => {
    const raw = searchInput.value.trim();
    const nameOnly = raw.split(" — ")[0];
    searchInput.value = nameOnly;
    buildPerfumeOptions();
  });
  brandFilter.addEventListener("change", buildPerfumeOptions);
  categoryFilter.addEventListener("change", buildPerfumeOptions);
  clearFiltersBtn.addEventListener("click", () => {
    searchInput.value = "";
    brandFilter.value = "all";
    categoryFilter.value = "all";
    buildPerfumeOptions();
  });
  exportBtn.addEventListener("click", exportData);
  importBtn.addEventListener("click", importData);
  prevMonthBtn.addEventListener("click", () => {
    state.month -= 1;
    if (state.month < 0) {
      state.month = 11;
      state.year -= 1;
    }
    renderCalendar();
  });
  nextMonthBtn.addEventListener("click", () => {
    state.month += 1;
    if (state.month > 11) {
      state.month = 0;
      state.year += 1;
    }
    renderCalendar();
  });
}

function init() {
  loadData();
  buildSuggestionList();
  buildFilterOptions();
  buildPerfumeOptions();
  renderCalendar();
  updateStreak();
  bindEvents();
}

init();
