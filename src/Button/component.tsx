import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { ClassNameProp } from '../types';

import { getButtonSizeStyles, getButtonVariantStyles } from './styles';

export type WrapperProps = Pick<
  ButtonProps,
  'color' | 'disabled' | 'size' | 'variant'
> &
  Readonly<{
    isPointerDown: boolean;
    isPointerOver: boolean;
  }>;

const Wrapper = styled.button<WrapperProps>`
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: center;

  border-radius: var(--md-border-radius);
  font-weight: var(--bold-font-weight);
  transition-property: background, color, border, box-shadow;
  transition-duration: var(--md-transition);

  outline: none;

  ${props => getButtonSizeStyles(props.size)}
  ${props =>
    getButtonVariantStyles({
      variant: props.variant,
      color: props.color,
      isPointerOver: props.isPointerOver,
      isPointerDown: props.isPointerDown,
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
    | 'onPointerOver'
    | 'onPointerLeave'
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
    handlePointerOver,
    handlePointerLeave,
    handlePointerDown,
    handlePointerUp,
    isPointerOver,
    isPointerDown,
  } = usePointerEventHandlersAndState({
    onPointerOver: props.onPointerOver,
    onPointerLeave: props.onPointerLeave,
    onPointerDown: props.onPointerDown,
    onPointerUp: props.onPointerUp,
  });

  return (
    <Wrapper
      type={props.type}
      variant={props.variant}
      size={props.size}
      color={props.color}
      onClick={props.onClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOver={handlePointerOver}
      onPointerLeave={handlePointerLeave}
      isPointerOver={isPointerOver}
      isPointerDown={isPointerDown}
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
      'onPointerOver' | 'onPointerLeave' | 'onPointerDown' | 'onPointerUp',
      React.PointerEventHandler<HTMLButtonElement>
    >
  >
>;

type UsePointerEventHandlersAndStateReturn = Readonly<
  Record<
    | 'handlePointerOver'
    | 'handlePointerLeave'
    | 'handlePointerDown'
    | 'handlePointerUp',
    React.PointerEventHandler<HTMLButtonElement>
  > &
    Record<'isPointerOver' | 'isPointerDown', boolean>
>;

function usePointerEventHandlersAndState(
  args: UsePointerEventHandlersAndStateArgs,
): UsePointerEventHandlersAndStateReturn {
  const [isPointerOver, setIsPointerOver] = useState(false);

  const handlePointerOver: React.PointerEventHandler<
    HTMLButtonElement
  > = event => {
    setIsPointerOver(true);

    if (args.onPointerOver) {
      args.onPointerOver(event);
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

  const [isPointerDown, setIsPointerDown] = useState(false);

  const handlePointerDown: React.PointerEventHandler<
    HTMLButtonElement
  > = event => {
    setIsPointerDown(true);

    if (args.onPointerDown) {
      args.onPointerDown(event);
    }
  };

  const handlePointerUp: React.PointerEventHandler<
    HTMLButtonElement
  > = event => {
    setIsPointerDown(false);

    if (args.onPointerUp) {
      args.onPointerUp(event);
    }
  };

  return {
    handlePointerOver,
    handlePointerLeave,
    handlePointerDown,
    handlePointerUp,
    isPointerDown,
    isPointerOver,
  };
}

Button.defaultProps = {
  color: 'primary',
  size: 'medium',
  variant: 'contained',
};

export default Button;
