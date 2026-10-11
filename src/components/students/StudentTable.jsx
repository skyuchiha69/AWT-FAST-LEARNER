import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2 } from 'lucide-react';
import AttendanceStatus from '../common/AttendanceStatus';
import AttendanceCell from '../common/AttendanceCell';

import { getAttendanceStatus } from '../../utils/attendance';

function getInitials(name) {
  if (!name) return 'ST';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * StudentRow Component
 * Row in students table with avatar initials, name, enrollment,
 * attendance meter, status dot, and icon actions (.row-actions).
 * Row click navigates to student details; action clicks stop propagation.
 */
export const StudentRow = memo(function StudentRow({
  student,
  courseName,
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/students/${student.id}`);
  };

  const status = getAttendanceStatus(student.attendance);

  return (
    <tr className="is-link" onClick={handleRowClick}>
      <td>
        <div className="person-identity">
          <div className="person-avatar" aria-hidden="true">
            {getInitials(student.name)}
          </div>
          <div className="person">
            <span className="name">{student.name}</span>
            <span className="sub num">{student.enrollment}</span>
          </div>
        </div>
      </td>
      <td>{courseName || 'Unassigned'}</td>
      <td>Semester {student.semester}</td>
      <td>{student.gender}</td>
      <td>
        <AttendanceCell attendance={student.attendance} />
      </td>
      <td>
        <AttendanceStatus status={status} />
      </td>
      <td>
        <div className="row-actions" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="btn btn-ghost btn-icon btn-sm"
            onClick={() => onEdit(student)}
            aria-label={`Edit ${student.name}`}
            title="Edit student"
          >
            <Edit2 size={14} />
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-icon btn-sm btn-danger"
            onClick={() => onDelete(student)}
            aria-label={`Delete ${student.name}`}
            title="Delete student"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
});

/**
 * StudentTable Component
 * Wrapped in .table-wrap > .table.
 */
function StudentTable({ students, courses, onEdit, onDelete }) {
  const courseMap = courses.reduce((acc, c) => {
    acc[c.id] = c.name;
    return acc;
  }, {});

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Semester</th>
            <th>Gender</th>
            <th>Attendance</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              courseName={courseMap[student.courseId]}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(StudentTable);
