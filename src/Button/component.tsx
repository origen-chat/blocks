import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { ClassNameProp } from '../types';

import { getButtonSizeStyles, getButtonVariantStyles } from './styles';

export type WrapperProps = Pick<
  ButtonProps,
  'color' | 'disabled' | 'size' | 'variant'
> &
  Readonly<{
    isPointerOver: boolean;
  }>;

const Wrapper = styled.button<WrapperProps>`
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: center;

  border-radius: var(--md-border-radius);
  font-weight: var(--bold-font-weight);

  outline: none;
  user-select: none;

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: var(--md-border-width) solid var(--focus-outline-color);
  }

  ${props => getButtonSizeStyles(props.size)}
  ${props =>
    getButtonVariantStyles({
      variant: props.variant,
      color: props.color,
      isPointerOver: props.isPointerOver,
    })}


  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}
`;

const Label = styled.span`
  text-align: center;
`;

export type ButtonProps = Readonly<{
  type?: ButtonType;
  label: string;
  variant: ButtonVariant;
  color: ButtonColor;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
}> &
  Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    | 'onClick'
    | 'onPointerDown'
    | 'onPointerUp'
    | 'onPointerEnter'
    | 'onPointerLeave'
    | 'onPointerCancel'
    | 'autoFocus'
    | 'aria-label'
  > &
  ClassNameProp;

export type ButtonType = 'button' | 'submit';
export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonColor = 'primary' | 'accent' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export const Button: React.FunctionComponent<ButtonProps> = props => {
  const {
    handlePointerEnter,
    handlePointerLeave,
    isPointerOver,
  } = usePointerEventHandlersAndState({
    onPointerEnter: props.onPointerEnter,
    onPointerLeave: props.onPointerLeave,
  });

  return (
    <Wrapper
      type={props.type}
      variant={props.variant}
      size={props.size}
      color={props.color}
      onClick={props.onClick}
      onPointerDown={props.onPointerDown}
      onPointerUp={props.onPointerUp}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={props.onPointerCancel}
      isPointerOver={isPointerOver}
      disabled={props.disabled}
      autoFocus={props.autoFocus}
      className={props.className}
      aria-label={props['aria-label']}
    >
      <Label>{props.label}</Label>
    </Wrapper>
  );
};

type UsePointerEventHandlersAndStateArgs = Readonly<
  Partial<
    Record<
      'onPointerEnter' | 'onPointerLeave',
      React.PointerEventHandler<HTMLButtonElement>
    >
  >
>;

type UsePointerEventHandlersAndStateReturn = Readonly<
  Record<
    'handlePointerEnter' | 'handlePointerLeave',
    React.PointerEventHandler<HTMLButtonElement>
  > &
    Record<'isPointerOver', boolean>
>;

function usePointerEventHandlersAndState(
  args: UsePointerEventHandlersAndStateArgs,
): UsePointerEventHandlersAndStateReturn {
  const [isPointerOver, setIsPointerOver] = useState(false);

  const handlePointerEnter: React.PointerEventHandler<
    HTMLButtonElement
  > = event => {
    setIsPointerOver(true);

    if (args.onPointerEnter) {
      args.onPointerEnter(event);
    }
  };

  const handlePointerLeave: React.PointerEventHandler<
    HTMLButtonElement
  > = event => {
    setIsPointerOver(false);

    if (args.onPointerLeave) {
      args.onPointerLeave(event);
    }
  };

  return {
    handlePointerEnter,
    handlePointerLeave,
    isPointerOver,
  };
}

Button.defaultProps = {
  color: 'primary',
  size: 'medium',
  variant: 'contained',
};

export default React.memo(Button);
