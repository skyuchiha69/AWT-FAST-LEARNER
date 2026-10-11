import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Field from '../common/Field';

/**
 * StudentForm Component
 * Controlled form using .form-grid, .field, .field-error, and inline validation.
 */
export default function StudentForm({
  isOpen,
  student = null,
  courses = [],
  existingStudents = [],
  onSubmit,
  onClose,
}) {
  const isEditing = Boolean(student && student.id);

  const [formData, setFormData] = useState({
    name: '',
    enrollment: '',
    email: '',
    courseId: courses[0]?.id || '',
    semester: 1,
    gender: 'Male',
    attendance: 75,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        enrollment: student.enrollment || '',
        email: student.email || '',
        courseId: student.courseId || (courses[0]?.id || ''),
        semester: student.semester || 1,
        gender: student.gender || 'Male',
        attendance: student.attendance !== undefined ? student.attendance : 75,
      });
    } else {
      setFormData({
        name: '',
        enrollment: '',
        email: '',
        courseId: courses[0]?.id || '',
        semester: 1,
        gender: 'Male',
        attendance: 75,
      });
    }
    setErrors({});
  }, [student, courses, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};

    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    }

    if (!formData.enrollment.trim()) {
      errs.enrollment = 'Enrollment number is required.';
    } else {
      const duplicate = existingStudents.find(
        (s) =>
          s.enrollment.trim().toLowerCase() === formData.enrollment.trim().toLowerCase() &&
          (!isEditing || s.id !== student.id)
      );
      if (duplicate) {
        errs.enrollment = 'Enrollment number already exists.';
      }
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Enter a valid email address.';
    }

    if (!formData.courseId) {
      errs.courseId = 'Please assign a course.';
    }

    const semNum = Number(formData.semester);
    if (!semNum || semNum < 1 || semNum > 8) {
      errs.semester = 'Semester must be between 1 and 8.';
    }

    const attNum = Number(formData.attendance);
    if (formData.attendance === '' || isNaN(attNum) || attNum < 0 || attNum > 100) {
      errs.attendance = 'Attendance must be between 0 and 100.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      semester: Number(formData.semester),
      attendance: Number(formData.attendance),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      title={isEditing ? 'Edit student' : 'Add student'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          {/* Full Name */}
          <Field
            label="Full name"
            id="student-name"
            full={true}
            required={true}
            error={errors.name}
          >
            <input
              id="student-name"
              name="name"
              className={`input ${errors.name ? 'is-invalid' : ''}`}
              type="text"
              placeholder="e.g. Aarav Sharma"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'student-name-error' : undefined}
            />
          </Field>

          {/* Enrollment */}
          <Field
            label="Enrollment number"
            id="student-enrollment"
            required={true}
            error={errors.enrollment}
          >
            <input
              id="student-enrollment"
              name="enrollment"
              className={`input ${errors.enrollment ? 'is-invalid' : ''}`}
              type="text"
              placeholder="e.g. 25BT04D201"
              value={formData.enrollment}
              onChange={handleChange}
              aria-invalid={Boolean(errors.enrollment)}
              aria-describedby={errors.enrollment ? 'student-enrollment-error' : undefined}
            />
          </Field>

          {/* Email */}
          <Field
            label="Email address"
            id="student-email"
            required={true}
            error={errors.email}
          >
            <input
              id="student-email"
              name="email"
              className={`input ${errors.email ? 'is-invalid' : ''}`}
              type="email"
              placeholder="e.g. aarav@collegehub.edu"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'student-email-error' : undefined}
            />
          </Field>

          {/* Course */}
          <Field
            label="Assigned course"
            id="student-course"
            full={true}
            required={true}
            error={errors.courseId}
          >
            <select
              id="student-course"
              name="courseId"
              className={`select ${errors.courseId ? 'is-invalid' : ''}`}
              value={formData.courseId}
              onChange={handleChange}
              aria-invalid={Boolean(errors.courseId)}
              aria-describedby={errors.courseId ? 'student-course-error' : undefined}
            >
              {courses.length === 0 && <option value="">No courses available</option>}
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code} — {c.name} (Semester {c.semester})
                </option>
              ))}
            </select>
          </Field>

          {/* Semester */}
          <Field
            label="Semester"
            id="student-semester"
            required={true}
            error={errors.semester}
          >
            <select
              id="student-semester"
              name="semester"
              className="select"
              value={formData.semester}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>
                  Semester {s}
                </option>
              ))}
            </select>
          </Field>

          {/* Gender */}
          <Field label="Gender" id="student-gender">
            <select
              id="student-gender"
              name="gender"
              className="select"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </Field>

          {/* Attendance */}
          <Field
            label="Attendance percentage (%)"
            id="student-attendance"
            full={true}
            required={true}
            hint="Rule: >= 75% is Eligible, 60%–74.9% is Warning, < 60% is Detained."
            error={errors.attendance}
          >
            <input
              id="student-attendance"
              name="attendance"
              className={`input ${errors.attendance ? 'is-invalid' : ''}`}
              type="number"
              min="0"
              max="100"
              step="0.5"
              placeholder="0 to 100"
              value={formData.attendance}
              onChange={handleChange}
              aria-invalid={Boolean(errors.attendance)}
              aria-describedby={errors.attendance ? 'student-attendance-error' : undefined}
            />
          </Field>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Save changes' : 'Add student'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
