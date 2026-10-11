import React from 'react';
import { getAttendanceStatus } from '../../utils/attendance';

/**
 * AttendanceBadge Component
 * Displays academic status (Eligible, Warning, Detained) with accessible dot and color styling.
 */
export default function AttendanceBadge({ attendance, showPercentage = false }) {
  const status = getAttendanceStatus(attendance);

  let badgeClass = 'badge badge-neutral';
  let label = 'Unknown';

  if (status === 'Eligible') {
    badgeClass = 'badge badge-success';
    label = 'Eligible';
  } else if (status === 'Warning') {
    badgeClass = 'badge badge-warning';
    label = 'Warning';
  } else if (status === 'Detained') {
    badgeClass = 'badge badge-danger';
    label = 'Detained';
  }

  return (
    <span className={badgeClass} title={`Attendance: ${attendance}% (${status})`}>
      <span className="badge-dot" aria-hidden="true" />
      <span>{label}</span>
      {showPercentage && <span className="font-mono">({attendance}%)</span>}
    </span>
  );
}
