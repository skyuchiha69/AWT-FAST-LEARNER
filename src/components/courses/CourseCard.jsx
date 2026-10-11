import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2 } from 'lucide-react';

/**
 * CourseCard Component
 * Implements Phase 4 specification:
 * - .course panel
 * - .course-top: code + semester
 * - .course-name
 * - dl.course-meta: department and instructor
 * - .course-foot: enrolled count + affordance
 * Panel click goes to details; edit/delete stop propagation.
 */
function CourseCard({ course, enrolledCount, onEdit, onDelete }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <article
      className="course"
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="course-top">
        <span className="course-code">{course.code}</span>
        <span>Semester {course.semester}</span>
      </div>

      <div className="course-name">{course.name}</div>

      <dl className="course-meta">
        <dt>Department</dt>
        <dd>{course.department}</dd>
        <dt>Instructor</dt>
        <dd>{course.instructor || 'Unassigned'}</dd>
      </dl>

      <div className="course-foot">
        <span className="muted num">
          {enrolledCount} {enrolledCount === 1 ? 'student enrolled' : 'students enrolled'}
        </span>

        <div className="row-actions" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="btn btn-ghost btn-icon btn-sm"
            onClick={() => onEdit(course)}
            aria-label={`Edit ${course.name}`}
            title="Edit course"
          >
            <Edit2 size={13} />
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-icon btn-sm btn-danger"
            onClick={() => onDelete(course)}
            aria-label={`Delete ${course.name}`}
            title="Delete course"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(CourseCard);
