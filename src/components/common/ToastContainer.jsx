import React from 'react';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';

/**
 * ToastContainer Component
 * Uses .toast class from collegehub.css.
 */
export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast" role="status">
          <span>{toast.message}</span>
          <button
            type="button"
            className="btn btn-ghost btn-icon btn-sm"
            onClick={() => removeToast(toast.id)}
            style={{ color: '#fff', marginLeft: 'var(--s-2)', width: '20px', height: '20px' }}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
