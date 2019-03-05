// @ts-ignore
import { actions } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import TextInput from './component';

const events = actions('onChange', 'onFocus', 'onBlur');

storiesOf('TextInput', module).add('generic', () => (
  <TextInput
    type={select(
      'Type',
      { Text: 'text', Number: 'number', Password: 'password' },
      'text',
    )}
    value={text('Value', '')}
    placeholder={text('Placeholder', 'Placeholder')}
    label={text('Label', 'Text input')}
    error={text('Error', '')}
    helperText={text('Helper text', '')}
    size={select(
      'Size',
      { Small: 'small', Medium: 'medium', Large: 'large' },
      'medium',
    )}
    required={boolean('Required', false)}
    showOptionalLabel={boolean('Show optional label', false)}
    disabled={boolean('Disabled', false)}
    {...events}
  />
));
