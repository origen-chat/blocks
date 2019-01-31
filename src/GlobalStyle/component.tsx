import { createGlobalStyle } from 'styled-components';

import globalStyles from './globalStyles';

export const GlobalStyle = createGlobalStyle`
  :root {
    ${globalStyles};
  }
`;

export default GlobalStyle;
