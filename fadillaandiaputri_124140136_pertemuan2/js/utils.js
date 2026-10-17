export const generateId = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

export const todayString = () => {
  const now = new Date();
  const pad = (n) => (n < 10 ? `0${n}` : `${n}`); 
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

export const daysUntil = (dateStr) => {
  const [year, month, day] = dateStr.split('-').map(Number); 
  const target = new Date(year, month - 1, day);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target - today) / 86400000); 
};

export const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
};

export const escapeHTML = (text = '') =>
  String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

export const readJSON = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn(`Gagal membaca "${key}" dari localStorage:`, error);
    return fallback;
  }
};

export const writeJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Gagal menyimpan "${key}" ke localStorage:`, error);
  }
};
