import React from 'react';
import styled from 'styled-components';

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
`;

export const RequiredStar = styled.span`
  margin-left: var(--xs-margin);
`;

export type InputLabelProps = Readonly<{
  label: string;
  hasFocus?: boolean;
  required?: boolean;
}> &
  Pick<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'> &
  ClassNameProp;

export const InputLabel: React.FunctionComponent<InputLabelProps> = props => {
  const required = !!props.required;

  return (
    <StyledLabel
      hasFocus={props.hasFocus}
      htmlFor={props.htmlFor}
      required={required}
      className={props.className}
    >
      {props.label}
      {required && <RequiredStar aria-hidden>*</RequiredStar>}
    </StyledLabel>
  );
};

export default React.memo(InputLabel);
