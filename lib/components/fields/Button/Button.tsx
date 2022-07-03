import clsx from 'clsx';
import React from 'react';

import s from './styles.module.scss';

export interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
}

const Button = ({ label, className, ...rest }: IButtonProps) => {
  const classes = clsx(s.btn, s.primary, className);
  return (
    <button {...rest} className={classes}>
      {label}
    </button>
  );
};

export default Button;
