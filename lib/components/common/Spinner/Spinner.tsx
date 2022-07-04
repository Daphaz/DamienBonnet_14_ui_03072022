import clsx from 'clsx';
import React from 'react';

import s from './styles.module.scss';

export interface ISpinnerProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  color?:
    | 'white'
    | 'black'
    | 'primary'
    | 'primary-light'
    | 'secondary'
    | 'secondary-light'
    | 'green'
    | 'yellow'
    | 'grey-700'
    | 'grey-600'
    | 'grey-500'
    | 'grey-400'
    | 'grey-300'
    | 'grey-200';
}

const Spinner = ({
  width = 50,
  height = 50,
  color = 'white',
  className,
  ...rest
}: ISpinnerProps) => {
  return (
    <svg
      {...rest}
      className={clsx(s.spin, className)}
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
