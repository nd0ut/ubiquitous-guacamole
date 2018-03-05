const StateEnum = {
  SUCCESS: Symbol('success'),
  FAILED: Symbol('failed')
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

function isNotStarted(img: HTMLImageElement): boolean {
  return img.src === '' && img.complete;
}

function isLoading(img: HTMLImageElement): boolean {
  return img.src !== '' && !img.complete;
}

function isLoaded(img: HTMLImageElement): boolean {
  return img.src !== '' && img.complete && img.naturalWidth !== 0 && img.naturalHeight !== 0;
}

function isFailed(img: HTMLImageElement): boolean {
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
    if (isNotStarted(img) || isLoading(img)) {
      img.addEventListener('load', () => resolve([img, State.SUCCESS]), { once: true });
      img.addEventListener('error', () => resolve([img, State.FAILED]), { once: true });
    } else if (isLoaded(img)) {
      resolve([img, State.SUCCESS]);
    } else if (isFailed(img)) {
      resolve([img, State.FAILED]);
    } else {
      console.warn('Unhandled HTMLImageElement state.');
      resolve([img, State.FAILED]);
    }
  });
}

async function loadImages(input: Array<string | HTMLImageElement>): Promise<ReturnItem[]> {
  const images = normalizeInput(input);
  const waiters = images.map(waitForReady);

  const returnItems = await Promise.all(waiters);
  const anyFailed = returnItems.some(item => item[1] === State.FAILED);

  if (anyFailed) {
    throw returnItems;
  } else {
    return returnItems;
  }
}

loadImages.State = State;

module.exports = loadImages;
