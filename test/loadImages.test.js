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

it('should be rejected when any image failed', async () => {
  const input = [inputFactory.validUrl(), inputFactory.invalidUrl()];
  await expect(loadImages(input)).be.rejected;
});

it('should accept both strings and Image objects', async () => {
  const input = [inputFactory.validUrl(), inputFactory.validImg()];
  await expect(loadImages(input)).be.fulfilled;
});

it('should return images and it\'s states', async () => {
  const input = [inputFactory.validUrl(), inputFactory.invalidImg(), inputFactory.validImg()];
  const result = await expect(loadImages(input)).be.rejected;

  expect(result).to.be.an('array');
  expect(result[0][0] instanceof Image).to.be.true;
  expect(result[0][1]).to.equal(loadImages.State.SUCCESS);
  expect(result[1][0] instanceof Image).to.be.true;
  expect(result[1][1]).to.equal(loadImages.State.FAILED);
  expect(result[2][0] instanceof Image).to.be.true;
  expect(result[2][1]).to.equal(loadImages.State.SUCCESS);
});

it('should work with images src of which will be set later', async () => {
  const input = [inputFactory.validImg(1000, 3000)];
  const result = await expect(loadImages(input)).be.fulfilled;
  expect(result[0][1]).to.equal(loadImages.State.SUCCESS);
});

it('should work with images which is loading now', async () => {
  const input = [inputFactory.validImg(3000, 0)];
  const result = await expect(loadImages(input)).be.fulfilled;
  expect(result[0][1]).to.equal(loadImages.State.SUCCESS);
});

it('should work with images which already loaded', async () => {
  const load = new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = inputFactory.validUrl();
  });

  const img = await load;
  const input = [img];
  const result = await expect(loadImages(input)).be.fulfilled;
  expect(result[0][0] instanceof Image).to.be.true;
  expect(result[0][1]).to.equal(loadImages.State.SUCCESS);
});

it('should throw an error on try to access undefined State', () => {
  expect(() => loadImages.State.UNDEFINED_STATE).to.throw(Error, /not found/);
});
