const loadImages = require('../src/loadImages');
const jsdom = require('jsdom');
const inputFactory = require('./inputFactory');

const virtualConsole = new jsdom.VirtualConsole();
jest.setTimeout(10000);

const dom = new jsdom.JSDOM('', {
  resources: 'usable',
  virtualConsole
});
global.Image = dom.window.Image;

it('should be resolved when all images are loaded', async () => {
  expect.assertions(1);
  const input = [inputFactory.validUrl()];
  await expect(loadImages(input)).resolves.toBeTruthy();
});

it('should be rejected when at least one image is not loaded', async () => {
  expect.assertions(1);
  const input = [inputFactory.validUrl(), inputFactory.invalidImg()];
  await expect(loadImages(input)).rejects.toBeTruthy();
});
