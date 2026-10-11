import React from 'react';

/**
 * PageHead Component
 * Standard page title, description, and primary action bar (.page-head).
 */
export default function PageHead({ eyebrow, title, description, action = null }) {
  return (
    <header className="page-head">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action && <div className="page-head-actions">{action}</div>}
    </header>
  );
}
