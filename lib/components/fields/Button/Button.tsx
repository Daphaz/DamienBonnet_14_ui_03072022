import clsx from 'clsx';
import React, { useState } from 'react';

import s from './styles.module.scss';

import { Spinner } from '../../common';
import { ButtonVariant } from './enums';

export interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
  shadow?: boolean;
  variant?: ButtonVariant;
  borderer?: boolean;
  loading?: boolean;
}

const Button = ({
  label,
  shadow = true,
  variant = ButtonVariant.Primary,
  borderer = false,
  loading = false,
  className,
  ...rest
}: IButtonProps) => {
  const [state, setState] = useState<'ready' | 'pressed'>('ready');
  const classes = clsx(
    s.btn,
    s[variant],
    {
      [s.isPressed]: state == 'pressed',
      [s.bs]: shadow,
      [s.border]: borderer,
      [s.loading]: loading,
    },
    className
  );

  return (
    <button
      {...rest}
      className={classes}
      onMouseDown={() => setState('pressed')}
      onMouseUp={() => setState('ready')}
      onMouseLeave={() => setState('ready')}
    >
      {loading && (
        <span className={s.spinner}>
          <Spinner width={18} height={18} />
        </span>
      )}
      <span className={s.text}>{label}</span>
    </button>
  );
};

export default Button;
