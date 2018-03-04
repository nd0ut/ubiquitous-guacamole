const baseUrl = 'http://localhost:9877';
let counter = 0;

const getPath = (type, delay) => `/image/${type}/${++counter}.png?delay=${delay}`;

function validUrl(loadTime = 1000) {
  const path = getPath('valid', loadTime);
  return baseUrl + path;
}

function invalidUrl(type, loadTime = 1000) {
  const path = getPath(type, loadTime);
  return baseUrl + path;
}

function validImg(srcDelay = 1000, loadTime = 1000) {
  const url = validUrl(loadTime);
  const img = new Image();
  setTimeout(() => (img.src = url), srcDelay);
  return img;
}

function invalidImg(type, srcDelay = 1000, loadTime = 1000) {
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
