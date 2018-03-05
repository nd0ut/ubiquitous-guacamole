const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const loadImages = require('../src/loadImages');
const inputFactory = require('./inputFactory');

chai.use(chaiAsPromised);
const { expect } = chai;

it('should be resolved when all images are loaded', async function() {
  const input = [inputFactory.validUrl(), inputFactory.validUrl()];
  await expect(loadImages(input)).be.fulfilled;
});

it('should be rejected when any image failed', async function() {
  const input = [inputFactory.validUrl(), inputFactory.invalidUrl()];
  await expect(loadImages(input)).be.rejected;
});

it('should accept both strings and Image objects', async function() {
  const input = [inputFactory.validUrl(), inputFactory.validImg()];
  await expect(loadImages(input)).be.fulfilled;
});

it('should return images and it\'s states', async function() {
  const input = [
    inputFactory.validUrl(),
    inputFactory.invalidUrl(),
    inputFactory.validImg(),
    inputFactory.invalidImg()
  ];
  const result = await expect(loadImages(input)).be.rejected;

  expect(result).to.be.an('array');

  expect(result[0][0] instanceof Image).to.be.true;
  expect(result[0][1]).to.equal(loadImages.State.COMPLETELY_AVAILABLE);

  expect(result[1][0] instanceof Image).to.be.true;
  expect(result[1][1]).to.equal(loadImages.State.BROKEN);

  expect(result[2][0] instanceof Image).to.be.true;
  expect(result[2][1]).to.equal(loadImages.State.COMPLETELY_AVAILABLE);

  expect(result[3][0] instanceof Image).to.be.true;
  expect(result[3][1]).to.equal(loadImages.State.BROKEN);
});

it('should work with images src of which will be set later', async function() {
  const input = [inputFactory.validImg({ loadTime: 1000, srcDelay: 3000 })];
  const result = await expect(loadImages(input)).be.fulfilled;
  expect(result[0][1]).to.equal(loadImages.State.COMPLETELY_AVAILABLE);
});

it('should work with images which is loading now', async function() {
  const input = [inputFactory.validImg({ loadTime: 3000 })];
  const result = await expect(loadImages(input)).be.fulfilled;
  expect(result[0][1]).to.equal(loadImages.State.COMPLETELY_AVAILABLE);
});

it('should work with images which already loaded', async function() {
  const loadImage = new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = inputFactory.validUrl();
  });

  const img = await loadImage;
  const result = await expect(loadImages([img])).be.fulfilled;

  expect(result[0][0] instanceof Image).to.be.true;
  expect(result[0][1]).to.equal(loadImages.State.COMPLETELY_AVAILABLE);
});

it('should work with images which already failed', async function() {
  const loadImage = new Promise(resolve => {
    const img = new Image();
    img.onerror = () => resolve(img);
    img.src = inputFactory.invalidUrl();
  });

  const img = await loadImage;
  const result = await expect(loadImages([img])).be.rejected;

  expect(result[0][0] instanceof Image).to.be.true;
  expect(result[0][1]).to.equal(loadImages.State.BROKEN);
});

it('should throw an error on try to access undefined State', function() {
  expect(() => loadImages.State.UNDEFINED_STATE).to.throw(Error, /not found/);
});

it('should pass a test with random images and delays', async function() {
  this.timeout(50000);

  const n = 100;
  const randomData = Array.from(new Array(n)).map(() => inputFactory.random());
  const input = randomData.map(data => data.input);
  const inputTypes = randomData.map(data => data.type);

  const result = await expect(loadImages(input)).be.rejected;

  expect(result.length).to.be.equal(input.length);

  result.forEach(([, state], idx) => {
    const expectedState =
      inputTypes[idx] === 'valid' ? loadImages.State.COMPLETELY_AVAILABLE : loadImages.State.BROKEN;

    expect(state).to.be.equal(expectedState);
  });
});
