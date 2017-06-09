'use strict'

const h = require('virtual-dom/h')

const map = require('./map')
const ui = require('./ui')

const render = (state, actions) => {
	return h('div', {}, [
		map(state, actions),
		ui(state, actions)
	])
}

module.exports = render
