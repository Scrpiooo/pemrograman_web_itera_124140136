import { DashboardApp, getGreeting } from './app.js';
import { escapeHTML, formatDate } from './utils.js';

const app = new DashboardApp();

let currentFilter = 'semua';
let currentSort = 'deadline';
let editingId = null; 

const $ = (selector) => document.querySelector(selector);
const els = {
  today: $('#today'),
  greeting: $('#greeting'),
  quoteText: $('#quoteText'),
  quoteAuthor: $('#quoteAuthor'),
  quoteBtn: $('#quoteBtn'),
  ring: $('#ring'),
  stats: $('#stats'),
  courses: $('#courses'),
  form: $('#taskForm'),
  formTitle: $('#formTitle'),
  title: $('#title'),
  course: $('#course'),
  deadline: $('#deadline'),
  submitBtn: $('#submitBtn'),
  cancelBtn: $('#cancelBtn'),
  newTaskBtn: $('#newTaskBtn'),
  sortSelect: $('#sortSelect'),
  filters: $('#filters'),
  taskList: $('#taskList'),
  clearDoneBtn: $('#clearDoneBtn'),
};

const renderTask = ({ id, title, course, deadline, done, status, statusLabel }) => `
  <li class="task ${done ? 'is-done' : ''}" data-id="${id}">
    <input type="checkbox" class="task-check" data-action="toggle" ${done ? 'checked' : ''}
      aria-label="Tandai selesai: ${escapeHTML(title)}">
    <div class="task-body">
      <p class="task-title">${escapeHTML(title)}</p>
      <p class="task-meta">
        ${course ? `<span>${escapeHTML(course)}</span>` : ''}
        ${deadline ? `<span>${formatDate(deadline)}</span>` : ''}
      </p>
    </div>
    <span class="badge badge-${status}">${statusLabel}</span>
    <div class="task-actions">
      <button type="button" class="icon-btn" data-action="edit">Edit</button>
      <button type="button" class="icon-btn danger" data-action="delete">Hapus</button>
    </div>
  </li>`;

const renderStats = ({ total, selesai, aktif, terlambat, mendesak }) => {
  const items = [
    { label: 'Belum selesai', value: aktif },
    { label: 'Mendesak (≤ 3 hari)', value: mendesak, tone: mendesak ? 'warn' : '' },
    { label: 'Terlambat', value: terlambat, tone: terlambat ? 'danger' : '' },
    { label: 'Selesai', value: `${selesai}/${total}` },
  ];

  els.stats.innerHTML = items
    .map(({ label, value, tone = '' }) => `
      <div class="stat ${tone}">
        <span class="stat-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        <div>
          <p class="stat-value">${value}</p>
          <p class="stat-label">${label}</p>
        </div>
      </div>`)
    .join('');
};

const renderRing = ({ persen, selesai, total }) => {
  els.ring.innerHTML = `
    <div class="ring-wrap" role="img" aria-label="${persen}% tugas selesai">
      <svg viewBox="0 0 120 120" class="ring-svg" aria-hidden="true">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#a66cff"/>
            <stop offset="1" stop-color="#f06bb0"/>
          </linearGradient>
        </defs>
        <circle class="ring-track" cx="60" cy="60" r="50" pathLength="100"/>
        <circle class="ring-value" cx="60" cy="60" r="50" pathLength="100"
          stroke-dasharray="${persen} 100"/>
      </svg>
      <div class="ring-center"><strong>${persen}%</strong><span>Selesai</span></div>
    </div>
    <p class="ring-caption">${selesai} dari ${total} tugas selesai</p>
  `;
};

const renderCourses = ({ perMatkul }) => {
  const max = Math.max(...perMatkul.map(({ jumlah }) => jumlah), 1);

  els.courses.innerHTML = perMatkul.length
    ? perMatkul
        .map(({ course, jumlah }) => `
          <li>
            <div class="course-row"><span>${escapeHTML(course)}</span><span>${jumlah} tugas</span></div>
            <div class="bar"><div style="width: ${(jumlah / max) * 100}%"></div></div>
          </li>`)
        .join('')
    : '<li class="empty">Belum ada tugas aktif dengan mata kuliah.</li>';
};

