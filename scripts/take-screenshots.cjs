const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const BROWSER_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE_URL = 'http://localhost:3000';
const OUT_DIR = path.resolve(__dirname, '..', 'screenshots');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function clickButtonByText(page, text) {
  return page.evaluate((targetText) => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find((b) => b.textContent.trim().toLowerCase().includes(targetText.toLowerCase()));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  }, text);
}

async function main() {
  console.log('Launching browser from:', BROWSER_PATH);
  const browser = await puppeteer.launch({
    executablePath: BROWSER_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();

  // Desktop viewport: 1440 x 900
  await page.setViewport({ width: 1440, height: 900 });

  console.log('--- Phase 1: Desktop Screenshots ---');

  // 01: Dashboard Overview
  console.log('Capturing 01-dashboard-overview.png...');
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle0' });
  await sleep(600);
  await page.screenshot({ path: path.join(OUT_DIR, '01-dashboard-overview.png') });

  // 02: Dashboard Bento Grid (scrolled down)
  console.log('Capturing 02-dashboard-bento-grid.png...');
  await page.evaluate(() => window.scrollTo(0, 420));
  await sleep(400);
  await page.screenshot({ path: path.join(OUT_DIR, '02-dashboard-bento-grid.png') });
  await page.evaluate(() => window.scrollTo(0, 0));

  // 03: Students Page
  console.log('Capturing 03-students-page.png...');
  await page.goto(`${BASE_URL}/students`, { waitUntil: 'networkidle0' });
  await sleep(500);
  await page.screenshot({ path: path.join(OUT_DIR, '03-students-page.png') });

  // 04: Add Student Form Modal
  console.log('Capturing 04-student-add-form.png...');
  await clickButtonByText(page, 'Add student');
  await sleep(500);
  await page.screenshot({ path: path.join(OUT_DIR, '04-student-add-form.png') });
  await clickButtonByText(page, 'Cancel');
  await sleep(400);

  // 05: Edit Student Form Modal
  console.log('Capturing 05-student-edit-form.png...');
  await page.evaluate(() => {
    const editBtn = document.querySelector('.row-actions button[title="Edit student"]');
    if (editBtn) editBtn.click();
  });
  await sleep(500);
  await page.screenshot({ path: path.join(OUT_DIR, '05-student-edit-form.png') });
  await clickButtonByText(page, 'Cancel');
  await sleep(400);

  // 06: Student Search Results (actual typing triggering React state)
  console.log('Capturing 06-student-search-results.png...');
  await page.focus('.search input');
  await page.keyboard.type('Sharma');
  await sleep(500);
  await page.screenshot({ path: path.join(OUT_DIR, '06-student-search-results.png') });

  // 07: Student Course Filter
  console.log('Capturing 07-student-course-filter.png...');
  // Clear search input using keyboard
  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');
  await page.keyboard.press('Backspace');
  await sleep(200);

  // Select first course in select element via native setter
  await page.evaluate(() => {
    const sel = document.querySelector('.toolbar select');
    if (sel && sel.options.length > 1) {
      sel.value = sel.options[1].value;
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await sleep(500);
  await page.screenshot({ path: path.join(OUT_DIR, '07-student-course-filter.png') });

  // Reset filter
  await page.evaluate(() => {
    const sel = document.querySelector('.toolbar select');
    if (sel) {
      sel.value = '';
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await sleep(300);

  // 08: Student Details (Aarav Sharma - Eligible record)
  console.log('Capturing 08-student-details.png...');
  await page.goto(`${BASE_URL}/students/student-2024-001`, { waitUntil: 'networkidle0' });
  await sleep(500);
  await page.screenshot({ path: path.join(OUT_DIR, '08-student-details.png') });

  // 09: Courses Page
  console.log('Capturing 09-courses-page.png...');
  await page.goto(`${BASE_URL}/courses`, { waitUntil: 'networkidle0' });
  await sleep(500);
  await page.screenshot({ path: path.join(OUT_DIR, '09-courses-page.png') });

  // 10: Add Course Form Modal
  console.log('Capturing 10-add-course-form.png...');
  await clickButtonByText(page, 'Add course');
  await sleep(500);
  await page.screenshot({ path: path.join(OUT_DIR, '10-add-course-form.png') });
  await clickButtonByText(page, 'Cancel');
  await sleep(400);

  // 11: Course Details (Advanced Web Technology)
  console.log('Capturing 11-course-details.png...');
  await page.goto(`${BASE_URL}/courses/course-awt-501`, { waitUntil: 'networkidle0' });
  await sleep(500);
  await page.screenshot({ path: path.join(OUT_DIR, '11-course-details.png') });

  // 12: Attendance Overview
  console.log('Capturing 12-attendance-overview.png...');
  await page.goto(`${BASE_URL}/attendance-overview`, { waitUntil: 'networkidle0' });
  await sleep(500);
  await page.screenshot({ path: path.join(OUT_DIR, '12-attendance-overview.png') });

  // 13: Attendance Eligible Section
  console.log('Capturing 13-attendance-eligible.png...');
  await page.evaluate(() => {
    const tables = document.querySelectorAll('.tile-flush');
    if (tables[2]) tables[2].scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await sleep(400);
  await page.screenshot({ path: path.join(OUT_DIR, '13-attendance-eligible.png') });

  // 14: Attendance Warning Section
  console.log('Capturing 14-attendance-warning.png...');
  await page.evaluate(() => {
    const tables = document.querySelectorAll('.tile-flush');
    if (tables[1]) tables[1].scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await sleep(400);
  await page.screenshot({ path: path.join(OUT_DIR, '14-attendance-warning.png') });

  // 15: Attendance Detained Section
  console.log('Capturing 15-attendance-detained.png...');
  await page.evaluate(() => {
    const tables = document.querySelectorAll('.tile-flush');
    if (tables[0]) tables[0].scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await sleep(400);
  await page.screenshot({ path: path.join(OUT_DIR, '15-attendance-detained.png') });

  // 16: Delete Confirmation Modal
  console.log('Capturing 16-delete-confirmation.png...');
  await page.goto(`${BASE_URL}/students`, { waitUntil: 'networkidle0' });
  await sleep(400);
  await page.evaluate(() => {
    const delBtn = document.querySelector('.row-actions button[title="Delete student"]');
    if (delBtn) delBtn.click();
  });
  await sleep(500);
  await page.screenshot({ path: path.join(OUT_DIR, '16-delete-confirmation.png') });
  await clickButtonByText(page, 'Cancel');
  await sleep(400);

  // 17: Empty Search Results
  console.log('Capturing 17-empty-search-results.png...');
  await page.focus('.search input');
  await page.keyboard.type('XYZNonExistentRecord999');
  await sleep(500);
  await page.screenshot({ path: path.join(OUT_DIR, '17-empty-search-results.png') });

  console.log('--- Phase 2: Mobile Viewport Screenshots (390 x 844) ---');
  await page.setViewport({ width: 390, height: 844 });

  // 18: Mobile Dashboard
  console.log('Capturing 18-mobile-dashboard.png...');
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle0' });
  await sleep(500);
  await page.screenshot({ path: path.join(OUT_DIR, '18-mobile-dashboard.png') });

  // 19: Mobile Students Page
  console.log('Capturing 19-mobile-students-page.png...');
  await page.goto(`${BASE_URL}/students`, { waitUntil: 'networkidle0' });
  await sleep(500);
  await page.screenshot({ path: path.join(OUT_DIR, '19-mobile-students-page.png') });

  // 20: Mobile Courses Page
  console.log('Capturing 20-mobile-courses-page.png...');
  await page.goto(`${BASE_URL}/courses`, { waitUntil: 'networkidle0' });
  await sleep(500);
  await page.screenshot({ path: path.join(OUT_DIR, '20-mobile-courses-page.png') });

  console.log('SUCCESS: All 20 screenshots updated perfectly!');
  await browser.close();
}

main().catch((err) => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
