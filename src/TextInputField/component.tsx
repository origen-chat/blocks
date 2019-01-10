import React from 'react';
import { Field, FieldProps } from 'react-final-form';

import TextInput, { TextInputProps } from '../TextInput';
import { ClassNameProp } from '../types';

export type TextInputFieldProps = Pick<
  TextInputProps,
  | 'type'
  | 'label'
  | 'helperText'
  | 'id'
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'placeholder'
  | 'disabled'
  | 'autoFocus'
  | 'autoComplete'
  | 'aria-label'
  | 'aria-required'
> &
  Pick<
    FieldProps,
    | 'name'
    | 'validate'
    | 'parse'
    | 'format'
    | 'isEqual'
    | 'formatOnBlur'
    | 'allowNull'
    | 'subscription'
  > &
  ClassNameProp;

export const TextInputField: React.FunctionComponent<
  TextInputFieldProps
> = props => (
  <Field
    name={props.name}
    validate={props.validate}
    parse={props.parse}
    format={props.format}
    isEqual={props.isEqual}
    formatOnBlur={props.formatOnBlur}
    allowNull={props.allowNull}
    subscription={props.subscription}
    render={({ input, meta }) => (
      <TextInput
        id={props.id}
        type={props.type}
        {...input}
        placeholder={props.placeholder}
        disabled={props.disabled}
        label={props.label}
        helperText={props.helperText}
        error={meta.touched && meta.error}
        autoFocus={props.autoFocus}
        autoComplete={props.autoComplete}
        aria-label={props['aria-label']}
        aria-required={props['aria-required']}
        className={props.className}
      />
    )}
  />
);

export default TextInputField;
