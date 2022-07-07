import clsx from 'clsx';
import React, { MouseEvent, useEffect, useState } from 'react';

import s from './styles.module.scss';

export type DropdownOptionType = {
  value: string;
  label: string;
};

export interface IDropdownProps {
  placeholder: string;
  variants?: 'primary' | 'secondary' | 'grey';
  bs?: boolean;
  options: DropdownOptionType[];
  classContainer?: string;
  onChange?: (val: string) => void;
}

const Icon = () => {
  return (
    <svg
      height='20'
      width='20'
      viewBox='0 0 20 20'
      role='img'
      aria-label='icon'
    >
      <path d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z'></path>
    </svg>
  );
};

const IconCheck = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      role='img'
      aria-label='icon-check'
    >
      <path
        fill='currentColor'
        d='M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41L9 16.17z'
      ></path>
    </svg>
  );
};

function Dropdown({
  placeholder,
  variants = 'grey',
  bs = true,
  options,
  classContainer,
  onChange,
}: IDropdownProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<DropdownOptionType | null>(
    null
  );

  useEffect(() => {
    const handler = () => setShowMenu(false);

    window.addEventListener('click', handler);

    return () => {
      window.removeEventListener('click', handler);
    };
  });

  const handleInputClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  const getDisplay = () => {
    return selectedValue ? selectedValue.label : placeholder;
  };

  const onItemClick = (opt: DropdownOptionType) => {
    setSelectedValue(opt);
    onChange && onChange(opt.value);
  };

  const isSelected = (opt: DropdownOptionType) => {
    return selectedValue ? selectedValue.value === opt.value : false;
  };

  return (
    <div className={clsx(s.container, s[variants], classContainer)}>
      <div
        className={clsx(s.input, {
          [s.bs]: bs,
          [s.isOpen]: showMenu,
        })}
        onClick={handleInputClick}
        role='button'
      >
        <div className={s.selectedValue}>{getDisplay()}</div>

        <div>
          <div className={s.tool}>
            <Icon />
          </div>
        </div>
      </div>

      {showMenu && (
        <div className={s.menuContainer}>
          <ul className={s.menu}>
            {options.map((opt) => (
              <li
                key={opt.value}
                className={s.item}
                onClick={() => onItemClick(opt)}
              >
                {opt.label}
                {isSelected(opt) && <IconCheck />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
