import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import StudentDetails from './pages/StudentDetails';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import AttendanceOverview from './pages/AttendanceOverview';
import NotFound from './pages/NotFound';

/**
 * App Component
 * Defines application routing, layout shell, and path configurations.
 * Meets Phase 6 & Phase 10 routing guidelines.
 */
export default function App() {
  return (
    <AppLayout>
      <Routes>
        {/* Default route redirect to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Dashboard Home */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Students Routes */}
        <Route path="/students" element={<Students />} />
        <Route path="/students/:id" element={<StudentDetails />} />

        {/* Courses Routes */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />

        {/* Attendance Overview Route */}
        <Route path="/attendance-overview" element={<AttendanceOverview />} />

        {/* 404 Catch-All */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
}
