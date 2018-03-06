import createEnum from './createEnum';

const State = createEnum({
  UNAVAILABLE: 'unavailable',
  PARTIALLY_AVAILABLE: 'partially_available',
  COMPLETELY_AVAILABLE: 'completely_available',
  BROKEN: 'broken'
});

const ExportedState = createEnum({
  COMPLETELY_AVAILABLE: State.COMPLETELY_AVAILABLE,
  BROKEN: State.BROKEN
});

type StateType = $Values<typeof State>;
type ExportedStateType = $Values<typeof ExportedState>;
type ReturnValue = [HTMLImageElement, ExportedStateType];

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

const stateCheckers = {
  [State.UNAVAILABLE]: isUnavailable,
  [State.PARTIALLY_AVAILABLE]: isPartiallyAvailable,
  [State.COMPLETELY_AVAILABLE]: isCompletelyAvailable,
  [State.BROKEN]: isBroken
};

function getImageState(img: HTMLImageElement): StateType {
  for (const state of Object.keys(stateCheckers)) {
    const checkState = stateCheckers[state];

    if (checkState(img)) {
      return state;
    }
  }

  return State.BROKEN;
}

function listenToImage(
  img: HTMLImageElement,
  { onLoad, onError }: { onLoad: () => void, onError: () => void }
): void {
  function loadHandler() {
    onLoad();
    img.removeEventListener('error', onError);
  }

  function errorHandler() {
    onError();
    img.removeEventListener('load', onLoad);
  }

  img.addEventListener('load', loadHandler, { once: true });
  img.addEventListener('error', errorHandler, { once: true });
}

async function waitForReady(img: HTMLImageElement): Promise<ReturnValue> {
  return new Promise(resolve => {
    const state = getImageState(img);

    const resolveCompleted = () => resolve([img, State.COMPLETELY_AVAILABLE]);
    const resolveBroken = () => resolve([img, State.BROKEN]);
    const resolveCurrent = () => resolve([img, state]);

    if ([State.PARTIALLY_AVAILABLE, State.UNAVAILABLE].includes(state)) {
      listenToImage(img, { onLoad: resolveCompleted, onError: resolveBroken });
    } else {
      resolveCurrent();
    }
  });
}

async function loadImages(input: Array<string | HTMLImageElement>): Promise<ReturnValue[]> {
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

loadImages.State = ExportedState;

export default loadImages;
