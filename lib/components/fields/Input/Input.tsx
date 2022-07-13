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
  const { className, disabled, onChange, ...rest } = inputProps || {};

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange && onChange(event);
  };

  return (
    <div className={clsx(s.control, classContainer)}>
      <div className={s.mainContainer}>
        <label className={s.label}>
          <input
            {...rest}
            disabled={!!disabled}
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
