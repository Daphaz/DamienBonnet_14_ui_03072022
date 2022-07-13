/* istanbul ignore file */
import React, { MouseEvent, useCallback, useMemo } from 'react';

import s from './styles.module.scss';

import { useCurrentState } from '../../hooks';
import CSSTransition from '../../utils/css-transition';

export interface IBackdropProps {
  onClick?: (ev: MouseEvent<HTMLElement>) => void;
  visible?: boolean;
}

const Backdrop = React.memo(
  ({
    onClick,
    visible = false,
    children,
  }: React.PropsWithChildren<IBackdropProps>) => {
    const [, setIsContentMouseDown, IsContentMouseDownRef] =
      useCurrentState(false);

    const clickHandler = (event: MouseEvent<HTMLElement>) => {
      if (IsContentMouseDownRef.current) return;
      onClick && onClick(event);
    };
    const childrenClickHandler = useCallback(
      (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
      },
      []
    );
    const mouseUpHandler = () => {
      if (!IsContentMouseDownRef.current) return;
      const timer = setTimeout(() => {
        setIsContentMouseDown(false);
        clearTimeout(timer);
      }, 0);
    };

    const renderChildren = useMemo(() => {
      return (
        <div
          className={s.backdrop}
          onClick={clickHandler}
          onMouseUp={mouseUpHandler}
          data-testid='backdrop'
        >
          <div className={s.backdropLayer} />
          <div
            data-testid='backdrop-content'
            className={s.backdropContent}
            onClick={childrenClickHandler}
            onMouseDown={() => setIsContentMouseDown(true)}
          >
            {children}
          </div>
        </div>
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children]);

    return visible ? (
      <CSSTransition
        visible={visible}
        enterTime={20}
        leaveTime={20}
        clearTime={150}
      >
        {renderChildren}
      </CSSTransition>
    ) : null;
  }
);

export default Backdrop;
