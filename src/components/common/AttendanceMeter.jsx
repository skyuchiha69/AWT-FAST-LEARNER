import React from 'react';
import { getAttendanceStatus } from '../../utils/attendance';

/**
 * AttendanceMeter Component
 * Thin accessible progress meter (.meter, .meter--ok, .meter--warn, .meter--bad).
 */
export default function AttendanceMeter({ attendance, showPercent = false, className = '' }) {
  const value = Number(attendance) || 0;
  const status = getAttendanceStatus(value);

  let modifier = 'meter--ok';
  if (status === 'Warning') modifier = 'meter--warn';
  else if (status === 'Detained') modifier = 'meter--bad';

  return (
    <div className={`meter ${modifier} ${className}`}>
      <span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
