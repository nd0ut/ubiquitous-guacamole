const baseUrl = 'http://localhost:9877';
let counter = 0;

const getPath = (type, delay) => `/image/${type}/${++counter}.png?delay=${delay}`;

function validUrl(loadTime = 1000) {
  const path = getPath('valid', loadTime);
  return baseUrl + path;
}

function invalidUrl(loadTime = 1000, type = 'not_found') {
  const path = getPath(type, loadTime);
  return baseUrl + path;
}

function validImg(loadTime = 1000, srcDelay = 0) {
  const url = validUrl(loadTime);
  const img = new Image();
  setTimeout(() => (img.src = url), srcDelay);
  return img;
}

function invalidImg(loadTime = 1000, srcDelay = 0, type) {
  const url = invalidUrl(type, loadTime);
  const img = new Image();
  setTimeout(() => (img.src = url), srcDelay);
  return img;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function random() {
  const creators = [validUrl, invalidUrl, validImg, invalidImg];
  const idx = rand(0, creators.length - 1);
  const randCreator = creators[idx];

  const loadTime = rand(0, 5000);
  const srcDelay = rand(0, 5000);
  const type = ['not_found', 'bad'][rand(0, 2)];

  return randCreator(loadTime, srcDelay, type);
}

module.exports = {
  validUrl,
  invalidUrl,
  validImg,
  invalidImg,
  random
};
