import { css } from 'styled-components';

import borders from './borders';
import colors from './colors';
import fonts from './fonts';
import opacity from './opacity';
import shadows from './shadows';
import spaces from './spaces';
import transitions from './transitions';

export const globalStyles = css`
  :root {
    ${fonts}
    ${spaces}
    ${colors}
    ${borders}
    ${shadows}
    ${opacity}
    ${transitions}
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: var(--sans-serif-font-family);
    font-size: var(--md-font-size);
    color: var(--secondary-font-color);
    line-height: 1.15;
  }
`;

export default globalStyles;
