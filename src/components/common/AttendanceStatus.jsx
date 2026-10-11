import React from 'react';

/**
 * AttendanceStatus Component
 * Semantic status indicator: quiet dot + single word.
 * Rules:
 * >= 75%: Eligible (.status--ok)
 * >= 60% and < 75%: Warning (.status--warn)
 * < 60%: Detained (.status--bad)
 */
export default function AttendanceStatus({ status }) {
  let modifier = 'status--ok';
  if (status === 'Warning') modifier = 'status--warn';
  else if (status === 'Detained') modifier = 'status--bad';

  return (
    <span className={`status ${modifier}`}>
      {status}
    </span>
  );
}
