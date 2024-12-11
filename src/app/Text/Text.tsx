import React, { ReactNode } from 'react';
import styles from './text.module.css';

import type {
  TextCompColor,
  TextCompType,
  TextCompWeight,
  TextLineClamp,
  TextTagType,
} from './text.types';

type DefaultPropsType = {
  tag: TextTagType;
  type: TextCompType;
  weight: TextCompWeight;
  flat: boolean;
};

const defaultProps: DefaultPropsType = {
  tag: 'span',
  type: 'regular',
  weight: 'regular',
  flat: true,
};

type Props = {
  className?: string;
  bold?: boolean;
  italic?: boolean;
  ellipsis?: boolean;
  align?: 'center' | 'left' | 'right';
  center?: boolean;
  white?: boolean;
  children?: ReactNode;
  capitalize?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  title?: string;
  color?: TextCompColor;
  lineClamp?: TextLineClamp;
} & DefaultPropsType;

const Text = ({
  className,
  tag: Element,
  children,
  bold,
  type,
  weight,
  italic,
  ellipsis,
  flat,
  center,
  align,
  white,
  capitalize,
  uppercase,
  lowercase,
  title,
  color,
  lineClamp,
}: Props) => {
  const textStyles = [
    styles.common,
    type && styles[type],
    weight && styles[`weight-${weight}`],
    bold && styles.bold,
    italic && styles.italic,
    ellipsis && styles.ellipsis,
    center && styles.center,
    white && styles.white,
    flat && styles['text-flat'],
    align && styles[`textAlign-${align}`],
    color && styles[`color-${color}`],
    lineClamp && styles.lineClamp,
    lineClamp && styles[`lineClamp-${lineClamp}`],
    capitalize && styles.capitalize,
    uppercase && styles.uppercase,
    lowercase && styles.lowercase,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Element className={textStyles} title={title}>
      {children}
    </Element>
  );
};

Text.defaultProps = defaultProps;

export default Text;
