import clsx from 'clsx';
import React from 'react';

import s from './styles.module.scss';

export interface IInputProps {
  inputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  error?: string;
  fullWidth?: boolean;
  classContainer?: string;
}

const Input = ({
  inputProps,
  classContainer,
  fullWidth = false,
  error,
}: IInputProps) => {
  /* istanbul ignore next */
  const { className, disabled, onChange, id, ...rest } = inputProps || {};

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange && onChange(event);
  };

  return (
    <div
      className={clsx(s.control, { [s.fullWidth]: fullWidth }, classContainer)}
    >
      <div className={clsx(s.mainContainer, { [s.fullWidth]: fullWidth })}>
        <label className={s.label} htmlFor={id}>
          <input
            {...rest}
            disabled={!!disabled}
            id={id}
            className={clsx(
              s.input,
              {
                [s.fullWidth]: fullWidth,
                [s.isError]: !!error,
              },
              className
            )}
            onChange={changeHandler}
          />
        </label>
      </div>
      {error && <span className={s.error}>{error}</span>}
    </div>
  );
};

export default Input;
