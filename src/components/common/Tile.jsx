import React from 'react';

/**
 * Tile Component
 * Reusable Bento tile with span modifiers and optional dark ink variant (.tile, .tile-ink, .tile-flush).
 */
export default function Tile({
  children,
  span = '4',
  row = null,
  ink = false,
  flush = false,
  className = '',
  as: Component = 'article',
  ...rest
}) {
  const classes = [
    'tile',
    span ? `span-${span}` : '',
    row ? `row-${row}` : '',
    ink ? 'tile-ink' : '',
    flush ? 'tile-flush' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
