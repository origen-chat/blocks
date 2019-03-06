// @ts-ignore
// import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, configure, addParameters } from '@storybook/react';
import React from 'react';

import './i18n';
import GlobalStyle from '../src/GlobalStyle';

configureStorybook();

function configureStorybook(): void {
  addDecorators();
  setParameters();

  configure(loadStories, module);
}

function addDecorators(): void {
  // addDecorator(withA11y);
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

function setParameters(): void {
  addParameters({
    options: {
      panelPosition: 'right',
    },
  });
}

function loadStories(): void {
  // @ts-ignore
  const requireContext = require.context('../src', true, /\.stories\.tsx$/);

  requireContext.keys().forEach(key => {
    requireContext(key);
  });
}
