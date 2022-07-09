import clsx from 'clsx';
import React from 'react';

import s from './styles.module.scss';

interface Props {
  className?: string;
  justify?: 'center' | 'space';
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type ModalFooterProps = Props & NativeAttrs;

const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className,
  justify,
  ...props
}) => {
  return (
    <div
      className={clsx(s.footer, className, justify && s[justify])}
      {...props}
    >
      {children}
    </div>
  );
};

const memoModalFooter = React.memo(ModalFooter);

export default memoModalFooter;
