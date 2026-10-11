import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_COURSES, INITIAL_STUDENTS } from '../data/seedData';
import { loadData, saveData, isStorageCorrupt } from '../utils/storage';

const STORAGE_KEYS = {
  STUDENTS: 'collegehub_students_v1',
  COURSES: 'collegehub_courses_v1',
};

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [students, setStudents] = useState(() =>
    loadData(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS)
  );
  const [courses, setCourses] = useState(() =>
    loadData(STORAGE_KEYS.COURSES, INITIAL_COURSES)
  );

  const [toasts, setToasts] = useState([]);
  const [storageWarning, setStorageWarning] = useState(() =>
    isStorageCorrupt(STORAGE_KEYS.STUDENTS) || isStorageCorrupt(STORAGE_KEYS.COURSES)
  );

  // Sync state to localStorage on updates
  useEffect(() => {
    const success = saveData(STORAGE_KEYS.STUDENTS, students);
    if (!success) setStorageWarning(true);
  }, [students]);

  useEffect(() => {
    const success = saveData(STORAGE_KEYS.COURSES, courses);
    if (!success) setStorageWarning(true);
  }, [courses]);

  // Toast notification helper
  const addToast = (message, type = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Student actions
  const addStudent = (studentData) => {
    const newStudent = {
      ...studentData,
      id: 'student-' + Date.now(),
      attendance: Number(studentData.attendance) || 0,
      semester: Number(studentData.semester) || 1,
    };
    setStudents((prev) => [newStudent, ...prev]);
    addToast(`Student "${newStudent.name}" enrolled successfully.`, 'success');
    return newStudent;
  };

  const updateStudent = (id, updatedData) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              ...updatedData,
              attendance: Number(updatedData.attendance) || 0,
              semester: Number(updatedData.semester) || 1,
            }
          : s
      )
    );
    addToast('Student details updated successfully.', 'success');
  };

  const deleteStudent = (id) => {
    const student = students.find((s) => s.id === id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    addToast(`Student "${student?.name || id}" removed.`, 'warning');
  };

  // Course actions
  const addCourse = (courseData) => {
    const newCourse = {
      ...courseData,
      id: 'course-' + Date.now(),
      semester: Number(courseData.semester) || 1,
    };
    setCourses((prev) => [newCourse, ...prev]);
    addToast(`Course "${newCourse.name}" created.`, 'success');
    return newCourse;
  };

  const updateCourse = (id, updatedData) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, ...updatedData, semester: Number(updatedData.semester) || 1 }
          : c
      )
    );
    addToast('Course curriculum updated.', 'success');
  };

  const deleteCourse = (id) => {
    // Check if enrolled students exist
    const enrolled = students.filter((s) => s.courseId === id);
    if (enrolled.length > 0) {
      addToast(
        `Cannot delete course: ${enrolled.length} student(s) are currently enrolled. Reassign them first.`,
        'error'
      );
      return false;
    }
    const course = courses.find((c) => c.id === id);
    setCourses((prev) => prev.filter((c) => c.id !== id));
    addToast(`Course "${course?.name || id}" deleted.`, 'warning');
    return true;
  };

  // Reset to initial demo dataset
  const resetDemoData = () => {
    setStudents(INITIAL_STUDENTS);
    setCourses(INITIAL_COURSES);
    saveData(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
    saveData(STORAGE_KEYS.COURSES, INITIAL_COURSES);
    addToast('All data has been reset to initial academic demo values.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        students,
        courses,
        toasts,
        storageWarning,
        addStudent,
        updateStudent,
        deleteStudent,
        addCourse,
        updateCourse,
        deleteCourse,
        resetDemoData,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
