/**
Shorten a url with TinyURL.
@param url The url to shorten.
@param alias The custom alias for the shortened url.
@example
```
const tinyurl = require("tinyurl-api");

(async () => {
	const url = await tinyurl("https://google.com");

	console.log(url);
})();
```
*/
declare function tinyurl(url: string, alias?: string): Promise<string>

export = tinyurl
