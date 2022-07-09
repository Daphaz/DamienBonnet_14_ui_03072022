import clsx from 'clsx';
import React from 'react';

import s from './styles.module.scss';

import {
  AlignContent,
  AlignItems,
  Direction,
  Display,
  Justify,
  Wrap,
} from '../../utils/prop-types';

interface Props {
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  fluid?: boolean;
  wrap?: Wrap;
  display?: Display;
  justify?: Justify;
  direction?: Direction;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
}

const defaultProps = {
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
  fluid: false,
  wrap: 'wrap' as Wrap,
  display: 'block' as Display,
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type ContainerProps = Props & NativeAttrs;

const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  xs,
  sm,
  md,
  lg,
  xl,
  wrap,
  display,
  justify,
  direction,
  alignItems,
  alignContent,
  children,
  fluid,
  className,
  ...props
}) => {
  const getMaxWidth = () => {
    if (xs) return s.xs;
    if (sm) return s.sm;
    if (md) return s.md;
    if (lg) return s.lg;
    if (xl) return s.xl;
    return '';
  };

  return (
    <div
      className={clsx(
        s.root,
        getMaxWidth(),
        {
          [s.fluid]: fluid,
        },
        wrap && s[wrap],
        display && s[display],
        justify && s[justify],
        direction && s[direction],
        alignItems && s[`a_${alignItems}`],
        alignContent && s[`ac_${alignContent}`],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Container.defaultProps = defaultProps;

export default React.memo(Container);
