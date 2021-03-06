// @ts-ignore
import { actions } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import Button from './component';

const events = actions(
  'onClick',
  'onPointerDown',
  'onPointerUp',
  'onPointerEnter',
  'onPointerLeave',
  'onPointerCancel',
);

storiesOf('Button', module).add('contained', () => (
  <Button
    variant="contained"
    color={select(
      'Color',
      { Primary: 'primary', Accent: 'accent', Danger: 'danger' },
      'primary',
    )}
    size={select(
      'Size',
      { Small: 'small', Medium: 'medium', Large: 'large' },
      'medium',
    )}
    label={text('Label', 'Primary')}
    {...events}
  />
));
