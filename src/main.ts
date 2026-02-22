import "./style.css";

type Perfume = {
  id: string;
  name: string;
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
    id: "rose-vanilla",
    name: "Rose Vanilla",
    notes: ["Rose", "Vanilla", "Musk"],
    colors: ["#f4a1b5", "#f6d365", "#c7f9cc"],
  },
  {
    id: "citrus-neroli",
    name: "Citrus Neroli",
    notes: ["Bergamot", "Neroli", "Musk"],
    colors: ["#ffe066", "#ffd6a5", "#caffbf"],
  },
  {
    id: "woody-amber",
    name: "Woody Amber",
    notes: ["Cedar", "Amber", "Patchouli"],
    colors: ["#b08968", "#f4a261", "#6d597a"],
  },
];

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
const newNotesInput = document.getElementById("newNotes") as HTMLInputElement;
const newColorsInput = document.getElementById("newColors") as HTMLInputElement;
const addPerfumeBtn = document.getElementById("addPerfume") as HTMLButtonElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
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
    state.perfumes = [...defaultPerfumes];
    state.records = {};
    return;
  }
  try {
    const parsed = JSON.parse(raw) as StoredData;
    state.perfumes = parsed.perfumes?.length ? parsed.perfumes : [...defaultPerfumes];
    state.records = parsed.records || {};
  } catch {
    state.perfumes = [...defaultPerfumes];
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

function buildPerfumeOptions() {
  const query = searchInput.value.trim().toLowerCase();
  perfumeSelect.innerHTML = "";
  state.perfumes
    .filter((p) => p.name.toLowerCase().includes(query))
    .forEach((perfume) => {
      const option = document.createElement("option");
      option.value = perfume.id;
      option.textContent = perfume.name;
      perfumeSelect.appendChild(option);
    });
  updateNotePreview();
}

function updateNotePreview() {
  const perfume = state.perfumes.find((p) => p.id === perfumeSelect.value);
  if (!perfume) {
    notePreview.textContent = "향수를 선택하세요";
    notePreview.style.background = "transparent";
    return;
  }
  const gradient = `linear-gradient(120deg, ${perfume.colors.join(", ")})`;
  notePreview.style.background = gradient;
  notePreview.textContent = perfume.notes.join(" · ");
}

function createPerfumeFromInput(): Perfume | null {
  const name = newNameInput.value.trim();
  if (!name) return null;
  const notes = newNotesInput.value
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);
  const colors = newColorsInput.value
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  if (notes.length === 0 || colors.length === 0) return null;

  return {
    id: `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
    name,
    notes,
    colors,
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
  const gradient = `linear-gradient(120deg, ${perfume.colors.join(", ")})`;
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
    state.perfumes = parsed.perfumes;
    state.records = parsed.records;
    saveData();
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
    state.perfumes.push(perfume);
    newNameInput.value = "";
    newNotesInput.value = "";
    newColorsInput.value = "";
    saveData();
    buildPerfumeOptions();
  });
  searchInput.addEventListener("input", buildPerfumeOptions);
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
  buildPerfumeOptions();
  renderCalendar();
  updateStreak();
  bindEvents();
}

init();
