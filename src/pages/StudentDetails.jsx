import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Tile from '../components/common/Tile';
import AttendanceStatus from '../components/common/AttendanceStatus';
import AttendanceMeter from '../components/common/AttendanceMeter';
import StudentForm from '../components/students/StudentForm';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { getAttendanceStatus } from '../utils/attendance';

/**
 * StudentDetails Page
 * Phase 5: .detail-head (name, subtitle, actions) and a small bento:
 * - Identity tile with dl.kv (span-7)
 * - Attendance tile with percent, meter, status (span-5)
 */
export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students, courses, updateStudent, deleteStudent } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <div className="empty">
        <h3>Student record not found</h3>
        <p>No student was found with ID "{id}".</p>
        <Link to="/students" className="btn btn-primary btn-sm">
          <ArrowLeft size={14} />
          <span>Back to students</span>
        </Link>
      </div>
    );
  }

  const course = courses.find((c) => c.id === student.courseId);
  const attendanceStatus = getAttendanceStatus(student.attendance);

  const handleConfirmDelete = () => {
    deleteStudent(student.id);
    navigate('/students', { replace: true });
  };

  return (
    <div>
      <div style={{ marginBottom: 'var(--s-4)' }}>
        <Link to="/students" className="btn btn-ghost btn-sm" style={{ paddingLeft: 0 }}>
          <ArrowLeft size={14} />
          <span>Back to students</span>
        </Link>
      </div>

      <header className="detail-head">
        <div>
          <div className="eyebrow">ACADEMIC DOSSIER</div>
          <h1>{student.name}</h1>
          <div className="sub num">{student.enrollment} • {student.email}</div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--s-2)' }}>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 size={13} />
            <span>Edit student</span>
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

      {/* Small Bento Grid for Details */}
      <section className="bento">
        {/* Identity Tile with dl.kv */}
        <Tile span="7">
          <div className="tile-title">Academic identity</div>
          <dl className="kv">
            <dt>Enrollment</dt>
            <dd className="num">{student.enrollment}</dd>

            <dt>Course</dt>
            <dd>
              {course ? (
                <Link to={`/courses/${course.id}`} className="tile-link">
                  {course.code} — {course.name}
                </Link>
              ) : (
                'Unassigned'
              )}
            </dd>

            <dt>Semester</dt>
            <dd>Semester {student.semester}</dd>

            <dt>Gender</dt>
            <dd>{student.gender}</dd>

            <dt>Email</dt>
            <dd>{student.email}</dd>
          </dl>
        </Tile>

        {/* Attendance Tile */}
        <Tile span="5">
          <div className="tile-head">
            <span className="tile-title">Attendance evaluation</span>
            <AttendanceStatus status={attendanceStatus} />
          </div>

          <div style={{ margin: 'var(--s-2) 0' }}>
            <div className="stat-value num">{student.attendance}%</div>
            <div className="muted" style={{ fontSize: 'var(--fs-sm)', marginTop: 'var(--s-1)' }}>
              Recorded attendance
            </div>
          </div>

          <AttendanceMeter attendance={student.attendance} />

          <p className="muted" style={{ fontSize: 'var(--fs-sm)', marginTop: 'auto', lineHeight: 1.5 }}>
            {attendanceStatus === 'Eligible' &&
              'Student meets the >= 75% threshold and is cleared for semester examinations.'}
            {attendanceStatus === 'Warning' &&
              'Attendance is between 60% and 74.9%. Academic remedial notice issued.'}
            {attendanceStatus === 'Detained' &&
              'Attendance is below 60%. Subject to examination detention.'}
          </p>
        </Tile>
      </section>

      {/* Edit Student Modal */}
      <StudentForm
        isOpen={isEditing}
        student={student}
        courses={courses}
        existingStudents={students}
        onSubmit={(updatedData) => {
          updateStudent(student.id, updatedData);
          setIsEditing(false);
        }}
        onClose={() => setIsEditing(false)}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleting}
        title="Delete student"
        message={`Are you sure you want to delete ${student.name} (${student.enrollment})? This action cannot be undone.`}
        confirmLabel="Delete student"
        cancelLabel="Cancel"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleting(false)}
      />
    </div>
  );
}
