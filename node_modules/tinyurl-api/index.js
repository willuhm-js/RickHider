"use strict"

const ky = require("ky-universal").create({
	throwHttpErrors: false
})
const { assert } = require("@sindresorhus/is")
const queryString = require("query-string")

module.exports = async (url, alias) => {
	assert.string(url)

	if (alias) {
		assert.string(alias)
	}

	const response = await ky("https://tinyurl.com/api-create.php", {
		searchParams: queryString.stringify({ url, alias }, { encode: false })
	}).text()

	if (response === "Error") {
		throw new Error("The API was unable to shorten the url.")
	}

	return response
}
