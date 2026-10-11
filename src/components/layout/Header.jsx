import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

/**
 * Header Component
 * Sticky top navigation bar (.topbar, .crumbs, .topbar-actions, .menu-btn).
 */
export default function Header({ onToggleMobileMenu, onOpenResetConfirm }) {
  const location = useLocation();
  const { storageWarning } = useApp();

  const pathParts = location.pathname.split('/').filter(Boolean);
  const primaryRoute = pathParts[0] || 'dashboard';

  let pageTitle = 'Dashboard';
  if (primaryRoute === 'students') pageTitle = 'Students';
  if (primaryRoute === 'courses') pageTitle = 'Courses';
  if (primaryRoute === 'attendance-overview') pageTitle = 'Attendance';

  return (
    <header className="topbar">
      <button
        type="button"
        className="btn btn-ghost btn-icon menu-btn"
        onClick={onToggleMobileMenu}
        aria-label="Toggle navigation menu"
      >
        <Menu size={18} />
      </button>

      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/dashboard">CollegeHub</Link>
        <span>/</span>
        <span className="current">{pageTitle}</span>
        {pathParts.length > 1 && (
          <>
            <span>/</span>
            <span className="current num">{pathParts[1]}</span>
          </>
        )}
      </nav>

      <div className="topbar-actions">
        {storageWarning && (
          <span className="status status--warn" title="LocalStorage error detected">
            Storage warning
          </span>
        )}

        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={onOpenResetConfirm}
          title="Reset data back to seed values"
        >
          <RotateCcw size={13} />
          <span>Reset demo</span>
        </button>
      </div>
    </header>
  );
}
