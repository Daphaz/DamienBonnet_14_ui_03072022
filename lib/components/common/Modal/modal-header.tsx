import clsx from 'clsx';
import React from 'react';

import s from './styles.module.scss';

export interface Props {
  className?: string;
  justify?: 'center' | 'space';
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type ModalHeaderProps = NativeAttrs & Props;

const ModalHeader: React.FC<React.PropsWithChildren<ModalHeaderProps>> = ({
  children,
  className,
  justify,
  ...props
}) => {
  return (
    <div
      className={clsx(s.header, className, justify && s[justify])}
      {...props}
    >
      {children}
    </div>
  );
};

const MemoModalHeader = React.memo(ModalHeader);

export default MemoModalHeader;
