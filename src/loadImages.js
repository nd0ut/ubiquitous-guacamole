type State = 'loaded' | 'failed';
type ReturnItem = [HTMLImageElement, State];


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

function isNotStarted(img: HTMLImageElement): boolean {
  return img.src === '' && img.complete;
}

function isLoaded(img: HTMLImageElement): boolean {
  return img.src !== '' && img.complete && img.naturalWidth !== 0 && img.naturalHeight !== 0;
}

function isFailed(img: HTMLImageElement): boolean {
  return img.src !== '' && img.complete && img.naturalWidth === 0 && img.naturalHeight === 0;
}

function isLoading(img: HTMLImageElement): boolean {
  return img.src !== '' && !img.complete;
}

async function waitForReady(img: HTMLImageElement): Promise<ReturnItem> {
  return new Promise(resolve => {
    if (isNotStarted(img) || isLoading(img)) {
      img.addEventListener('load', () => resolve([img, 'loaded']));
      img.addEventListener('error', () => resolve([img, 'failed']));
    } else if (isLoaded(img)) {
      resolve([img, 'loaded']);
    } else if (isFailed(img)) {
      resolve([img, 'failed']);
    } else {
      resolve([img, 'failed']);
    }
  });
}

async function loadImages(input: Array<string | HTMLImageElement>): Promise<ReturnItem[]> {
  const images = normalizeInput(input);
  const promises = images.map(waitForReady);

  const returnItems = await Promise.all(promises);
  const anyFailed = returnItems.some(item => item[1] === 'failed');

  if(anyFailed) {
    throw returnItems;
  } else {
    return returnItems;
  }
}

module.exports = loadImages;
