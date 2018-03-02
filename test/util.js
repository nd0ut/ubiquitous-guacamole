const Image = require('htmlimage');

function createImage(url, timeout = 0) {
  const img = new Image();

  if (timeout === 0) {
    img.src = url;
    return;
  }

  setTimeout(() => (img.src = url), timeout);
}

module.exports = {
  createImage
};
