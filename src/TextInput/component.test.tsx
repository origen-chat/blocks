import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import { TextInput } from './component';

describe(`<TextInput />`, () => {
  test('renders a label element when passed the label prop', () => {
    const label = 'test label';

    const { getByLabelText } = render(
      <TextInput label={label} value="test" onChange={jest.fn()} />,
    );

    const inputElement = getByLabelText(label);

    expect(inputElement).toBeInstanceOf(HTMLInputElement);
  });

  test('renders an input with aria-invalid="true" when passed the error prop', () => {
    const value = 'invalid test input';
    const error = 'test error';

    const { getByDisplayValue } = render(
      <TextInput value={value} error={error} onChange={jest.fn()} />,
    );

    const inputElement = getByDisplayValue(value);

    expect(inputElement).toHaveAttribute('aria-invalid');
  });

  test('renders an error with role="alert" when passed the error prop', () => {
    const error = 'test error';

    const { getByText } = render(
      <TextInput error={error} value="test" onChange={jest.fn()} />,
    );

    const errorElement = getByText(error);

    expect(errorElement).toHaveTextContent(error);
    expect(errorElement).toHaveAttribute('role', 'alert');
  });

  test('calls the onChange function prop with the new value when its value changes', () => {
    const value = 'test value';
    const handleChange = jest.fn();

    const { getByDisplayValue } = render(
      <TextInput value={value} onChange={handleChange} />,
    );

    const inputElement = getByDisplayValue(value);

    const newValue = 'new test value';

    fireEvent.change(inputElement, { target: { value: newValue } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(newValue);
  });

  test('displays helper text and the input has aria-describedby set correctly when passed the helperText prop', () => {
    const label = 'test label';
    const helperText = 'test helper text';

    const { getByLabelText, getByText } = render(
      <TextInput
        helperText={helperText}
        label={label}
        value="value"
        onChange={jest.fn()}
      />,
    );

    const inputElement = getByLabelText(label);
    const helperTextElement = getByText(helperText);

    expect(inputElement.getAttribute('aria-describedby')).toBe(
      helperTextElement.id,
    );
  });

  test('renders an input with aria-required="true" when passed the required prop', () => {
    const value = 'test value';

    const { getByDisplayValue } = render(
      <TextInput required value={value} onChange={jest.fn()} />,
    );

    const inputElement = getByDisplayValue(value);

    expect(inputElement).toHaveAttribute('aria-required', 'true');
  });
});
