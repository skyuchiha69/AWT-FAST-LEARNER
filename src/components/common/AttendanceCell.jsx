import React from 'react';
import { getAttendanceStatus } from '../../utils/attendance';
import AttendanceStatus from './AttendanceStatus';

/**
 * AttendanceCell Component
 * Table attendance cell: percentage + thin meter (.att, .meter, .att-pct).
 */
export default function AttendanceCell({ attendance }) {
  const value = Number(attendance) || 0;
  const status = getAttendanceStatus(value);

  let modifier = 'meter--ok';
  if (status === 'Warning') modifier = 'meter--warn';
  else if (status === 'Detained') modifier = 'meter--bad';

  return (
    <div className="att">
      <span className="att-pct num">{value}%</span>
      <div className={`meter ${modifier}`}>
        <span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  );
}
