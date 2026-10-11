import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, PlusCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageHead from '../components/common/PageHead';
import Tile from '../components/common/Tile';
import StatTile from '../components/common/StatTile';
import AttendanceStatus from '../components/common/AttendanceStatus';
import AttendanceCell from '../components/common/AttendanceCell';
import EmptyState from '../components/common/EmptyState';
import StudentForm from '../components/students/StudentForm';
import CourseForm from '../components/courses/CourseForm';
import { getAttendanceStatus } from '../utils/attendance';

/**
 * Dashboard Page
 * 12-column Bento grid with exact specified layout:
 * - Overview (span-7)
 * - Attendance overview, ink (span-5, row-2)
 * - Students stat (span-4)
 * - Courses stat (span-3)
 * - Students per course bars (span-7)
 * - Quick actions + latest added (span-5)
 * - Recent students table (span-12)
 */
export default function Dashboard() {
  const { students, courses, addStudent, addCourse } = useApp();

  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [courseModalOpen, setCourseModalOpen] = useState(false);

  // useMemo for derived metrics
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const totalCourses = courses.length;

    let eligibleCount = 0;
    let warningCount = 0;
    let detainedCount = 0;
    let totalAttendance = 0;

    students.forEach((s) => {
      const status = getAttendanceStatus(s.attendance);
      if (status === 'Eligible') eligibleCount++;
      else if (status === 'Warning') warningCount++;
      else if (status === 'Detained') detainedCount++;

      totalAttendance += Number(s.attendance) || 0;
    });

    const averageAttendance =
      totalStudents > 0 ? Math.round(totalAttendance / totalStudents) : 0;

    // Real enrollment counts for courses
    const courseEnrollmentList = courses
      .map((course) => {
        const count = students.filter((s) => s.courseId === course.id).length;
        const pct = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;
        return { ...course, count, pct };
      })
      .sort((a, b) => b.count - a.count);

    const coursesWithStudents = courseEnrollmentList.filter((c) => c.count > 0);

    // Latest 5 added students by list order
    const latestStudents = [...students].slice(0, 5);
    const needAttention = warningCount + detainedCount;

    return {
      totalStudents,
      totalCourses,
      eligibleCount,
      warningCount,
      detainedCount,
      needAttention,
      averageAttendance,
      courseEnrollmentList,
      coursesWithStudents,
      latestStudents,
    };
  }, [students, courses]);

  const courseLookup = useMemo(() => {
    return courses.reduce((acc, c) => {
      acc[c.id] = c.name;
      return acc;
    }, {});
  }, [courses]);

  return (
    <div>
      <PageHead
        eyebrow="ACADEMIC OVERVIEW"
        title="Your campus, at a glance."
        description="Academic student enrollments, course allocation, and attendance compliance."
        action={
          <div style={{ display: 'flex', gap: 'var(--s-2)' }}>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => setCourseModalOpen(true)}
            >
              <PlusCircle size={14} />
              <span>Add course</span>
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setStudentModalOpen(true)}
            >
              <UserPlus size={14} />
              <span>Add student</span>
            </button>
          </div>
        }
      />

      <section className="bento">
        {/* Row 1, Col 7: Overview Tile */}
        <Tile span="7">
          <div className="tile-title">Overview</div>
          <div className="overview-title">
            {stats.totalStudents} {stats.totalStudents === 1 ? 'student' : 'students'} across {stats.totalCourses} {stats.totalCourses === 1 ? 'course' : 'courses'}
            {stats.needAttention > 0
              ? `; ${stats.needAttention} need attention.`
              : '; all meeting attendance requirements.'}
          </div>
          <div className="stat-note" style={{ marginTop: 'auto' }}>
            {stats.needAttention > 0 ? (
              <Link to="/attendance-overview" className="tile-link">
                View {stats.needAttention} students requiring intervention →
              </Link>
            ) : (
              <span className="muted">All students are cleared for examinations.</span>
            )}
          </div>
        </Tile>

        {/* Row 1, Col 5, Row-2: Attendance overview, ink (Single high-contrast tile) */}
        <Tile span="5" row="2" ink={true}>
          <div className="tile-head">
            <span className="tile-title">Attendance overview</span>
            <Link to="/attendance-overview" className="tile-link">
              Details →
            </Link>
          </div>

          <div style={{ margin: 'var(--s-2) 0' }}>
            <div className="stat-value num">{stats.averageAttendance}%</div>
            <div className="muted" style={{ fontSize: 'var(--fs-sm)', marginTop: 'var(--s-1)' }}>
              Campus average attendance
            </div>
          </div>

          {/* Stacked split bar with real proportions */}
          <div>
            <div className="split" aria-label="Attendance distribution bar">
              {stats.totalStudents > 0 ? (
                <>
                  <span
                    className="ok"
                    style={{ flex: stats.eligibleCount || 0.001 }}
                    title={`Eligible: ${stats.eligibleCount}`}
                  />
                  <span
                    className="warn"
                    style={{ flex: stats.warningCount || 0.001 }}
                    title={`Warning: ${stats.warningCount}`}
                  />
                  <span
                    className="bad"
                    style={{ flex: stats.detainedCount || 0.001 }}
                    title={`Detained: ${stats.detainedCount}`}
                  />
                </>
              ) : (
                <span className="split-empty" />
              )}
            </div>
          </div>

          {/* Breakdown legend */}
          <div className="legend" style={{ marginTop: 'var(--s-2)' }}>
            <div className="legend-row">
              <span className="dot ok" />
              <span>Eligible (&ge; 75%)</span>
              <span className="count num">{stats.eligibleCount}</span>
            </div>
            <div className="legend-row">
              <span className="dot warn" />
              <span>Warning (60%–74.9%)</span>
              <span className="count num">{stats.warningCount}</span>
            </div>
            <div className="legend-row">
              <span className="dot bad" />
              <span>Detained (&lt; 60%)</span>
              <span className="count num">{stats.detainedCount}</span>
            </div>
          </div>

          <div className="muted" style={{ fontSize: 'var(--fs-xs)', marginTop: 'auto', lineHeight: 1.4 }}>
            Attendance below 60% leads to examination detention under university rules.
          </div>
        </Tile>

        {/* Row 2, Col 4: Students Stat Tile */}
        <StatTile
          span="4"
          label="Total students"
          value={stats.totalStudents}
          note="Active enrolled records"
        />

        {/* Row 2, Col 3: Courses Stat Tile */}
        <StatTile
          span="3"
          label="Active courses"
          value={stats.totalCourses}
          note="Curriculum offerings"
        />

        {/* Row 3, Col 7: Students per course bars */}
        <Tile span="7">
          <div className="tile-head">
            <span className="tile-title">Students per course</span>
            <Link to="/courses" className="tile-link">
              View all →
            </Link>
          </div>

          {stats.coursesWithStudents.length >= 2 ? (
            <div className="bars">
              {stats.courseEnrollmentList.slice(0, 5).map((course) => (
                <div key={course.id} className="bar-row">
                  <span className="label" title={course.name}>
                    {course.code}
                  </span>
                  <div className="meter">
                    <span style={{ width: `${course.pct}%` }} />
                  </div>
                  <span className="value num">{course.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Not enough course enrollment data"
              description="Enroll students into at least two courses to display the allocation distribution."
            />
          )}
        </Tile>

        {/* Row 3, Col 5: Quick actions + latest added */}
        <Tile span="5">
          <div className="tile-title">Quick actions</div>
          <div className="list">
            <button
              type="button"
              className="action-link"
              onClick={() => setStudentModalOpen(true)}
            >
              <UserPlus size={16} />
              <span>Add a new student</span>
            </button>
            <button
              type="button"
              className="action-link"
              onClick={() => setCourseModalOpen(true)}
            >
              <PlusCircle size={16} />
              <span>Add a new course</span>
            </button>
            <Link to="/attendance-overview" className="action-link">
              <ArrowRight size={16} />
              <span>Review attendance eligibility</span>
            </Link>
          </div>

          {stats.latestStudents.length > 0 && (
            <div style={{ marginTop: 'auto', paddingTop: 'var(--s-3)', borderTop: '1px solid var(--line)' }}>
              <div className="tile-title" style={{ marginBottom: 'var(--s-2)' }}>
                Latest added
              </div>
              <div className="list">
                {stats.latestStudents.slice(0, 2).map((s) => (
                  <div key={s.id} className="list-row">
                    <div className="grow">
                      <div className="primary">
                        <Link to={`/students/${s.id}`}>{s.name}</Link>
                      </div>
                      <div className="secondary num">{s.enrollment}</div>
                    </div>
                    <AttendanceStatus status={getAttendanceStatus(s.attendance)} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Tile>

        {/* Row 4, Col 12: Recent students table (flush tile) */}
        <Tile span="12" flush={true}>
          <div className="tile-head">
            <span className="tile-title">Latest added students</span>
            <Link to="/students" className="tile-link">
              Open directory →
            </Link>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Attendance</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {stats.latestStudents.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className="person">
                        <Link to={`/students/${s.id}`} className="name">
                          {s.name}
                        </Link>
                        <span className="sub num">{s.enrollment}</span>
                      </div>
                    </td>
                    <td>{courseLookup[s.courseId] || 'Unassigned'}</td>
                    <td>Semester {s.semester}</td>
                    <td>
                      <AttendanceCell attendance={s.attendance} />
                    </td>
                    <td>
                      <AttendanceStatus status={getAttendanceStatus(s.attendance)} />
                    </td>
                    <td>
                      <Link to={`/students/${s.id}`} className="btn btn-ghost btn-sm">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tile>
      </section>

      {/* Controlled Modals */}
      <StudentForm
        isOpen={studentModalOpen}
        courses={courses}
        existingStudents={students}
        onSubmit={(newStudent) => {
          addStudent(newStudent);
          setStudentModalOpen(false);
        }}
        onClose={() => setStudentModalOpen(false)}
      />

      <CourseForm
        isOpen={courseModalOpen}
        existingCourses={courses}
        onSubmit={(newCourse) => {
          addCourse(newCourse);
          setCourseModalOpen(false);
        }}
        onClose={() => setCourseModalOpen(false)}
      />
    </div>
  );
}
