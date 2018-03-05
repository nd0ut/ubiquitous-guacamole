const baseUrl = 'http://localhost:9877';
let counter = 0;

const getPath = (type, delay) => `/image/${type}/${++counter}.png?delay=${delay}`;

function url({ loadTime, type }) {
  return baseUrl + getPath(type, loadTime);
}

function validUrl({ loadTime = 1000 } = {}) {
  return url({ loadTime, type: 'valid' });
}

function invalidUrl({ loadTime = 1000 } = {}) {
  return url({ loadTime, type: 'not_found' });
}

function image({ loadTime, srcDelay, type }) {
  const path = url({ loadTime, type });
  const img = new Image();
  setTimeout(() => (img.src = path), srcDelay);
  return img;
}

function validImg({ loadTime = 1000, srcDelay = 0 } = {}) {
  return image({ loadTime, srcDelay, type: 'valid' });
}

function invalidImg({ loadTime = 1000, srcDelay = 0 } = {}) {
  return image({ loadTime, srcDelay, type: 'not_found' });
}

function rand(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function random() {
  const creators = [image, url];
  const idx = rand(0, creators.length - 1);
  const randCreator = creators[idx];

  const loadTime = rand(0, 5000);
  const srcDelay = rand(0, 5000);
  const type = ['not_found', 'bad', 'valid'][rand(0, 3)];

  return {
    input: randCreator({ loadTime, srcDelay, type }),
    type
  };
}

module.exports = {
  validUrl,
  invalidUrl,
  validImg,
  invalidImg,
  random
};
