const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const flow = require('rollup-plugin-flow');
const imageServer = require('./test/imageServer');

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  config.set({
    browsers: ['ChromeHeadless'],
    plugins: [
      require('karma-chrome-launcher'),
      require('karma-mocha'),
      require('karma-rollup-preprocessor'),
      require('karma-express-server')
    ],
    frameworks: ['mocha', 'expressServer'],
    preprocessors: {
      'test/*.test.js': ['rollup']
    },
    files: ['test/*.test.js'],
    rollupPreprocessor: {
      plugins: [flow({ pretty: true, all: true }), resolve(), commonjs()],
      output: {
        format: 'iife',
        name: 'test',
        sourcemap: 'inline'
      }
    },
    expressServer: {
      port: 9877,
      extensions: [imageServer]
    },
    client: {
      mocha: {
        timeout : 6000
      }
    }
  });
};
