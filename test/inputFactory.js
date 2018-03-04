const baseUrl = 'http://localhost:9877';
let counter = 0;

const getPath = (type, delay) => `/image/${type}/${++counter}.png?delay=${delay}`;

function validUrl(loadTime = 1000) {
  const path = getPath('valid', loadTime);
  return baseUrl + path;
}

function invalidUrl(loadTime = 1000, type) {
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

module.exports = {
  validUrl,
  invalidUrl,
  validImg,
  invalidImg
};
