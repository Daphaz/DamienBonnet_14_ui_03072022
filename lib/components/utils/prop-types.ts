/* istanbul ignore file */
export const tuple = <T extends string[]>(...args: T) => args;

const justify = tuple(
  'flex_start',
  'center',
  'flex_end',
  'space_between',
  'space_around',
  'space_evenly'
);

const alignItems = tuple(
  'flex_start',
  'flex_end',
  'center',
  'stretch',
  'baseline'
);

const alignContent = tuple(
  'stretch',
  'center',
  'flex_start',
  'flex_end',
  'space_between',
  'space_around'
);

const direction = tuple('row', 'row_reverse', 'column', 'column_reverse');

const wrap = tuple('nowrap', 'wrap', 'wrap_reverse');

const display = tuple(
  'flex',
  'block',
  'grid',
  'inline',
  'inline_block',
  'inline_flex',
  'inline_grid'
);

export type Display = typeof display[number];

export type Justify = typeof justify[number];

export type AlignItems = typeof alignItems[number];

export type AlignContent = typeof alignContent[number];

export type Direction = typeof direction[number];

export type Wrap = typeof wrap[number];
