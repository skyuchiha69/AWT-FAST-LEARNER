import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserPlus, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageHead from '../components/common/PageHead';
import Tile from '../components/common/Tile';
import StudentTable from '../components/students/StudentTable';
import StudentForm from '../components/students/StudentForm';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';
import { getAttendanceStatus } from '../utils/attendance';

/**
 * Students Page
 * Layout: .page-head + one .tile.tile-flush containing .toolbar and .table-wrap > .table.
 */
export default function Students() {
  const { students, courses, addStudent, updateStudent, deleteStudent } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('');

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(searchParams.get('action') === 'add');
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);

  // useMemo for filtering
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      if (selectedCourseFilter && student.courseId !== selectedCourseFilter) {
        return false;
      }

      if (selectedStatusFilter) {
        const status = getAttendanceStatus(student.attendance);
        if (status !== selectedStatusFilter) return false;
      }

      if (searchTerm.trim()) {
        const query = searchTerm.trim().toLowerCase();
        const matchesName = student.name.toLowerCase().includes(query);
        const matchesEnrollment = student.enrollment.toLowerCase().includes(query);
        const matchesEmail = student.email.toLowerCase().includes(query);
        if (!matchesName && !matchesEnrollment && !matchesEmail) return false;
      }

      return true;
    });
  }, [students, searchTerm, selectedCourseFilter, selectedStatusFilter]);

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingStudent(null);
    if (searchParams.get('action')) {
      setSearchParams({}, { replace: true });
    }
  };

  const handleFormSubmit = (formData) => {
    if (editingStudent) {
      updateStudent(editingStudent.id, formData);
    } else {
      addStudent(formData);
    }
    handleCloseForm();
  };

  const handleConfirmDelete = () => {
    if (deletingStudent) {
      deleteStudent(deletingStudent.id);
      setDeletingStudent(null);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCourseFilter('');
    setSelectedStatusFilter('');
  };

  const studentMetrics = useMemo(() => {
    let eligible = 0;
    let attention = 0;
    students.forEach((s) => {
      const status = getAttendanceStatus(s.attendance);
      if (status === 'Eligible') eligible++;
      else attention++;
    });
    return { total: students.length, eligible, attention };
  }, [students]);

  return (
    <div>
      <PageHead
        eyebrow="ACADEMIC RECORDS"
        title="Students"
        description="Registered academic student directory, enrollment records, and attendance standing."
        action={
          <button type="button" className="btn btn-primary" onClick={handleOpenAdd}>
            <UserPlus size={15} />
            <span>Add student</span>
          </button>
        }
      />

      {/* Editorial summary strip */}
      <div className="summary-strip">
        <div className="summary-strip-item">
          <span className="summary-strip-label">Total Enrolled</span>
          <span className="summary-strip-val num">{studentMetrics.total}</span>
        </div>
        <span className="summary-strip-sep">•</span>
        <div className="summary-strip-item">
          <span className="summary-strip-label">Eligible Standing</span>
          <span className="summary-strip-val text-success num">{studentMetrics.eligible}</span>
        </div>
        <span className="summary-strip-sep">•</span>
        <div className="summary-strip-item">
          <span className="summary-strip-label">Requiring Attention</span>
          <span className="summary-strip-val text-warning num">{studentMetrics.attention}</span>
        </div>
      </div>

      <Tile span="12" flush={true}>
        {/* Toolbar */}
        <div className="toolbar">
          <div className="search grow">
            <Search size={15} aria-hidden="true" />
            <input
              type="text"
              className="input"
              placeholder="Search by name, enrollment, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search students"
            />
          </div>

          <select
            className="select"
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            aria-label="Filter by course"
          >
            <option value="">All courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code} — {c.name}
              </option>
            ))}
          </select>

          <select
            className="select"
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            aria-label="Filter by attendance status"
          >
            <option value="">All attendance statuses</option>
            <option value="Eligible">Eligible (&ge; 75%)</option>
            <option value="Warning">Warning (60%–74.9%)</option>
            <option value="Detained">Detained (&lt; 60%)</option>
          </select>

          {(searchTerm || selectedCourseFilter || selectedStatusFilter) && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={handleResetFilters}
            >
              Clear filters
            </button>
          )}

          <div className="toolbar-meta num">
            {filteredStudents.length} {filteredStudents.length === 1 ? 'student' : 'students'}
          </div>
        </div>

        {/* Table or Empty State */}
        {filteredStudents.length > 0 ? (
          <StudentTable
            students={filteredStudents}
            courses={courses}
            onEdit={handleOpenEdit}
            onDelete={(student) => setDeletingStudent(student)}
          />
        ) : (
          <EmptyState
            title="No students match these filters"
            description="Try clearing your search term or selecting all courses."
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
      </Tile>

      {/* Add / Edit Student Modal */}
      <StudentForm
        isOpen={isFormOpen}
        student={editingStudent}
        courses={courses}
        existingStudents={students}
        onSubmit={handleFormSubmit}
        onClose={handleCloseForm}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deletingStudent)}
        title="Delete student"
        message={`Are you sure you want to delete ${deletingStudent?.name} (${deletingStudent?.enrollment})? This action cannot be undone.`}
        confirmLabel="Delete student"
        cancelLabel="Cancel"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingStudent(null)}
      />
    </div>
  );
}
