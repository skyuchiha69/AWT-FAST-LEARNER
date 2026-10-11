import React, { useState, useMemo } from 'react';
import { PlusCircle, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageHead from '../components/common/PageHead';
import CourseCard from '../components/courses/CourseCard';
import CourseForm from '../components/courses/CourseForm';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';

/**
 * Courses Page
 * Phase 4: Toolbar with search/filters + responsive .course-grid of .course panels.
 */
export default function Courses() {
  const { courses, students, addCourse, updateCourse, deleteCourse } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('');
  const [selectedSemesterFilter, setSelectedSemesterFilter] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (selectedDeptFilter && course.department !== selectedDeptFilter) {
        return false;
      }

      if (selectedSemesterFilter && course.semester !== Number(selectedSemesterFilter)) {
        return false;
      }

      if (searchTerm.trim()) {
        const query = searchTerm.trim().toLowerCase();
        const matchesName = course.name.toLowerCase().includes(query);
        const matchesCode = course.code.toLowerCase().includes(query);
        if (!matchesName && !matchesCode) return false;
      }

      return true;
    });
  }, [courses, searchTerm, selectedDeptFilter, selectedSemesterFilter]);

  const departments = useMemo(() => {
    const set = new Set(courses.map((c) => c.department).filter(Boolean));
    return Array.from(set);
  }, [courses]);

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (course) => {
    setEditingCourse(course);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCourse(null);
  };

  const handleFormSubmit = (formData) => {
    if (editingCourse) {
      updateCourse(editingCourse.id, formData);
    } else {
      addCourse(formData);
    }
    handleCloseForm();
  };

  const handleConfirmDelete = () => {
    if (deletingCourse) {
      deleteCourse(deletingCourse.id);
      setDeletingCourse(null);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDeptFilter('');
    setSelectedSemesterFilter('');
  };

  return (
    <div>
      <PageHead
        eyebrow="ACADEMIC CATALOGUE"
        title="Courses"
        description="Departmental course curriculum, active subjects, and faculty allocations."
        action={
          <button type="button" className="btn btn-primary" onClick={handleOpenAdd}>
            <PlusCircle size={15} />
            <span>Add course</span>
          </button>
        }
      />

      {/* Toolbar */}
      <div className="toolbar" style={{ background: 'var(--surface)', borderRadius: 'var(--r-panel)', border: '1px solid var(--line)', marginBottom: 'var(--s-6)' }}>
        <div className="search grow">
          <Search size={15} aria-hidden="true" />
          <input
            type="text"
            className="input"
            placeholder="Search courses by title or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search courses"
          />
        </div>

        <select
          className="select"
          value={selectedDeptFilter}
          onChange={(e) => setSelectedDeptFilter(e.target.value)}
          aria-label="Filter by department"
        >
          <option value="">All departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          className="select"
          value={selectedSemesterFilter}
          onChange={(e) => setSelectedSemesterFilter(e.target.value)}
          aria-label="Filter by semester"
        >
          <option value="">All semesters</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <option key={s} value={s}>
              Semester {s}
            </option>
          ))}
        </select>

        {(searchTerm || selectedDeptFilter || selectedSemesterFilter) && (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={handleResetFilters}
          >
            Clear filters
          </button>
        )}

        <div className="toolbar-meta num">
          {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
        </div>
      </div>

      {/* Responsive Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="course-grid">
          {filteredCourses.map((course) => {
            const enrolledCount = students.filter((s) => s.courseId === course.id).length;
            return (
              <CourseCard
                key={course.id}
                course={course}
                enrolledCount={enrolledCount}
                onEdit={handleOpenEdit}
                onDelete={(c) => setDeletingCourse(c)}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No courses match these filters"
          description="Try broadening your search term or clearing department filters."
          action={
            <button
              type="button"
              className="btn btn-sm"
              onClick={handleResetFilters}
            >
              Clear filters
            </button>
          }
        />
      )}

      {/* Add / Edit Course Modal */}
      <CourseForm
        isOpen={isFormOpen}
        course={editingCourse}
        existingCourses={courses}
        onSubmit={handleFormSubmit}
        onClose={handleCloseForm}
      />

      {/* Delete Course Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deletingCourse)}
        title="Delete course"
        message={`Are you sure you want to delete ${deletingCourse?.name} (${deletingCourse?.code})?`}
        confirmLabel="Delete course"
        cancelLabel="Cancel"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingCourse(null)}
      />
    </div>
  );
}
