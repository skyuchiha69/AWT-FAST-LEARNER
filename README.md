# CollegeHub — Student & Course Management System

> **Advanced Web Technology (AWT) Practical Assignment**  
> **School of Information & Communication Technology, GSFC University**  
> Computer Science & Engineering • Semester 5

---

## 📌 Project Overview & Objective

**CollegeHub** is a clean editorial academic administration portal built using **React**, **Vite**, and **Vanilla CSS**. It enables university administrators and academic faculties to manage course curricula, student records, enrollment distributions, and attendance eligibility requirements in real time.

The application satisfies all requirements of the official AWT Practical Assignment while implementing an original visual design distinct from typical glassmorphic interfaces, using a deep navy and warm coral editorial palette with accessible status indicators.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18+ or v20+
- **npm**: v9+ or v10+

### Installation & Execution

1. Clone or navigate to the project directory:
   ```bash
   cd "C:\Users\skyso\OneDrive\Documents\AWT"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Open your browser at **`http://localhost:3000/`**.

4. Run automated unit tests:
   ```bash
   npm test
   ```

5. Build for production:
   ```bash
   npm run build
   ```

---

## 🛠️ Technology Stack

- **React 18**: Component-based user interface architecture
- **React Router 6 (`react-router-dom`)**: Client-side single page routing and nested route management
- **Vite 5**: Next-generation lightning-fast build tool and local dev server
- **Vanilla CSS (Design Tokens)**: Clean editorial SaaS theme with custom CSS variables, accessible contrast ratios, and responsive media queries
- **Lucide React**: Modern SVG icon set
- **Node Test Runner (`node:test`)**: Zero-dependency automated unit testing for attendance boundary logic and storage safety

---

## 🌟 Key Features

### 1. Interactive Academic Dashboard (`/dashboard`)
- Dynamic summary cards: **Total Students**, **Active Courses**, **Eligible Students**, **Attendance Warnings**, and **Detained Students**.
- Real-time **Course Enrollment Distribution** progress bars calculated directly from student arrays.
- **Attendance Eligibility Status** overview with official regulatory guidelines.
- Recent enrollments preview table with direct links to student profiles.
- Quick action modal triggers for enrolling students and creating courses.

### 2. Comprehensive Student Management (`/students`)
- Full CRUD capabilities: **Add**, **Edit**, **Delete** students.
- Search records dynamically by **Student Name**, **Enrollment Number**, or **Email**.
- Multi-dimensional filters: Filter by **Course** or by **Attendance Eligibility Tier**.
- Controlled modal form with field validation:
  - Required fields check
  - Standard email format regex validation
  - Unique enrollment number constraint
  - Semester boundaries (1 to 8)
  - Attendance percentage bounded between 0% and 100%
- Confirmation dialogs for destructive student deletions.

### 3. Academic Course Curriculum (`/courses`)
- Full CRUD capabilities: **Add**, **Edit**, **Delete** courses.
- Search courses by **Course Name** or **Course Code**.
- Filter by **Department** and **Semester**.
- Dynamic badge displaying the count of enrolled students per course.
- **Referential Integrity Protection**: Prevents deleting courses that currently have active enrolled students.

### 4. Detailed Record Views (`/students/:id` & `/courses/:id`)
- **Student Profile**: Shows enrollment ID, email, assigned course link, semester, gender, and attendance status gauge.
- **Course Syllabus & Roster**: Displays course overview, category, instructor, and an interactive roster of all assigned students.
- Designed fallback states for non-existent IDs.

### 5. Attendance & Eligibility Overview (`/attendance-overview`)
- Groups students directly into the university's 3 compliance tiers:
  - **Eligible** (&ge; 75%)
  - **Warning** (60% to 74.9%)
  - **Detained** (&lt; 60%)

### 6. Browser Persistence & State Management
- React Context (`AppContext`) provides unified, clean state access across pages.
- Persistent local storage (`localStorage`) synchronizes student and course records across browser reloads without overwriting user changes.
- Safe JSON parse error handling and storage quota recovery.
- **Reset Demo Data** button in top header to restore the initial test dataset at any time.

---

## 📁 Project Directory Structure

