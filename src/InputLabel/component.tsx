import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

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

export const OptionalLabel = styled.span`
  color: var(--dark-quaternary-text-color);
  font-size: var(--xs-font-size);
  font-weight: var(--normal-font-weight);

  margin-left: var(--xs-margin);
`;

export type InputLabelProps = Readonly<{
  label: string;
  hasFocus?: boolean;
  showOptionalLabel?: boolean;
}> &
  Pick<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'> &
  ClassNameProp;

export const InputLabel: React.FunctionComponent<InputLabelProps> = props => {
  const { t } = useTranslation();

  const showOptionalLabel = !!props.showOptionalLabel;

  return (
    <StyledLabel
      hasFocus={props.hasFocus}
      htmlFor={props.htmlFor}
      className={props.className}
    >
      {props.label}
      {showOptionalLabel && (
        <OptionalLabel title={t('This field is not required')} aria-hidden>
          ({t('optional')})
        </OptionalLabel>
      )}
    </StyledLabel>
  );
};

export default React.memo(InputLabel);
