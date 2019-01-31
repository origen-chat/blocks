import React, { useState } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';

import Input from '../Input';
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

const StyledInput = styled(Input)`
  align-self: stretch;
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
  value: string;
  label?: string;
  error?: string;
  helperText?: string;
  onChange: (value: string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}> &
  Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    | 'onFocus'
    | 'onBlur'
    | 'name'
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

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target;

    props.onChange(value);
  };

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
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={props.placeholder}
        isInvalid={!!props.error}
        isPointerOver={isPointerOver}
        onPointerOver={handlePointerOver}
        onPointerLeave={handlePointerLeave}
        autoFocus={props.autoFocus}
        autoComplete={props.autoComplete}
        disabled={props.disabled}
        aria-label={props['aria-label']}
        aria-required={props['aria-required']}
        aria-invalid={!!props.error}
        ref={props.inputRef}
      />
      {props.error && <StyledInputError error={props.error} />}
      {props.helperText && <StyledInputHelperText text={props.helperText} />}
    </Wrapper>
  );
};

export default React.memo(TextInput);
