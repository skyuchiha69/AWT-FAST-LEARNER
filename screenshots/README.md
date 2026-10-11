# CollegeHub — Visual Documentation & Screenshots Index

This directory contains real browser screenshots captured from the running **CollegeHub — Student & Course Management System** (Advanced Web Technology Practical Assignment).

All screenshots demonstrate the **Modern Retro Editorial** visual theme featuring a warm ivory light-theme surface palette (`#F5F2EA`), **DM Serif Display** headings, **Inter** body typography, **DM Mono** numeric records, and a custom **Bento Grid** dashboard.

---

## 1. Dashboard (`/dashboard`)

| Filename | Description | Viewport |
| :--- | :--- | :--- |
| [`01-dashboard-overview.png`](./01-dashboard-overview.png) | **Executive Academic Overview:** Top section displaying page header with editorial eyebrow badge, primary action buttons (`Add course`, `Add student`), overview card, deep forest green Attendance Compliance tile (`70%` campus average), and lead statistics. | Desktop (1440 × 900) |
| [`02-dashboard-bento-grid.png`](./02-dashboard-bento-grid.png) | **Complete Bento Grid Architecture:** Scrolled view highlighting student enrollment distribution bars per course, quick action links, and the recent students academic roster table. | Desktop (1440 × 900) |

---

## 2. Student Management (`/students`, `/students/:id`)

| Filename | Description | Viewport |
| :--- | :--- | :--- |
| [`03-students-page.png`](./03-students-page.png) | **Student Records Directory:** Full data table showing student initials avatars, monospaced enrollment IDs (`25BT04D...`), assigned courses, semesters, attendance progress bars, and status pills. Includes slim summary strip. | Desktop (1440 × 900) |
| [`04-student-add-form.png`](./04-student-add-form.png) | **Add Student Modal:** Clean dialog with structured fields for full name, enrollment number, university email, course allocation, semester, gender, and attendance percentage with real-time validation rules. | Desktop (1440 × 900) |
| [`05-student-edit-form.png`](./05-student-edit-form.png) | **Edit Student Modal:** Pre-populated edit modal for an existing student record demonstrating two-way state binding and non-destructive updates. | Desktop (1440 × 900) |
| [`06-student-search-results.png`](./06-student-search-results.png) | **Real-Time Student Search:** Filtered student table dynamically matching query string `"Sharma"`, updating result count metadata (`Clear filters • 1 student`). | Desktop (1440 × 900) |
| [`07-student-course-filter.png`](./07-student-course-filter.png) | **Curriculum Dropdown Filter:** Student list filtered specifically by course (`CSE-501 — Advanced Web Technology`), showing 3 enrolled records with active badge statuses. | Desktop (1440 × 900) |
| [`08-student-details.png`](./08-student-details.png) | **Student Academic Dossier:** Individual record page (`/students/student-2024-001`) with breadcrumb navigation, large serif student name, metadata dl grid, and attendance evaluation meter. | Desktop (1440 × 900) |
| [`16-delete-confirmation.png`](./16-delete-confirmation.png) | **Destructive Action Safety Dialog:** Confirmation modal preventing accidental student record deletion with clear prompt and accessible actions. | Desktop (1440 × 900) |
| [`17-empty-search-results.png`](./17-empty-search-results.png) | **Intentional Empty State:** Graceful empty state displayed when search query matches no existing records, complete with a single-click `Clear filters` button. | Desktop (1440 × 900) |

---

## 3. Course Management (`/courses`, `/courses/:id`)

| Filename | Description | Viewport |
| :--- | :--- | :--- |
| [`09-courses-page.png`](./09-courses-page.png) | **Academic Catalogue Grid:** Course catalog displaying subject cards with forest green top accents, monospaced course code pills (`CSE-501`, `CSE-301`), semester labels, instructor metadata, and enrolled counts. | Desktop (1440 × 900) |
| [`10-add-course-form.png`](./10-add-course-form.png) | **Add Course Modal:** Dialog for registering new courses with course title, syllabus code, semester, academic department, instructor name, and description. | Desktop (1440 × 900) |
| [`11-course-details.png`](./11-course-details.png) | **Course Specification Page:** Detailed curriculum dossier (`/courses/course-awt-501`) displaying course overview, syllabus description, enrolled student count (3), and the clickable roster table. | Desktop (1440 × 900) |

---

## 4. Attendance Compliance (`/attendance-overview`)

| Filename | Description | Viewport |
| :--- | :--- | :--- |
| [`12-attendance-overview.png`](./12-attendance-overview.png) | **Compliance Monitoring Dashboard:** University examination clearance tier summary with 3 lead metric panels (Eligible $\ge 75\%$, Warning $60\% - 74.9\%$, Detained $< 60\%$). | Desktop (1440 × 900) |
| [`13-attendance-eligible.png`](./13-attendance-eligible.png) | **Eligible Students Section:** Enrolled students with attendance $\ge 75\%$ cleared for semester end examinations, featuring green progress bars and `Eligible` status badges. | Desktop (1440 × 900) |
| [`14-attendance-warning.png`](./14-attendance-warning.png) | **Attendance Warning Section:** Students falling in the $60\% - 74.9\%$ range requiring academic counseling and remedial monitoring. | Desktop (1440 × 900) |
| [`15-attendance-detained.png`](./15-attendance-detained.png) | **Detained Students Section:** Students with attendance $< 60\%$ flagged as barred from examinations under university attendance regulations. | Desktop (1440 × 900) |

---

## 5. Responsive Mobile Experience (390 × 844)

| Filename | Description | Viewport |
| :--- | :--- | :--- |
| [`18-mobile-dashboard.png`](./18-mobile-dashboard.png) | **Mobile Bento Layout:** Adaptive single-column grid on mobile showing sticky header, hamburger trigger, stacked quick actions, and compliance tile without horizontal page overflow. | Mobile (390 × 844) |
| [`19-mobile-students-page.png`](./19-mobile-students-page.png) | **Mobile Students Workspace:** Mobile-adapted student directory with full-width action button, stacked search/filter controls, and smooth container-scoped horizontal table scrolling. | Mobile (390 × 844) |
| [`20-mobile-courses-page.png`](./20-mobile-courses-page.png) | **Mobile Courses Catalogue:** Single-column course cards with full touch targets, filter selectors, and accessible catalog codes. | Mobile (390 × 844) |

---

*Generated by automated headless browser testing against the live CollegeHub server (`http://localhost:3000`).*
