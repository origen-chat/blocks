import React from 'react';
import styled, { css } from 'styled-components';

import { ClassNameProp } from '../types';

type StyledLabelProps = Pick<InputLabelProps, 'hasFocus' | 'required'>;

const StyledLabel = styled.label<StyledLabelProps>`
  font-size: var(--sm-font-size);
  font-weight: var(--bold-font-weight);

  color: ${props =>
    props.hasFocus
      ? 'var(--dark-primary-text-color)'
      : 'var(--dark-secondary-text-color)'};

  transition: var(--sm-transition);

  ${props =>
    props.required &&
    css`
      &::after {
        content: '*';

        margin-left: var(--xs-margin);
      }
    `}
`;

export type InputLabelProps = Readonly<{
  label: string;
  hasFocus?: boolean;
  required?: boolean;
}> &
  Pick<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'> &
  ClassNameProp;

export const InputLabel: React.FunctionComponent<InputLabelProps> = props => (
  <StyledLabel
    hasFocus={props.hasFocus}
    htmlFor={props.htmlFor}
    required={!!props.required}
    className={props.className}
  >
    {props.label}
  </StyledLabel>
);

export default InputLabel;
