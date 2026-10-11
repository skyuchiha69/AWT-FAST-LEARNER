import React from 'react';

/**
 * StatCard Component
 * Modern KPI card for dashboard with icon highlight, label, counter and subtitle.
 */
export default function StatCard({ label, value, description, icon: Icon, colorTheme = 'navy' }) {
  const iconThemeClass = `stat-card-icon-wrapper stat-icon-${colorTheme}`;

  return (
    <div className="stat-card">
      <div className="stat-card-info">
        <span className="stat-card-label">{label}</span>
        <span className="stat-card-value">{value}</span>
        {description && <span className="stat-card-desc">{description}</span>}
      </div>
      {Icon && (
        <div className={iconThemeClass}>
          <Icon size={22} />
        </div>
      )}
    </div>
  );
}
