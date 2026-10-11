import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PageHead from '../components/common/PageHead';
import Tile from '../components/common/Tile';
import StatTile from '../components/common/StatTile';
import AttendanceStatus from '../components/common/AttendanceStatus';
import AttendanceCell from '../components/common/AttendanceCell';
import { getAttendanceStatus } from '../utils/attendance';

/**
 * AttendanceOverview Page
 * Breakdown into the 3 university tiers: Eligible, Warning, Detained.
 */
export default function AttendanceOverview() {
  const { students, courses } = useApp();

  const courseMap = useMemo(() => {
    return courses.reduce((acc, c) => {
      acc[c.id] = c.name;
      return acc;
    }, {});
  }, [courses]);

  const { eligible, warning, detained } = useMemo(() => {
    const eligibleList = [];
    const warningList = [];
    const detainedList = [];

    students.forEach((s) => {
      const status = getAttendanceStatus(s.attendance);
      if (status === 'Eligible') eligibleList.push(s);
      else if (status === 'Warning') warningList.push(s);
      else if (status === 'Detained') detainedList.push(s);
    });

    return { eligible: eligibleList, warning: warningList, detained: detainedList };
  }, [students]);

  return (
    <div>
      <PageHead
        eyebrow="COMPLIANCE MONITORING"
        title="Attendance records"
        description="University examination clearance compliance and student tier breakdown."
      />

      {/* 3 Tier Stat Tiles */}
      <section className="bento" style={{ marginBottom: 'var(--s-6)' }}>
        <StatTile
          span="4"
          label="Eligible students"
          value={eligible.length}
          note=">= 75% attendance — Cleared for examinations"
          delta="ok"
        />

        <StatTile
          span="4"
          label="Attendance warning"
          value={warning.length}
          note="60%–74.9% attendance — Remedial counseling required"
          delta="bad"
        />

        <StatTile
          span="4"
          label="Detained students"
          value={detained.length}
          note="< 60% attendance — Barred from semester exams"
          delta="bad"
        />
      </section>

      {/* Grouped Lists */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-6)' }}>
        {/* Detained Students */}
        <Tile span="12" flush={true}>
          <div className="tile-head">
            <span className="tile-title">Detained students ({detained.length})</span>
            <AttendanceStatus status="Detained" />
          </div>

          {detained.length > 0 ? (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Semester</th>
                    <th>Attendance</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {detained.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <div className="person">
                          <Link to={`/students/${s.id}`} className="name">
                            {s.name}
                          </Link>
                          <span className="sub num">{s.enrollment}</span>
                        </div>
                      </td>
                      <td>{courseMap[s.courseId] || 'Unassigned'}</td>
                      <td>Semester {s.semester}</td>
                      <td>
                        <AttendanceCell attendance={s.attendance} />
                      </td>
                      <td>
                        <AttendanceStatus status="Detained" />
                      </td>
                      <td>
                        <Link to={`/students/${s.id}`} className="btn btn-ghost btn-sm">
                          Inspect
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty" style={{ padding: 'var(--s-6)' }}>
              <p className="muted">No students are currently in the detained tier.</p>
            </div>
          )}
        </Tile>

        {/* Warning Students */}
        <Tile span="12" flush={true}>
          <div className="tile-head">
            <span className="tile-title">Students on attendance warning ({warning.length})</span>
            <AttendanceStatus status="Warning" />
          </div>

          {warning.length > 0 ? (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Semester</th>
                    <th>Attendance</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {warning.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <div className="person">
                          <Link to={`/students/${s.id}`} className="name">
                            {s.name}
                          </Link>
                          <span className="sub num">{s.enrollment}</span>
                        </div>
                      </td>
                      <td>{courseMap[s.courseId] || 'Unassigned'}</td>
                      <td>Semester {s.semester}</td>
                      <td>
                        <AttendanceCell attendance={s.attendance} />
                      </td>
                      <td>
                        <AttendanceStatus status="Warning" />
                      </td>
                      <td>
                        <Link to={`/students/${s.id}`} className="btn btn-ghost btn-sm">
                          Inspect
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty" style={{ padding: 'var(--s-6)' }}>
              <p className="muted">No students currently in the attendance warning range.</p>
            </div>
          )}
        </Tile>

        {/* Eligible Students */}
        <Tile span="12" flush={true}>
          <div className="tile-head">
            <span className="tile-title">Eligible students ({eligible.length})</span>
            <AttendanceStatus status="Eligible" />
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Attendance</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {eligible.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className="person">
                        <Link to={`/students/${s.id}`} className="name">
                          {s.name}
                        </Link>
                        <span className="sub num">{s.enrollment}</span>
                      </div>
                    </td>
                    <td>{courseMap[s.courseId] || 'Unassigned'}</td>
                    <td>Semester {s.semester}</td>
                    <td>
                      <AttendanceCell attendance={s.attendance} />
                    </td>
                    <td>
                      <AttendanceStatus status="Eligible" />
                    </td>
                    <td>
                      <Link to={`/students/${s.id}`} className="btn btn-ghost btn-sm">
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tile>
      </div>
    </div>
  );
}
