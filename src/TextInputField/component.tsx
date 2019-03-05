import React from 'react';
import { Field, FieldProps } from 'react-final-form';

import TextInput, { TextInputProps } from '../TextInput';
import { ClassNameProp } from '../types';

export type TextInputFieldProps = Pick<
  TextInputProps,
  | 'type'
  | 'label'
  | 'helperText'
  | 'onFocus'
  | 'onBlur'
  | 'placeholder'
  | 'disabled'
  | 'autoFocus'
  | 'autoComplete'
  | 'required'
  | 'showOptionalLabel'
  | 'size'
  | 'inputRef'
> &
  Partial<Pick<TextInputProps, 'onChange'>> &
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
> = props => {
  return (
    <Field
      name={props.name}
      validate={props.validate}
      parse={props.parse}
      format={props.format}
      isEqual={props.isEqual}
      formatOnBlur={props.formatOnBlur}
      allowNull={props.allowNull}
      subscription={props.subscription}
      render={({ input, meta }) => {
        const handleChange: TextInputProps['onChange'] = value => {
          if (props.onChange) {
            props.onChange(value);

            return;
          }

          input.onChange(value);
        };

        return (
          <TextInput
            type={props.type}
            name={input.name}
            value={input.value}
            onChange={handleChange}
            onFocus={input.onFocus}
            onBlur={input.onBlur}
            placeholder={props.placeholder}
            disabled={props.disabled}
            label={props.label}
            helperText={props.helperText}
            error={meta.touched ? meta.error : undefined}
            autoFocus={props.autoFocus}
            autoComplete={props.autoComplete}
            required={props.required}
            showOptionalLabel={props.showOptionalLabel}
            size={props.size}
            className={props.className}
            inputRef={props.inputRef}
          />
        );
      }}
    />
  );
};

export default React.memo(TextInputField);
