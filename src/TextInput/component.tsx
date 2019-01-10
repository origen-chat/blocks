import React, { useState } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';

import InputError from '../InputError';
import InputHelperText from '../InputHelperText';
import InputLabel from '../InputLabel';
import { ClassNameProp } from '../types';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

type StyledInputProps = Readonly<{
  isInvalid: boolean;
  isPointerOver: boolean;
}>;

const StyledInput = styled.input<StyledInputProps>`
  align-self: stretch;

  font-size: var(--md-font-size);

  padding: var(--sm-padding) var(--sm-padding);

  border-color: ${props =>
    props.isInvalid ? 'var(--danger-color-500)' : 'var(--grey-200)'};
  border-style: solid;
  border-width: var(--xs-border-width);
  border-radius: var(--sm-border-radius);
  outline: none;
  transition: var(--sm-transition);

  &:focus {
    border-color: ${props =>
      props.isInvalid ? 'var(--danger-color-500)' : 'var(--primary-color-500)'};
  }

  &:not(:focus) {
    border-color: ${props => props.isPointerOver && 'var(--grey-300)'};
  }
`;

const StyledInputLabel = styled(InputLabel)`
  align-self: stretch;

  margin-bottom: var(--xs-margin);
`;

const StyledInputError = styled(InputError)`
  align-self: stretch;

  margin-top: var(--xs-margin);
`;

const StyledInputHelperText = styled(InputHelperText)`
  align-self: stretch;

  margin-top: var(--xs-margin);
`;

export type TextInputProps = Readonly<{
  type?: TextInputType;
  label?: string;
  error?: string;
  helperText?: string;
}> &
  Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    | 'onChange'
    | 'onFocus'
    | 'onBlur'
    | 'name'
    | 'value'
    | 'id'
    | 'placeholder'
    | 'disabled'
    | 'autoFocus'
    | 'autoComplete'
    | 'aria-label'
    | 'aria-required'
  > &
  ClassNameProp;

export type TextInputType = 'text' | 'number';

export const TextInput: React.FunctionComponent<TextInputProps> = props => {
  const id = props.id || uuidv4();

  const [hasFocus, setHasFocus] = useState(false);

  const handleFocus: TextInputProps['onFocus'] = event => {
    setHasFocus(true);

    if (props.onFocus) {
      props.onFocus(event);
    }
  };

  const handleBlur: TextInputProps['onBlur'] = event => {
    setHasFocus(false);

    if (props.onBlur) {
      props.onBlur(event);
    }
  };

  const [isPointerOver, setIsPointerOver] = useState(false);

  const handlePointerOver: React.PointerEventHandler<HTMLInputElement> = () => {
    setIsPointerOver(true);
  };

  const handlePointerLeave: React.PointerEventHandler<
    HTMLInputElement
  > = () => {
    setIsPointerOver(false);
  };

  return (
    <Wrapper className={props.className}>
      {props.label && (
        <StyledInputLabel
          hasFocus={hasFocus}
          htmlFor={id}
          label={props.label}
        />
      )}
      <StyledInput
        id={id}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={props.placeholder}
        isInvalid={!!props.error}
        isPointerOver={isPointerOver}
        onPointerOver={handlePointerOver}
        onPointerLeave={handlePointerLeave}
        autoFocus={props.autoFocus}
        autoComplete={props.autoComplete}
        aria-label={props['aria-label']}
        aria-required={props['aria-required']}
        aria-invalid={!!props.error}
      />
      {props.error && <StyledInputError error={props.error} />}
      {props.helperText && <StyledInputHelperText text={props.helperText} />}
    </Wrapper>
  );
};

export default TextInput;
