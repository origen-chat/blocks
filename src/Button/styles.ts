import { css } from 'styled-components';

import {
  ButtonSize,
  ButtonVariant,
  ButtonColor,
  WrapperProps,
} from './component';

export function getButtonSizeStyles(
  size?: ButtonSize,
): ReturnType<typeof css> | null {
  if (size === 'small') {
    return css`
      font-size: var(--xs-font-size);
      padding: 0 var(--sm-padding);
      height: 1.5rem;
    `;
  }

  if (size === 'medium') {
    return css`
      font-size: var(--sm-font-size);
      padding: 0 var(--md-padding);
      height: 1.8rem;
    `;
  }

  if (size === 'large') {
    return css`
      font-size: var(--md-font-size);
      padding: 0 var(--xxl-padding);
      height: 2.6rem;
    `;
  }

  return null;
}

export type GetButtonVariantStylesArgs = Readonly<{
  variant: ButtonVariant;
  color: ButtonColor;
  isPointerOver: boolean;
}>;

export function getButtonVariantStyles(args: GetButtonVariantStylesArgs): any {
  if (args.variant === 'contained') {
    let backgroundColor: string;
    let backgroundColorWhenPointerOver: string;
    let backgroundColorWhenActive: string;

    if (args.color === 'primary') {
      backgroundColor = 'var(--primary-color-500)';
      backgroundColorWhenPointerOver = 'var(--primary-color-400)';
      backgroundColorWhenActive = 'var(--primary-color-600)';
    } else if (args.color === 'accent') {
      backgroundColor = 'var(--accent-color-500)';
      backgroundColorWhenPointerOver = 'var(--accent-color-400)';
      backgroundColorWhenActive = 'var(--accent-color-600)';
    } else {
      backgroundColor = 'var(--danger-color-500)';
      backgroundColorWhenPointerOver = 'var(--danger-color-400)';
      backgroundColorWhenActive = 'var(--danger-color-600)';
    }

    return css<WrapperProps>`
      border-style: none;
      color: white;
      background-color: ${backgroundColor};

      ${props =>
        props.isPointerOver &&
        css`
          background-color: ${backgroundColorWhenPointerOver};
        `}

      &:active {
        background-color: ${backgroundColorWhenActive};
      }
    `;
  }

  return null;
}
