import flow from 'rollup-plugin-flow';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    plugins: [
      flow({ pretty: true, all: true }),
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
];
