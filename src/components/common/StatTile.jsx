import React from 'react';
import Tile from './Tile';

/**
 * StatTile Component
 * Label, number, one line of support. No icon boxes.
 */
export default function StatTile({ label, value, note, span = '4', delta = null }) {
  return (
    <Tile span={span}>
      <div className="tile-title">{label}</div>
      <div className="stat-value">{value}</div>
      {note && (
        <div className="stat-note">
          {delta && (
            <span className={delta === 'ok' ? 'stat-delta-ok' : 'stat-delta-bad'}>
              {delta === 'ok' ? '↑ ' : '↓ '}
            </span>
          )}
          {note}
        </div>
      )}
    </Tile>
  );
}
