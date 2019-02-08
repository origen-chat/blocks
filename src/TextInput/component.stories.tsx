// @ts-ignore
import { actions } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import TextInput from './component';

const events = actions('onChange', 'onFocus', 'onBlur');

storiesOf('TextInput', module).add('generic', () => (
  <TextInput
    type={select('Type', { Text: 'text', Number: 'number' }, 'text')}
    value={text('Value', '')}
    placeholder={text('Placeholder', 'Placeholder')}
    label={text('Label', 'Text input')}
    error={text('Error', '')}
    helperText={text('Helper text', '')}
    disabled={boolean('Disabled', false)}
    {...events}
  />
));
