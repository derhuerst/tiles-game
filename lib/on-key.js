'use strict'

const window = require('global/window')

const onKey = (key, fn) => {
	key = key.toLowerCase()
	window.addEventListener('keypress', (e) => {
		if (e.key && e.key.toLowerCase() === key) fn()
	}, false)
}

module.exports = onKey
