<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="250" height="200" src="https://github.com/nd0ut/ubiquitous-guacamole/raw/master/logo.png">
  </a>
</div>

# Ubiquitous Guacamole [![Build Status](https://travis-ci.org/nd0ut/ubiquitous-guacamole.svg?branch=master)](https://travis-ci.org/nd0ut/ubiquitous-guacamole)
> Perhaps the best image preloader on Earth.



[Demo](https://nd0ut.github.io/ubiquitous-guacamole/)

## Install
Just run
```sh
npm i @nd0ut/ubiquitous-guacamole --save
```
or
```sh
yarn add @nd0ut/ubiquitous-guacamole --save
```

## Usage example
```javascript
import loadImages from '@nd0ut/ubiquitous-guacamole';

loadImages(['urls', 'or', 'HTMLImageElements'])
  .then(images => console.log('all images are loaded')
  .catch(images => console.log('at least one image failed');
```

## API
### loadImages (default export)
**Parameters**

-   `input` **[Array][2]&lt;([string][3] \| [HTMLImageElement][4])>** Array of urls or Images

Returns **[Promise][5]&lt;[Array][2]&lt;\[[HTMLImageElement][4], 'loaded' | 'failed']>>**

[1]: #loadimages

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[4]: https://developer.mozilla.org/docs/Web/API/HTMLImageElement

[5]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise
