import clsx from 'clsx';
import React from 'react';

export interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
}

const Button = ({ label, className, ...rest }: IButtonProps) => {
  const classes = clsx(className);
  return (
    <button {...rest} className={classes}>
      {label}
    </button>
  );
};

export default Button;
