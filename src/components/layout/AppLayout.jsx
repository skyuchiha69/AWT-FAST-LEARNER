import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ToastContainer from '../common/ToastContainer';
import ConfirmDialog from '../common/ConfirmDialog';
import { useApp } from '../../context/AppContext';

/**
 * AppLayout Component (AppShell)
 * Shell (.app, .sidebar, .main, .topbar, .page, .scrim).
 * Handles <= 820px off-canvas drawer with .scrim, Escape key close, and backdrop dismissal.
 */
export default function AppLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const { resetDemoData } = useApp();

  // Escape key closes mobile navigation drawer
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleConfirmReset = () => {
    resetDemoData();
    setResetDialogOpen(false);
  };

  return (
    <div className="app">
      <a href="#main-content" className="sr-only">
        Skip to main content
      </a>

      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Off-canvas scrim for <= 820px */}
      <div
        className={`scrim ${mobileMenuOpen ? 'is-open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Main Wrapper */}
      <div className="main">
        <Header
          onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
          onOpenResetConfirm={() => setResetDialogOpen(true)}
        />

        <main id="main-content" className="page">
          {children}
        </main>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Reset Demo Data Modal */}
      <ConfirmDialog
        isOpen={resetDialogOpen}
        title="Reset demo data"
        message="This will reset all student and course records back to the initial dataset. Any changes made will be lost."
        confirmLabel="Reset everything"
        cancelLabel="Keep current"
        isDanger={false}
        onConfirm={handleConfirmReset}
        onCancel={() => setResetDialogOpen(false)}
      />
    </div>
  );
}
