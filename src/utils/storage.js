/**
 * LocalStorage wrapper with error tolerance and type safety.
 * Handles storage quotas, privacy modes, and corrupt JSON safely.
 */

export function loadData(key, fallbackData = []) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallbackData;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.warn(`[Storage] Corrupt non-array item for key "${key}". Using fallback.`);
      return fallbackData;
    }
    return parsed;
  } catch (err) {
    console.error(`[Storage] Failed to read key "${key}":`, err);
    return fallbackData;
  }
}

export function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error(`[Storage] Failed to persist key "${key}":`, err);
    return false;
  }
}

export function isStorageCorrupt(key) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return false;
    const parsed = JSON.parse(raw);
    return !Array.isArray(parsed);
  } catch {
    return true;
  }
}
