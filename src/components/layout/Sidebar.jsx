import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  CalendarCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

/**
 * Sidebar Component
 * Understated sidebar (.sidebar, .brand, .brand-mark, .nav, .nav-link, .profile).
 * Uses aria-current="page" on the active link.
 */
export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { students, courses } = useApp();

  // Close sidebar on route change for mobile
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/students', label: 'Students', icon: GraduationCap, count: students.length },
    { to: '/courses', label: 'Courses', icon: BookOpen, count: courses.length },
    { to: '/attendance-overview', label: 'Attendance', icon: CalendarCheck },
  ];

  return (
    <aside
      className={`sidebar ${isOpen ? 'is-open' : ''}`}
      aria-label="Primary navigation"
    >
      <div className="brand">
        <div className="brand-header">
          <div className="brand-mark">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <span className="brand-name">CollegeHub</span>
        </div>
        <div className="brand-tag">ACADEMIC MANAGEMENT</div>
      </div>

      <nav className="nav">
        <div className="nav-group">
          <div className="nav-label">WORKSPACE</div>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            aria-current={location.pathname === '/dashboard' ? 'page' : undefined}
          >
            <LayoutDashboard size={15} />
            <span>Overview</span>
          </NavLink>
          <NavLink
            to="/students"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            aria-current={location.pathname === '/students' ? 'page' : undefined}
          >
            <GraduationCap size={15} />
            <span>Students</span>
            <span className="nav-count num">{students.length}</span>
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            aria-current={location.pathname === '/courses' ? 'page' : undefined}
          >
            <BookOpen size={15} />
            <span>Courses</span>
            <span className="nav-count num">{courses.length}</span>
          </NavLink>
        </div>

        <div className="nav-group">
          <div className="nav-label">MANAGEMENT</div>
          <NavLink
            to="/attendance-overview"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            aria-current={location.pathname === '/attendance-overview' ? 'page' : undefined}
          >
            <CalendarCheck size={15} />
            <span>Attendance Records</span>
          </NavLink>
        </div>
      </nav>

      <div className="profile">
        <div className="avatar">AD</div>
        <div>
          <div className="profile-name">Academic Admin</div>
          <div className="profile-role">GSFC University • Sem 5</div>
        </div>
      </div>
    </aside>
  );
}
