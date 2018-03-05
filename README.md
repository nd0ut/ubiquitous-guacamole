<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="250" height="200" src="https://github.com/nd0ut/ubiquitous-guacamole/raw/master/logo.png">
  </a>
</div>

# Ubiquitous Guacamole
[![Build Status](https://travis-ci.org/nd0ut/ubiquitous-guacamole.svg?branch=master)](https://travis-ci.org/nd0ut/ubiquitous-guacamole)
[![npm version](https://badge.fury.io/js/%40nd0ut%2Fubiquitous-guacamole.svg)](https://badge.fury.io/js/%40nd0ut%2Fubiquitous-guacamole)
> Perhaps the best image preloader on Earth.



[Demo](https://nd0ut.github.io/ubiquitous-guacamole/) 

[![Edit ubiquitous-guacamole-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/nd0ut/ubiquitous-guacamole/tree/master/demo?module=%2Fsrc%2Fcomponents%2FApp.js&view=editor)

## Installation
Just run
```sh
npm i @nd0ut/ubiquitous-guacamole --save
```
or
```sh
yarn add @nd0ut/ubiquitous-guacamole --save
```

## Usage
```javascript
import loadImages from '@nd0ut/ubiquitous-guacamole';

loadImages(['urls', 'or', 'HTMLImageElements'])
  .then(images => {
    // all images are successfully loaded
    const [img, state] = images[0];
    console.log(state); // prints 'completely_available'
    state === loadImages.State.COMPLETELY_AVAILABLE
  }
  .catch(images => {
    // at least one image is failed
    const [img, state] = images[0];
    console.log(state); // prints 'completely_available' or 'broken'
    state === loadImages.State.COMPLETELY_AVAILABLE || state === loadImages.State.BROKEN
  });
```

## API
### loadImages (default export)
**Parameters**

-   `input` **[Array][2]&lt;([string][3] \| [HTMLImageElement][4])>** Array of urls or Images

Returns **[Promise][5]&lt;[Array][2]&lt;\[[HTMLImageElement][4], loadImages.State]>>**

[1]: #loadimages
[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
[4]: https://developer.mozilla.org/docs/Web/API/HTMLImageElement
[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

### loadImages.State
- `COMPLETELY_AVAILABLE` **string('completely_available')** Image loading success ([w3c][7])
- `BROKEN` **string('broken')** Image loading failed ([w3c][6])

[6]: https://dev.w3.org/html5/spec-preview/the-img-element.html#img-error
[7]: https://dev.w3.org/html5/spec-preview/the-img-element.html#img-all
