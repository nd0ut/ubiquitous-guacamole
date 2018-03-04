const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const loadImages = require('../src/loadImages');
const inputFactory = require('./inputFactory');

chai.use(chaiAsPromised);
const { expect } = chai;

it('should be resolved when all images are loaded', async () => {
  const input = [inputFactory.validUrl(), inputFactory.validUrl()];
  await expect(loadImages(input)).be.fulfilled;
});
