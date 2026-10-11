import React from 'react';

/**
 * Field Component
 * Form input wrapper (.field, .field.full) with label, hints, and inline error.
 */
export default function Field({
  label,
  id,
  hint,
  error,
  full = false,
  required = false,
  children,
}) {
  return (
    <div className={`field ${full ? 'full' : ''}`}>
      {label && (
        <label htmlFor={id}>
          {label}
          {required && <span style={{ color: 'var(--bad)', marginLeft: '3px' }}>*</span>}
        </label>
      )}
      {children}
      {hint && !error && <div className="hint">{hint}</div>}
      {error && (
        <div id={`${id}-error`} className="field-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
