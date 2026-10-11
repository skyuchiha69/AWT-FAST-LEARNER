import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Tile from '../components/common/Tile';
import AttendanceStatus from '../components/common/AttendanceStatus';
import AttendanceCell from '../components/common/AttendanceCell';
import EmptyState from '../components/common/EmptyState';
import CourseForm from '../components/courses/CourseForm';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { getAttendanceStatus } from '../utils/attendance';

/**
 * CourseDetails Page
 * Phase 5: .detail-head (name, subtitle, actions) and a small bento:
 * - Identity / Syllabus tile with .prose (span-8)
 * - Enrollment count tile (span-4)
 * - Enrolled students table tile (span-12)
 */
export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, students, updateCourse, deleteCourse } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="empty">
        <h3>Course record not found</h3>
        <p>No course was found with ID "{id}".</p>
        <Link to="/courses" className="btn btn-primary btn-sm">
          <ArrowLeft size={14} />
          <span>Back to courses</span>
        </Link>
      </div>
    );
  }

  const enrolledStudents = students.filter((s) => s.courseId === course.id);

  const handleConfirmDelete = () => {
    const success = deleteCourse(course.id);
    if (success) {
      navigate('/courses', { replace: true });
    }
    setIsDeleting(false);
  };

  return (
    <div>
      <div style={{ marginBottom: 'var(--s-4)' }}>
        <Link to="/courses" className="btn btn-ghost btn-sm" style={{ paddingLeft: 0 }}>
          <ArrowLeft size={14} />
          <span>Back to courses</span>
        </Link>
      </div>

      <header className="detail-head">
        <div>
          <div className="eyebrow">COURSE SPECIFICATION</div>
          <h1>{course.name}</h1>
          <div className="sub num">
            {course.code} • Semester {course.semester} • {course.department}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--s-2)' }}>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 size={13} />
            <span>Edit course</span>
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => setIsDeleting(true)}
          >
            <Trash2 size={13} />
            <span>Delete</span>
          </button>
        </div>
      </header>

      {/* Small Bento Grid for Course Details */}
      <section className="bento">
        {/* Description & Metadata Tile */}
        <Tile span="8">
          <div className="tile-title">Course overview</div>
          <p className="prose">
            {course.description || 'No course syllabus description provided.'}
          </p>

          <dl className="kv" style={{ marginTop: 'auto', paddingTop: 'var(--s-4)', borderTop: '1px solid var(--line)' }}>
            <dt>Instructor</dt>
            <dd>{course.instructor || 'Unassigned'}</dd>

            <dt>Department</dt>
            <dd>{course.department}</dd>

            <dt>Semester</dt>
            <dd>Semester {course.semester}</dd>
          </dl>
        </Tile>

        {/* Enrollment Capacity Tile */}
        <Tile span="4">
          <div className="tile-title">Enrolled students</div>
          <div className="stat-value num">{enrolledStudents.length}</div>
          <div className="stat-note">
            {enrolledStudents.length === 1
              ? '1 student assigned to this curriculum'
              : `${enrolledStudents.length} students assigned to this curriculum`}
          </div>
        </Tile>

        {/* Enrolled Students Table Tile */}
        <Tile span="12" flush={true}>
          <div className="tile-head">
            <span className="tile-title">Assigned students roster</span>
            <span className="muted num text-sm">{enrolledStudents.length} students</span>
          </div>

          {enrolledStudents.length > 0 ? (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Semester</th>
                    <th>Attendance</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledStudents.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <div className="person">
                          <Link to={`/students/${s.id}`} className="name">
                            {s.name}
                          </Link>
                          <span className="sub num">{s.enrollment}</span>
                        </div>
                      </td>
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
          ) : (
            <EmptyState
              title="No students assigned yet"
              description="Students enrolled in this course will appear in this roster."
              action={
                <Link to="/students?action=add" className="btn btn-sm">
                  Add a student
                </Link>
              }
            />
          )}
        </Tile>
      </section>

      {/* Edit Course Modal */}
      <CourseForm
        isOpen={isEditing}
        course={course}
        existingCourses={courses}
        onSubmit={(updatedData) => {
          updateCourse(course.id, updatedData);
          setIsEditing(false);
        }}
        onClose={() => setIsEditing(false)}
      />

      {/* Delete Course Confirmation */}
      <ConfirmDialog
        isOpen={isDeleting}
        title="Delete course"
        message={
          enrolledStudents.length > 0
            ? `Cannot delete course: there are ${enrolledStudents.length} student(s) currently enrolled. You must reassign or remove them first.`
            : `Are you sure you want to delete ${course.name} (${course.code})?`
        }
        confirmLabel="Delete course"
        cancelLabel="Cancel"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleting(false)}
      />
    </div>
  );
}
