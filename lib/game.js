'use strict'

const h = require('virtual-dom/h')

const map = require('./map')

const render = (state, actions) => {
	return h('div', {}, [
		map(state, actions)
	])
}

module.exports = render