const emptyMessages = {
  semua: 'Belum ada tugas. Tambahkan tugas pertamamu di form sebelah.',
  aktif: 'Tidak ada tugas yang belum selesai. Mantap!',
  selesai: 'Belum ada tugas yang selesai.',
};

const render = () => {
  const tasks = app.getVisibleTasks(currentFilter, currentSort);
  const stats = app.getStats();

  els.taskList.innerHTML = tasks.length
    ? tasks.map(renderTask).join('')
    : `<li class="empty">${emptyMessages[currentFilter]}</li>`;

  renderStats(stats);
  renderRing(stats);
  renderCourses(stats);

  const counts = { semua: stats.total, aktif: stats.aktif, selesai: stats.selesai };
  els.filters.querySelectorAll('[data-count]').forEach((badge) => {
    badge.textContent = counts[badge.dataset.count];
  });

  els.clearDoneBtn.classList.toggle('hidden', !app.tasks.some((t) => t.done));

  els.filters.querySelectorAll('.nav-item').forEach((item) => {
    item.classList.toggle('active', item.dataset.filter === currentFilter);
  });
};

const resetForm = () => {
  editingId = null;
  els.form.reset();
  els.formTitle.textContent = 'Tambah Tugas';
  els.submitBtn.textContent = 'Tambah';
  els.cancelBtn.classList.add('hidden');
};

const startEdit = (id) => {
  const task = app.getTask(id);
  if (!task) return;

  const { title, course, deadline } = task; 
  editingId = id;
  els.title.value = title;
  els.course.value = course;
  els.deadline.value = deadline;
  els.formTitle.textContent = 'Edit Tugas';
  els.submitBtn.textContent = 'Simpan perubahan';
  els.cancelBtn.classList.remove('hidden');
  els.title.focus();
};

els.form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = {
    title: els.title.value.trim(),
    course: els.course.value.trim(),
    deadline: els.deadline.value,
  };
  if (!data.title) return;

  if (editingId) {
    app.updateTask(editingId, data);
  } else {
    app.addTask(data);
  }
  resetForm();
  render();
});

els.cancelBtn.addEventListener('click', resetForm);

els.newTaskBtn.addEventListener('click', () => {
  resetForm();
  els.title.scrollIntoView({ behavior: 'smooth', block: 'center' });
  els.title.focus();
});

els.taskList.addEventListener('click', ({ target }) => {
  const taskEl = target.closest('.task'); // elemen <li> tempat tombol berada
  const action = target.dataset.action;
  if (!taskEl || !action) return;
  const id = taskEl.dataset.id;

  if (action === 'toggle') {
    app.toggleTask(id);
  } else if (action === 'edit') {
    startEdit(id);
    return;
  } else if (action === 'delete') {
    if (!confirm('Hapus tugas ini?')) return;
    app.deleteTask(id);
    if (editingId === id) resetForm();
  }
  render();
});

els.filters.addEventListener('click', ({ target }) => {
  const button = target.closest('[data-filter]'); 
  if (!button) return;
  currentFilter = button.dataset.filter;
  render();
});

els.sortSelect.addEventListener('change', ({ target }) => {
  currentSort = target.value;
  render();
});

els.clearDoneBtn.addEventListener('click', () => {
  if (!confirm('Hapus semua tugas yang sudah selesai?')) return;
  app.clearCompleted();
  render();
});

const loadQuote = async (forceRefresh = false) => {
  els.quoteBtn.disabled = true;
  els.quoteText.textContent = 'Memuat kutipan...';

  const { quote, author, offline } = await app.fetchQuote(forceRefresh);

  els.quoteText.textContent = `“${quote}”`;
  els.quoteAuthor.textContent = `— ${author}${offline ? ' (mode offline)' : ''}`;
  els.quoteBtn.disabled = false;
};

els.quoteBtn.addEventListener('click', () => loadQuote(true));

const init = () => {
  const tanggal = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  els.today.textContent = tanggal;
  els.greeting.textContent = `${getGreeting()}, Fadilla!`;

  render();
  loadQuote();
};

init();
