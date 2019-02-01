import React from 'react';
import { render } from 'react-testing-library';

import { TextInput } from './component';

describe(`<${TextInput.name} />`, () => {
  test('renders a label element when passed the label prop', () => {
    const label = 'Test label';

    const { getByLabelText } = render(
      <TextInput label={label} value="test" onChange={jest.fn()} />,
    );

    const inputElement = getByLabelText(label);

    expect(inputElement).toBeInstanceOf(HTMLInputElement);
  });

  test('renders an input with aria-invalid when passed the error prop', () => {
    const value = 'invalid input';
    const error = 'Test error';

    const { getByDisplayValue } = render(
      <TextInput value={value} error={error} onChange={jest.fn()} />,
    );

    const inputElement = getByDisplayValue(value);

    expect(inputElement).toHaveAttribute('aria-invalid');
  });

  test('renders an error with role="alert" when passed the error prop', () => {
    const error = 'Test error';

    const { getByText } = render(
      <TextInput error={error} value="test" onChange={jest.fn()} />,
    );

    const errorElement = getByText(error);

    expect(errorElement).toHaveTextContent(error);
    expect(errorElement).toHaveAttribute('role', 'alert');
  });
});
