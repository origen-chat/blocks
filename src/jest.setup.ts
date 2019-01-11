import 'jest-dom/extend-expect';
import 'jest-styled-components';
import { cleanup } from 'react-testing-library';

setupTestFramework();

function setupTestFramework(): void {
  afterEach(() => {
    cleanup();
  });
}
