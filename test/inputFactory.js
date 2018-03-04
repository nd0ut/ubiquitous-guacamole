const nock = require('nock');

const baseUrl = 'http://mock-server.com';
const scope = nock(baseUrl);
let counter = 0;

const getPath = () => `/image/${++counter}.png`;

function validUrl(loadTime = 1000) {
  const path = getPath();

  scope
    .get(path)
    .socketDelay(loadTime)
    .replyWithFile(200, __dirname + '/images/1.png', { 'Content-Type': 'image/png' });

  return baseUrl + path;
}

function invalidUrl(loadTime = 1000) {
  const path = getPath();

  scope
    .get(path)
    .socketDelay(loadTime)
    .reply(200, 'Not found');

  return baseUrl + path;
}

function validImg(srcDelay = 1000, loadTime = 1000) {
  const url = validUrl(loadTime);
  const img = new Image();
  setTimeout(() => (img.src = url), srcDelay);
  return img;
}

function invalidImg(srcDelay = 1000, loadTime = 1000) {
  const url = invalidUrl(loadTime);
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
