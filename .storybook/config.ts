import { checkA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, configure } from '@storybook/react';
import React from 'react';

import './i18n';
import GlobalStyle from '../src/GlobalStyle';

configureStorybook();

function configureStorybook() {
  addDecorators();

  configure(loadStories, module);
}

function addDecorators() {
  addDecorator(checkA11y);
  addDecorator(withKnobs);

  addDecorator(storyFn =>
    React.createElement(
      React.Fragment,
      null,
      React.createElement(GlobalStyle, null, null),
      React.createElement(React.Suspense, { fallback: null }, storyFn()),
    ),
  );
}

function loadStories() {
  const requireContext = require.context('../src', true, /\.stories\.tsx$/);

  requireContext.keys().forEach(key => {
    requireContext(key);
  });
}
