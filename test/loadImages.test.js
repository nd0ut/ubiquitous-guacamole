const loadImages = require('../src/loadImages');
const { validUrls, invalidUrls } = require('./fixtures');
const { createImage } = require('./util');

test('should return promise with some result', async () => {
  const result = await loadImages(validUrls);
  expect(result).toBeTruthy();
});

test('should be resolved when all images are loaded', async () => {
  const input = [...validUrls, ...validUrls.map(url => createImage(url, 0))];

  await expect(loadImages(input)).resolves.toBe();
});

test('should be rejected when at least one image is not loaded', async () => {
  const input = [
    ...invalidUrls,
    ...validUrls,
    ...validUrls.map(url => createImage(url, 0)),
    ...invalidUrls.map(url => createImage(url, 0)),
  ];

  await expect(loadImages(input)).rejects.toBe();
});

test('should return array of HTMLImageElement with it\'s state', async () => {
  const input = [...validUrls, ...validUrls.map(url => createImage(url, 0))];

  const result = await loadImages(input);

  expect.assertions(1 + input.length * 3);

  expect(Array.isArray(result)).toBeTruthy();

  result.forEach((item) => {
    expect(item.length).toEqual(2);

    const [image, state] = item;
    expect(image.src).toBeTruthy(); // check if it is HTMLImageElement
    expect(typeof state).toEqual('string');
  });
});
