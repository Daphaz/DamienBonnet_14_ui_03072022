import clsx from 'clsx';
import React, { MouseEvent, useState } from 'react';

import s from './styles.module.scss';

import { ButtonVariant } from './enums';
import { Spinner } from '../../common';

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
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  ...rest
}: IButtonProps) => {
  const [state, setState] = useState<'ready' | 'pressed'>('ready');
  const classes = clsx(
    s.btn,
    s[variant],
    {
      [s.isPressed]: state === 'pressed',
      [s.bs]: shadow,
      [s.border]: borderer,
      [s.loading]: loading,
    },
    className
  );

  const handleReady = (e: MouseEvent<HTMLButtonElement>) => {
    setState('ready');
    onMouseDown && onMouseDown(e);
  };

  const handlePressed = (e: MouseEvent<HTMLButtonElement>) => {
    setState('pressed');
    onMouseUp && onMouseUp(e);
    onMouseLeave && onMouseLeave(e);
  };

  return (
    <button
      {...rest}
      className={classes}
      onMouseDown={handlePressed}
      onMouseUp={handleReady}
      onMouseLeave={handleReady}
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
