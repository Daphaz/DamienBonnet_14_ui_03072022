/* istanbul ignore file */
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

export interface CSSTransitionProps {
  visible?: boolean;
  childrenRef?: React.RefObject<HTMLElement>;
  enterTime?: number;
  leaveTime?: number;
  clearTime?: number;
  className?: string;
}

const CSSTransition: React.FC<React.PropsWithChildren<CSSTransitionProps>> = ({
  children,
  childrenRef,
  visible = false,
  className = '',
  clearTime = 60,
  enterTime = 60,
  leaveTime = 60,
}) => {
  const [classes, setClasses] = useState<string>('');
  const [renderable, setRenderable] = useState<boolean>(visible);

  useEffect(() => {
    const statusClassName = visible ? 'transition_enter' : 'transition_leave';
    const time = visible ? enterTime : leaveTime;

    if (visible && !renderable) {
      setRenderable(true);
    }

    setClasses(statusClassName);

    // set class to active
    const timer = setTimeout(() => {
      setClasses(`${statusClassName} transition_active`);
      clearTimeout(timer);
    }, time);

    // remove classess when animation over
    const clearClassesTimer = setTimeout(() => {
      if (!visible) {
        setClasses('');
        setRenderable(false);
      }
      clearTimeout(clearClassesTimer);
    }, time + clearTime);

    return () => {
      clearTimeout(timer);
      clearTimeout(clearClassesTimer);
    };
  }, [visible, renderable, enterTime, leaveTime, clearTime]);

  // update children ref classes
  useEffect(() => {
    if (!childrenRef?.current) {
      return;
    }
    const classesArr = classes.split(' ');
    const refClassesArr = childrenRef.current.className.split(' ');
    const newRefClassesArr = refClassesArr.filter(
      (item) => !item.includes('transition')
    );
    childrenRef.current.className = clsx(newRefClassesArr, classesArr);
  }, [childrenRef, classes]);

  if (!React.isValidElement(children) || !renderable) return null;

  return React.cloneElement(children, {
    className: clsx(
      children.props.className,
      className,
      !childrenRef?.current ? classes : ''
    ),
  });
};

export default CSSTransition;
