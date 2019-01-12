import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

import pkg from './package.json';

const extensions = ['.js', '.ts', '.tsx'];

const externalModules = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

export default {
  input: './src/index.tsx',
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true, interop: false },
    { file: pkg.module, format: 'es', sourcemap: true, interop: false },
  ],
  external: id =>
    externalModules.some(externalModule => id.startsWith(externalModule)),
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    resolve({ extensions }),
    babel({ extensions }),
  ],
};
