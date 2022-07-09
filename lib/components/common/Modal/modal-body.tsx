import clsx from 'clsx';
import React from 'react';

import s from './styles.module.scss';

import { Justify } from '../../utils/prop-types';

interface Props {
  className?: string;
  justify?: Justify;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLElement>, keyof Props>;

export type ModalBodyProps = Props & NativeAttrs;

const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className,
  justify,
  ...props
}) => {
  return (
    <div className={clsx(s.body, className, justify && s[justify])} {...props}>
      {children}
    </div>
  );
};

const memoModalBody = React.memo(ModalBody);

export default memoModalBody;
