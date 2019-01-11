import React from 'react';
import { render } from 'react-testing-library';

import { TextInput, TextInputProps } from './component';

describe('<TextInput />', () => {
  test('renders a label element when passed the label prop', () => {
    const label = 'Test label';

    const { getByLabelText } = render(<TextInput label={label} />);

    const inputElement = getByLabelText(label);

    expect(inputElement).toBeInstanceOf(HTMLInputElement);
  });

  test('renders an input with aria-invalid when passed the error prop', () => {
    const value = 'invalid input';
    const handleChange: TextInputProps['onChange'] = newValue => newValue;
    const error = 'Test error';

    const { getByDisplayValue } = render(
      <TextInput value={value} error={error} onChange={handleChange} />,
    );

    const inputElement = getByDisplayValue(value);

    expect(inputElement).toHaveAttribute('aria-invalid');
  });

  test('renders an error with role="alert" when passed the error prop', () => {
    const error = 'Test error';

    const { getByText } = render(<TextInput error={error} />);

    const errorElement = getByText(error);

    expect(errorElement).toHaveTextContent(error);
    expect(errorElement).toHaveAttribute('role', 'alert');
  });
});
