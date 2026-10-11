/**
 * Helper to determine academic eligibility based on attendance percentage.
 * Exact thresholds required by GSFC University AWT Practical:
 * - Attendance >= 75%: "Eligible"
 * - Attendance >= 60% and < 75%: "Warning"
 * - Attendance < 60%: "Detained"
 *
 * @param {number|string} attendance
 * @returns {"Eligible"|"Warning"|"Detained"|"Invalid"}
 */
export function getAttendanceStatus(attendance) {
  const value = Number(attendance);
  if (attendance === '' || attendance === null || attendance === undefined || !Number.isFinite(value) || value < 0 || value > 100) {
    return 'Invalid';
  }
  if (value >= 75) return 'Eligible';
  if (value >= 60) return 'Warning';
  return 'Detained';
}

/**
 * Returns color tokens and accessibility labels for an attendance status
 */
export function getAttendanceBadgeConfig(status) {
  switch (status) {
    case 'Eligible':
      return {
        variant: 'success',
        bg: 'var(--color-success-subtle)',
        border: 'var(--color-success-border)',
        text: 'var(--color-success)',
        label: 'Eligible (>= 75%)',
        shortLabel: 'Eligible',
      };
    case 'Warning':
      return {
        variant: 'warning',
        bg: 'var(--color-warning-subtle)',
        border: 'var(--color-warning-border)',
        text: 'var(--color-warning)',
        label: 'Attendance Warning (60% - 74.9%)',
        shortLabel: 'Warning',
      };
    case 'Detained':
      return {
        variant: 'danger',
        bg: 'var(--color-danger-subtle)',
        border: 'var(--color-danger-border)',
        text: 'var(--color-danger)',
        label: 'Attendance Detained (< 60%)',
        shortLabel: 'Detained',
      };
    default:
      return {
        variant: 'neutral',
        bg: 'var(--color-surface-hover)',
        border: 'var(--color-border)',
        text: 'var(--color-text-muted)',
        label: 'Not Available',
        shortLabel: 'N/A',
      };
  }
}
