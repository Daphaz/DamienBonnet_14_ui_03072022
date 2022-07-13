import clsx from 'clsx';
import React, { SVGProps, useEffect, useMemo, useRef, useState } from 'react';

import s from './styles.module.scss';

import { isChildElement } from '../../utils/collections';
import CSSTransition from '../../utils/css-transition';

export interface IModalWrapperProps {
  visible?: boolean;
  onCloseButtonClick?: () => void;
  className?: string;
  rebound?: boolean;
  closeButton?: boolean;
}

const defaultProps = {
  className: '',
  visible: false,
  rebound: false,
};

const IcRoundClose = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      role='img'
      {...props}
    >
      <path
        fill='currentColor'
        d='M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z'
      ></path>
    </svg>
  );
};

const ModalWrapper: React.FC<React.PropsWithChildren<IModalWrapperProps>> = ({
  children,
  className,
  closeButton,
  onCloseButtonClick,
  rebound,
  visible,
}) => {
  const modalContent = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);

  // istanbul ignore next-line
  useEffect(() => {
    const timer = setTimeout(() => {
      setRendered(true);
      clearTimeout(timer);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // istanbul ignore next-line
  useEffect(() => {
    if (!visible) return;
    const activeElement = document.activeElement;
    const isChild = isChildElement(modalContent.current, activeElement);
    if (isChild) return;
  }, [visible]);

  const handleClose = () => {
    onCloseButtonClick && onCloseButtonClick();
  };

  const renderChildren = useMemo(() => {
    return (
      <div
        role='dialog'
        ref={modalContent}
        className={clsx(
          s.modal,
          {
            rendered: rendered,
          },
          className
        )}
      >
        {closeButton && (
          <div
            aria-label='close-modal'
            className={s.btnClose}
            onClick={handleClose}
          >
            <IcRoundClose />
          </div>
        )}
        {children}
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rebound, children]);

  return (
    <CSSTransition
      visible={visible}
      enterTime={20}
      leaveTime={20}
      clearTime={300}
    >
      {renderChildren}
    </CSSTransition>
  );
};

ModalWrapper.defaultProps = defaultProps;

export default ModalWrapper;
