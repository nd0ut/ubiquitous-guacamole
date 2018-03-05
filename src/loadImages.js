const StateEnum = {
  COMPLETELY_AVAILABLE: 'completely_available',
  BROKEN: 'broken'
};

const State = new Proxy(StateEnum, {
  set: () => false,
  get: (target, name) => {
    if(target[name]) {
      return target[name];
    }

    throw new Error(`State '${name}' not found.`);
  }
});

type StateType = $Values<typeof StateEnum>;
type ReturnItem = [HTMLImageElement, StateType];

function isUnavailable(img: HTMLImageElement): boolean {
  return img.src === '' && img.complete;
}

function isPartiallyAvailable(img: HTMLImageElement): boolean {
  return img.src !== '' && !img.complete;
}

function isCompletelyAvailable(img: HTMLImageElement): boolean {
  return img.src !== '' && img.complete && img.naturalWidth !== 0 && img.naturalHeight !== 0;
}

function isBroken(img: HTMLImageElement): boolean {
  return img.src !== '' && img.complete && img.naturalWidth === 0 && img.naturalHeight === 0;
}

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

async function waitForReady(img: HTMLImageElement): Promise<ReturnItem> {
  return new Promise(resolve => {
    if (isUnavailable(img) || isPartiallyAvailable(img)) {
      img.addEventListener('load', () => resolve([img, State.COMPLETELY_AVAILABLE]), { once: true });
      img.addEventListener('error', () => resolve([img, State.BROKEN]), { once: true });
    } else if (isCompletelyAvailable(img)) {
      resolve([img, State.COMPLETELY_AVAILABLE]);
    } else if (isBroken(img)) {
      resolve([img, State.BROKEN]);
    } else {
      console.warn('Unhandled HTMLImageElement state.');
      resolve([img, State.BROKEN]);
    }
  });
}

async function loadImages(input: Array<string | HTMLImageElement>): Promise<ReturnItem[]> {
  const images = normalizeInput(input);
  const waiters = images.map(waitForReady);

  const returnItems = await Promise.all(waiters);
  const anyBroken = returnItems.some(item => item[1] === State.BROKEN);

  if (anyBroken) {
    throw returnItems;
  } else {
    return returnItems;
  }
}

loadImages.State = State;

module.exports = loadImages;
