import React from 'react';
import styled from 'styled-components';

import { ClassNameProp } from '../types';

type StyledLabelProps = Pick<InputLabelProps, 'hasFocus'>;

const StyledLabel = styled.label<StyledLabelProps>`
  font-size: var(--sm-font-size);
  font-weight: var(--bold-font-weight);

  color: ${props =>
    props.hasFocus
      ? 'var(--dark-primary-text-color)'
      : 'var(--dark-secondary-text-color)'};

  transition: var(--sm-transition);
`;

export type InputLabelProps = Readonly<{ label: string; hasFocus?: boolean }> &
  Pick<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'> &
  ClassNameProp;

export const InputLabel: React.FunctionComponent<InputLabelProps> = props => (
  <StyledLabel
    hasFocus={props.hasFocus}
    htmlFor={props.htmlFor}
    className={props.className}
  >
    {props.label}
  </StyledLabel>
);

export default InputLabel;
