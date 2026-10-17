import { generateId, todayString, daysUntil, readJSON, writeJSON } from './utils.js';

const STORAGE_KEY = 'dashboard-tugas-v1';
const QUOTE_KEY = 'dashboard-kutipan-v1';
const QUOTE_URL = 'https://dummyjson.com/quotes/random';

const FALLBACK_QUOTE = {
  quote: 'Mulailah dari mana kamu berada, gunakan apa yang kamu punya, lakukan apa yang kamu bisa.',
  author: 'Arthur Ashe',
};

export class TaskItem {
  constructor({
    id = generateId(),
    title,
    course = '',
    deadline = '',
    done = false,
    createdAt = new Date().toISOString(),
  }) {
    this.id = id;
    this.title = title;
    this.course = course;
    this.deadline = deadline; 
    this.done = done;
    this.createdAt = createdAt;
  }

  get status() {
    if (this.done) return 'selesai';
    if (!this.deadline) return 'tanpa-deadline';
    const sisa = daysUntil(this.deadline);
    if (sisa < 0) return 'terlambat';
    if (sisa === 0) return 'hari-ini';
    if (sisa <= 3) return 'segera';
    return 'aman';
  }

  get statusLabel() {
    if (this.done) return 'Selesai';
    if (!this.deadline) return 'Tanpa deadline';
    const sisa = daysUntil(this.deadline);
    if (sisa < 0) return `Terlambat ${Math.abs(sisa)} hari`;
    if (sisa === 0) return 'Hari ini!';
    return `H-${sisa}`;
  }

  static fromObject(obj) {
    return new TaskItem(obj);
  }
}

export class DashboardApp {
  constructor() {
    this.tasks = this.loadTasks();
  }

  loadTasks() {
    const saved = readJSON(STORAGE_KEY, []);
    return saved.map(TaskItem.fromObject);
  }

  saveTasks() {
    writeJSON(STORAGE_KEY, this.tasks);
  }

  addTask({ title, course, deadline }) {
    const task = new TaskItem({ title, course, deadline });
    this.tasks = [...this.tasks, task];
    this.saveTasks();
    return task;
  }

  updateTask(id, changes) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? TaskItem.fromObject({ ...task, ...changes }) : task
    );
    this.saveTasks();
  }

  toggleTask(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) this.updateTask(id, { done: !task.done });
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  clearCompleted() {
    this.tasks = this.tasks.filter((task) => !task.done);
    this.saveTasks();
  }

  getTask(id) {
    return this.tasks.find((task) => task.id === id);
  }

  getVisibleTasks(filter = 'semua', sortBy = 'deadline') {
    const filtered = this.tasks.filter((task) => {
      if (filter === 'aktif') return !task.done;
      if (filter === 'selesai') return task.done;
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'terbaru') return new Date(b.createdAt) - new Date(a.createdAt);
      if (!a.deadline && !b.deadline) return 0;
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return new Date(a.deadline) - new Date(b.deadline);
    });
  }

  getStats() {
    const total = this.tasks.length;
    const selesai = this.tasks.filter((t) => t.done).length;
    const terlambat = this.tasks.filter((t) => t.status === 'terlambat').length;
    const mendesak = this.tasks.filter((t) => ['hari-ini', 'segera'].includes(t.status)).length;
    const persen = total === 0 ? 0 : Math.round((selesai / total) * 100);

    const perMatkul = this.tasks
      .filter((t) => !t.done && t.course)
      .reduce((acc, { course }) => {
        const sudahAda = acc.find((item) => item.course === course);
        if (!sudahAda) return [...acc, { course, jumlah: 1 }];
        return acc.map((item) =>
          item.course === course ? { ...item, jumlah: item.jumlah + 1 } : item
        );
      }, []);

    return { total, selesai, aktif: total - selesai, terlambat, mendesak, persen, perMatkul };
  }

  async fetchQuote(forceRefresh = false) {
    const today = todayString();
    const cached = readJSON(QUOTE_KEY);

    if (!forceRefresh && cached && cached.date === today) {
      return cached.data;
    }

    try {
      const response = await fetch(QUOTE_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const { quote, author } = await response.json(); 
      const data = { quote, author };
      writeJSON(QUOTE_KEY, { date: today, data });
      return data;
    } catch (error) {
      console.error('Gagal mengambil kutipan:', error.message);
      const lastQuote = cached ? cached.data : FALLBACK_QUOTE;
      return { ...lastQuote, offline: true };
    }
  }
}

export const getGreeting = (hour = new Date().getHours()) => {
  if (hour < 11) return 'Selamat pagi';
  if (hour < 15) return 'Selamat siang';
  if (hour < 18) return 'Selamat sore';
  return 'Selamat malam';
};
