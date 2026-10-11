import React, { useEffect } from 'react';
import Modal from './Modal';

/**
 * ConfirmDialog Component
 * Restrained confirmation modal for deletions and resets.
 */
export default function ConfirmDialog({
  isOpen,
  title = 'Confirm deletion',
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  isDanger = true,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onCancel} maxWidth="440px">
      <p style={{ color: 'var(--text-2)', fontSize: 'var(--fs-base)', marginBottom: 'var(--s-6)' }}>
        {message}
      </p>
      <div className="form-actions" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          {cancelLabel}
        </button>
        <button
          type="button"
          className={isDanger ? 'btn btn-danger' : 'btn btn-primary'}
          onClick={onConfirm}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
