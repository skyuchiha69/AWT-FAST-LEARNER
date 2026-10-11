import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getAttendanceStatus } from '../src/utils/attendance.js';
import { loadData, saveData, isStorageCorrupt } from '../src/utils/storage.js';

test('Attendance boundary values and status classification', () => {
  // >= 75%: Eligible
  assert.equal(getAttendanceStatus(75), 'Eligible');
  assert.equal(getAttendanceStatus(75.5), 'Eligible');
  assert.equal(getAttendanceStatus(88), 'Eligible');
  assert.equal(getAttendanceStatus(100), 'Eligible');

  // >= 60% and < 75%: Warning
  assert.equal(getAttendanceStatus(60), 'Warning');
  assert.equal(getAttendanceStatus(65), 'Warning');
  assert.equal(getAttendanceStatus(74.9), 'Warning');
  assert.equal(getAttendanceStatus(74), 'Warning');

  // < 60%: Detained
  assert.equal(getAttendanceStatus(59.9), 'Detained');
  assert.equal(getAttendanceStatus(59), 'Detained');
  assert.equal(getAttendanceStatus(45), 'Detained');
  assert.equal(getAttendanceStatus(0), 'Detained');

  // Invalid / bounds checks
  assert.equal(getAttendanceStatus(-1), 'Invalid');
  assert.equal(getAttendanceStatus(101), 'Invalid');
  assert.equal(getAttendanceStatus('abc'), 'Invalid');
  assert.equal(getAttendanceStatus(null), 'Invalid');
  assert.equal(getAttendanceStatus(''), 'Invalid');
});

test('Storage safely preserves arrays, recovers from corrupt JSON, and handles quota exceptions', () => {
  let mockStore = {};

  // Mock global localStorage
  globalThis.localStorage = {
    getItem: (key) => mockStore[key] ?? null,
    setItem: (key, val) => {
      mockStore[key] = String(val);
    },
    removeItem: (key) => {
      delete mockStore[key];
    },
  };

  // 1. Initial fallback load
  const fallback = [{ id: 1, name: 'Sample' }];
  assert.deepEqual(loadData('test_key', fallback), fallback);

  // 2. Successful save and reload
  const savedList = [{ id: 2, name: 'Student B' }];
  const saveOk = saveData('test_key', savedList);
  assert.equal(saveOk, true);
  assert.deepEqual(loadData('test_key', fallback), savedList);

  // 3. Corrupt non-array or invalid JSON recovery
  mockStore['test_key'] = '{ bad json';
  assert.deepEqual(loadData('test_key', fallback), fallback);
  assert.equal(isStorageCorrupt('test_key'), true);

  mockStore['test_key'] = JSON.stringify({ notAnArray: true });
  assert.deepEqual(loadData('test_key', fallback), fallback);
  assert.equal(isStorageCorrupt('test_key'), true);

  // 4. Quota exceeded or permission denied simulation
  globalThis.localStorage.setItem = () => {
    throw new Error('QuotaExceededError');
  };
  assert.equal(saveData('test_key', savedList), false);
});
