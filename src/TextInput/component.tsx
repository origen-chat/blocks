import React, { useState } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';

import Input from '../Input';
import InputError from '../InputError';
import InputHelperText from '../InputHelperText';
import InputLabel from '../InputLabel';
import { ClassNameProp } from '../types';

import { largeWidth, mediumWidth, smallWidth, defaultWidth } from './constants';

type WrapperProps = Pick<TextInputProps, 'size'>;

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;

  width: ${props => getWrapperWidth(props.size)};
`;

function getWrapperWidth(size?: TextInputSize): string {
  if (size === 'large') {
    return largeWidth;
  }

  if (size === 'medium') {
    return mediumWidth;
  }

  if (size === 'small') {
    return smallWidth;
  }

  return defaultWidth;
}

const StyledInput = styled(Input)`
  width: 100%;
`;

const StyledInputLabel = styled(InputLabel)`
  margin-bottom: var(--xs-margin);
`;

const StyledInputError = styled(InputError)`
  margin-top: var(--xs-margin);
`;

const StyledInputHelperText = styled(InputHelperText)`
  margin-top: var(--xs-margin);
`;

export type TextInputProps = Readonly<{
  type?: TextInputType;
  value: string;
  label?: string;
  error?: string;
  helperText?: string;
  size?: TextInputSize;
  onChange: (value: string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  required?: boolean;
  showOptionalLabel?: boolean;
}> &
  Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    | 'onFocus'
    | 'onBlur'
    | 'name'
    | 'placeholder'
    | 'disabled'
    | 'autoFocus'
    | 'autoComplete'
  > &
  ClassNameProp;

export type TextInputType = 'text' | 'number' | 'password';

export type TextInputSize = 'small' | 'medium' | 'large';

export const TextInput: React.FunctionComponent<TextInputProps> = props => {
  const inputId = useUUIDv4();
  const helperTextId = useUUIDv4();
  const errorId = useUUIDv4();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target;

    props.onChange(value);
  };

  const [hasFocus, setHasFocus] = useState(false);

  const handleFocus: NonNullable<TextInputProps['onFocus']> = event => {
    setHasFocus(true);

    if (props.onFocus) {
      props.onFocus(event);
    }
  };

  const handleBlur: NonNullable<TextInputProps['onBlur']> = event => {
    setHasFocus(false);

    if (props.onBlur) {
      props.onBlur(event);
    }
  };

  const [isPointerOver, setIsPointerOver] = useState(false);

  const handlePointerEnter: React.PointerEventHandler<
    HTMLInputElement
  > = () => {
    setIsPointerOver(true);
  };

  const handlePointerLeave: React.PointerEventHandler<
    HTMLInputElement
  > = () => {
    setIsPointerOver(false);
  };

  const isInvalid = !!props.error;

  return (
    <Wrapper size={props.size} className={props.className}>
      {props.label && (
        <StyledInputLabel
          hasFocus={hasFocus}
          htmlFor={inputId}
          label={props.label}
          showOptionalLabel={props.showOptionalLabel}
        />
      )}
      <StyledInput
        id={inputId}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={props.placeholder}
        isInvalid={isInvalid}
        isPointerOver={isPointerOver}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        autoFocus={props.autoFocus}
        autoComplete={props.autoComplete}
        disabled={props.disabled}
        aria-required={props.required}
        aria-invalid={isInvalid}
        aria-describedby={props.helperText && helperTextId}
        aria-errormessage={props.error && errorId}
        ref={props.inputRef}
      />
      {props.error && <StyledInputError id={errorId} error={props.error} />}
      {props.helperText && (
        <StyledInputHelperText id={helperTextId} text={props.helperText} />
      )}
    </Wrapper>
  );
};

function useUUIDv4(): string {
  const [uuid] = useState(() => uuidv4());

  return uuid;
}

export default React.memo(TextInput);