```
AWT/
├── public/
│   └── favicon.svg                  # Academic logo icon
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── AttendanceBadge.jsx  # Accessible status badge
│   │   │   ├── ConfirmDialog.jsx    # Destructive modal confirmation
│   │   │   ├── EmptyState.jsx       # Fallback empty UI
│   │   │   ├── StatCard.jsx         # KPI dashboard metric card
│   │   │   └── ToastContainer.jsx   # Floating notification alerts
│   │   ├── courses/
│   │   │   ├── CourseCard.jsx       # Memoized course card item
│   │   │   └── CourseForm.jsx       # Controlled course modal form
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx        # Master application shell
│   │   │   ├── Header.jsx           # Top header with breadcrumbs & reset
│   │   │   └── Sidebar.jsx          # Collapsible responsive sidebar
│   │   └── students/
│   │       ├── StudentForm.jsx      # Controlled student modal form
│   │       └── StudentTable.jsx     # Memoized table of student records
│   ├── context/
│   │   └── AppContext.jsx           # Global state, actions, and persistence
│   ├── data/
│   │   └── seedData.js              # Initial academic demo records
│   ├── pages/
│   │   ├── AttendanceOverview.jsx   # Three-tier attendance breakdown
│   │   ├── CourseDetails.jsx        # Individual course view & roster
│   │   ├── Courses.jsx              # Course catalog with search & filters
│   │   ├── Dashboard.jsx            # Main overview dashboard
│   │   ├── NotFound.jsx             # 404 fallback page
│   │   ├── StudentDetails.jsx       # Individual student profile view
│   │   └── Students.jsx             # Student directory with search/filters
│   ├── styles/
│   │   ├── components.css           # Forms, modals, cards, badges styling
│   │   ├── global.css               # Resets, typography, utilities
│   │   ├── layout.css               # Sidebar, header, responsive grid
│   │   └── variables.css            # Color tokens and design variables
│   ├── utils/
│   │   ├── attendance.js            # Threshold calculation functions
│   │   └── storage.js               # Safe localStorage wrapper
│   ├── App.jsx                      # Route declarations
│   └── main.jsx                     # Application root render
├── tests/
│   └── unit.test.js                 # Automated tests for boundaries & storage
├── index.html                       # HTML entry point with Google Fonts
├── package.json                     # Scripts and dependencies
└── vite.config.js                   # Vite configuration
```

---

## 🎓 Core React Concepts for Practical Viva

During your AWT Practical Viva examination, be prepared to explain the following concepts implemented in this codebase:

### 1. Functional Components & Props
- **Components** are modular, reusable JavaScript functions that return JSX describing what should appear on the screen (e.g., `StatCard`, `AttendanceBadge`, `CourseCard`).
- **Props** (short for properties) allow parent components to pass data and callback functions down to children in a unidirectional data flow (e.g., passing `student`, `courseName`, `onEdit`, and `onDelete` to `StudentRow`).

### 2. State & React Hooks
- **`useState`**: Manages dynamic component memory (such as modal open/close states, active search queries, or form input values).
- **`useEffect`**: Handles side effects like synchronizing student and course state updates into `localStorage`.
- **`useContext` (`AppContext`)**: Solves "prop drilling" by providing global state (such as `students`, `courses`, `addStudent`, `deleteStudent`) directly to any component that requires it.
- **`useParams` & `useNavigate`**: React Router hooks used in detail pages (`/students/:id`, `/courses/:id`) to extract record IDs from the URL and navigate programmatically.

### 3. Arrays & Event Handling
- Modern array methods are used extensively:
  - **`map()`**: Renders lists of students, courses, options, and stat cards.
  - **`filter()`**: Searches and filters records based on user input queries and dropdown selections.
  - **`find()`**: Locates individual records matching a given ID or ensures no duplicate enrollment numbers exist.
- Standard React synthetic events (`onClick`, `onChange`, `onSubmit`) handle user interaction with form inputs and buttons.

### 4. Controlled Forms & Client-Side Validation
- In controlled components (e.g., `StudentForm`, `CourseForm`), each input's `value` is tied to React state and updated via `onChange`.
- Before state updates are committed, JavaScript validation logic verifies that fields are not empty, emails match valid patterns, semesters fall within 1–8, attendance is between 0–100%, and enrollment numbers are unique.

### 5. Conditional Rendering
- Implemented using ternary operators (`condition ? <ComponentA /> : <ComponentB />`) and logical AND (`condition && <Element />`):
  - Rendering `EmptyState` when search results return 0 items.
  - Displaying different color badges based on `getAttendanceStatus()`.
  - Rendering "Record Not Found" when an invalid ID is provided in the URL.
  - Displaying destructive confirmation modals only when a deletion is triggered.

### 6. Performance Optimization (`React.memo` & `useMemo`)
- **`React.memo`**: Applied to `StudentTable`, `StudentRow`, and `CourseCard`. It skips re-rendering components when their props remain unchanged, preventing redundant DOM re-renders when unrelated parent state changes.
- **`useMemo`**: Applied to derived datasets like `stats` in `Dashboard.jsx` and `filteredStudents` in `Students.jsx`. It caches expensive calculation/filtering results so that filtering and metric calculations only re-run when `students`, `courses`, or the search query actually change.

---

## 📊 Attendance Logic & Thresholds

Defined in [`src/utils/attendance.js`](file:///c:/Users/skyso/OneDrive/Documents/AWT/src/utils/attendance.js):

| Attendance Range | Classification Status | Examination Clearance | Badge Variant |
|:---|:---|:---|:---|
| **&ge; 75%** | **Eligible** | Permitted to sit for all exams | Green (`badge-success`) |
| **60% &le; Attendance &lt; 75%** | **Warning** | Remedial attendance notice | Amber (`badge-warning`) |
| **&lt; 60%** | **Detained** | Barred from regular exams | Red (`badge-danger`) |
