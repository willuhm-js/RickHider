# tinyurl-api [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/tinyurl-api/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/tinyurl-api)

Shorten a url with TinyURL.

[![NPM Badge](https://nodei.co/npm/tinyurl-api.png)](https://npmjs.com/package/tinyurl-api)

## Install

```sh
npm install tinyurl-api
```

## Usage

```js
const tinyurl = require("tinyurl-api");

(async () => {
	const url = await tinyurl("https://google.com");

	console.log(url);
})();
```

## API

### tinyurl(url, alias?)

#### url

Type: `string`

The url to shorten.

#### alias

Type: `string`

The custom alias for the shortened url.
