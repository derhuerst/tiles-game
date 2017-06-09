'use strict'

const h = require('virtual-dom/h')

const games = require('./games')
const styles = require('./ui.css.js')

const render = (state, actions) => {
	const boardButtons = []

	state.colors.forEach((color) => {
		const isSelected = state.color === color.hex
		const button = h('button', {
			disabled: isSelected ? 'disabled' : null,
			onclick: () => actions.setColor(color.hex)
		}, color.name + ' – ' + color.key)

		boardButtons.push(button)
	})

	boardButtons.push(h('button', {
		onclick: () => actions.setGame(state.game)
	}, 'reset – r'))

	const gameButtons = []
	games.forEach((game, i) => {
		const isSelected = state.game === i
		const button = h('button', {
			disabled: isSelected ? 'disabled' : null,
			onclick: () => actions.setGame(i)
		}, game.name)

		gameButtons.push(button)
	})

	return h('div', {
		className: styles.ui + ''
	}, [
		h('div', {}, boardButtons),
		h('div', {}, gameButtons)
	])
}

module.exports = render
