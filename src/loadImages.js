type ReturnItem = [HTMLImageElement, string];

function normalizeInput(input: Array<string | HTMLImageElement>): HTMLImageElement[] {
  return input.map(item => {
    if (typeof item === 'string') {
      const url = item;
      const img = new Image();
      img.src = url;
      return img;
    }

    return item;
  });
}

function waitForLoad(img: HTMLImageElement): Promise<ReturnItem> {
  return new Promise((resolve) => {
    if (!img.complete) {
      img.onload = () => resolve([img, 'ok']);
      return;
    }

    if (img.complete && img.naturalWidth === 0) {
      resolve([img, 'fail']);
      return;
    }

    resolve([img, 'ok']);
  });
}

function loadImages(input: Array<string | HTMLImageElement>): Promise<ReturnItem[]> {
  const images = normalizeInput(input);
  const promises = images.map(waitForLoad);

  return Promise.all(promises);
}

module.exports = loadImages;
