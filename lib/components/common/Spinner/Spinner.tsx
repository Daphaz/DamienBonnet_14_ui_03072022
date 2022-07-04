import React from 'react';

import s from './styles.module.scss';

export interface ISpinnerProps {
  width?: number;
  height?: number;
  color?: 'white' | 'black';
}

const Spinner = ({
  width = 50,
  height = 50,
  color = 'white',
}: ISpinnerProps) => {
  return (
    <svg
      className={s.spin}
      viewBox='0 0 50 50'
      style={{ width, height }}
      fill='none'
    >
      <circle
        className={s.spinPath}
        cx='25'
        cy='25'
        r='20'
        stroke={`var(--clr-${color})`}
        strokeWidth='5'
      ></circle>
    </svg>
  );
};

export default Spinner;
