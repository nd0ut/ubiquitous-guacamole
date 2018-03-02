import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import flow from 'rollup-plugin-flow';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    plugins: [
      flow({ pretty: true, all: true }),
      resolve(),
      commonjs()
    ],
    output: [
      { name: 'ubiquitous-guacamole', file: pkg.browser, format: 'umd', strict: true },
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
];
