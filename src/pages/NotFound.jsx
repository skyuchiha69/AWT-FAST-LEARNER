import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';

/**
 * NotFound Page
 * 404 page for unmatched routes or invalid record queries.
 */
export default function NotFound() {
  return (
    <div
      className="card"
      style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        maxWidth: '560px',
        margin: '2rem auto',
      }}
    >
      <div
        className="empty-state-icon"
        style={{
          margin: '0 auto 1.5rem',
          backgroundColor: 'var(--color-surface-muted)',
          width: 64,
          height: 64,
        }}
      >
        <FileQuestion size={36} color="var(--color-primary)" />
      </div>
      <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
        Page Not Found
      </h2>
      <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '0.95rem' }}>
        The page or academic record you are looking for does not exist or may have been moved.
      </p>
      <div className="flex items-center justify-between gap-3" style={{ justifyContent: 'center' }}>
        <Link to="/dashboard" className="btn btn-primary">
          <Home size={16} />
          <span>Go to Dashboard</span>
        </Link>
        <Link to="/students" className="btn btn-secondary">
          <ArrowLeft size={16} />
          <span>Student Directory</span>
        </Link>
      </div>
    </div>
  );
}
