import React from 'react';

/**
 * EmptyState Component
 * Clean, restrained empty state (.empty).
 */
export default function EmptyState({ title, description, action = null }) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
