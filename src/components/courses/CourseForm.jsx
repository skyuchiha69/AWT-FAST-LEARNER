import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Field from '../common/Field';

/**
 * CourseForm Component
 * Controlled form using .form-grid and .field.
 */
export default function CourseForm({
  isOpen,
  course = null,
  existingCourses = [],
  onSubmit,
  onClose,
}) {
  const isEditing = Boolean(course && course.id);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    department: 'Computer Science & Engineering',
    semester: 5,
    instructor: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name || '',
        code: course.code || '',
        department: course.department || 'Computer Science & Engineering',
        semester: course.semester || 1,
        instructor: course.instructor || '',
        description: course.description || '',
      });
    } else {
      setFormData({
        name: '',
        code: '',
        department: 'Computer Science & Engineering',
        semester: 5,
        instructor: '',
        description: '',
      });
    }
    setErrors({});
  }, [course, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};

    if (!formData.name.trim()) {
      errs.name = 'Course name is required.';
    }

    if (!formData.code.trim()) {
      errs.code = 'Course code is required.';
    } else {
      const duplicate = existingCourses.find(
        (c) =>
          c.code.trim().toUpperCase() === formData.code.trim().toUpperCase() &&
          (!isEditing || c.id !== course.id)
      );
      if (duplicate) {
        errs.code = 'Course code already exists.';
      }
    }

    if (!formData.department.trim()) {
      errs.department = 'Department is required.';
    }

    const semNum = Number(formData.semester);
    if (!semNum || semNum < 1 || semNum > 8) {
      errs.semester = 'Semester must be between 1 and 8.';
    }

    if (!formData.instructor.trim()) {
      errs.instructor = 'Instructor name is required.';
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
      code: formData.code.trim().toUpperCase(),
      semester: Number(formData.semester),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      title={isEditing ? 'Edit course' : 'Add course'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          {/* Name */}
          <Field
            label="Course title"
            id="course-name"
            full={true}
            required={true}
            error={errors.name}
          >
            <input
              id="course-name"
              name="name"
              className={`input ${errors.name ? 'is-invalid' : ''}`}
              type="text"
              placeholder="e.g. Advanced Web Technology"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'course-name-error' : undefined}
            />
          </Field>

          {/* Code */}
          <Field
            label="Course code"
            id="course-code"
            required={true}
            error={errors.code}
          >
            <input
              id="course-code"
              name="code"
              className={`input ${errors.code ? 'is-invalid' : ''}`}
              type="text"
              placeholder="e.g. CSE-501"
              value={formData.code}
              onChange={handleChange}
              aria-invalid={Boolean(errors.code)}
              aria-describedby={errors.code ? 'course-code-error' : undefined}
            />
          </Field>

          {/* Semester */}
          <Field
            label="Semester"
            id="course-sem"
            required={true}
            error={errors.semester}
          >
            <select
              id="course-sem"
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

          {/* Department */}
          <Field label="Department" id="course-dept">
            <select
              id="course-dept"
              name="department"
              className="select"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Cyber Security">Cyber Security</option>
            </select>
          </Field>

          {/* Instructor */}
          <Field
            label="Instructor"
            id="course-instructor"
            required={true}
            error={errors.instructor}
          >
            <input
              id="course-instructor"
              name="instructor"
              className={`input ${errors.instructor ? 'is-invalid' : ''}`}
              type="text"
              placeholder="e.g. Dr. Arvinder Singh"
              value={formData.instructor}
              onChange={handleChange}
              aria-invalid={Boolean(errors.instructor)}
              aria-describedby={errors.instructor ? 'course-instructor-error' : undefined}
            />
          </Field>

          {/* Description */}
          <Field label="Course description" id="course-desc" full={true}>
            <textarea
              id="course-desc"
              name="description"
              className="textarea"
              placeholder="Syllabus overview and prerequisite requirements..."
              value={formData.description}
              onChange={handleChange}
            />
          </Field>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Save changes' : 'Add course'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
