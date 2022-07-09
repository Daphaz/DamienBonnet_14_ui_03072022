import clsx from 'clsx';
import React from 'react';

import s from './styles.module.scss';

interface Props {
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLElement>, keyof Props>;

export type ModalBodyProps = Props & NativeAttrs;

const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx(s.body, className)} {...props}>
      {children}
    </div>
  );
};

const memoModalBody = React.memo(ModalBody);

export default memoModalBody;
